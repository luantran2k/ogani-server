import { Injectable } from '@nestjs/common';
import {
  ProductCategory,
  ProductInCategory,
  ProductVariants,
  Prisma,
} from '@prisma/client';
import { filter } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Product,
  ProductCardType,
  ProductsCardApiResponse,
} from 'src/schemas/product';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryFilter } from './dto/filter.query';
import { UpdateProductDto } from './dto/update-product.dto';

type ProductCardTypeRaw = Product & {
  ProductInCategory: (ProductInCategory & {
    category: ProductCategory;
  })[];
  ProductVariants: ProductVariants[];
};

@Injectable()
export class ProductsService {
  private readonly baseFilter: ProductQueryFilter = {
    page: 0,
    quantity: 12,
  };
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    const urls = this.cloudinary.uploadFiles(images, {
      folder: '',
    });
    const imageFilesPromise = this.cloudinary.uploadFiles(images, {
      folderName: 'post/images',
    });
    const uploadImages = await Promise.all(imageFilesPromise);
    const imagesUrls = uploadImages.map((image) => image.secure_url);
    try {
      return this.prisma.product.create({
        data: { ...createProductDto, images: imagesUrls },
      });
    } catch (error) {
      const res = imagesUrls.map((image) => {
        return this.cloudinary.removeFile(image, 'image');
      });
      await Promise.all(res);
      throw error;
    }
  }

  getFilterForProductQuery(
    filter: ProductQueryFilter,
  ): Prisma.ProductWhereInput {
    const { search, categoryId, usePrice, minPrice, maxPrice } = filter;
    const condition: Prisma.ProductWhereInput = {
      name: {
        contains: search,
        mode: 'insensitive',
      },
      ProductInCategory: {
        some: {
          productCategoryId: categoryId,
        },
      },
      ProductVariants: {
        some: {
          price: usePrice
            ? {
                gte: minPrice,
                lte: maxPrice,
              }
            : {},
        },
      },
    };
    return condition;
  }

  async findProducts(filter: ProductQueryFilter) {
    switch (filter.sort) {
      case 'latest':
      case 'sale':
        return this.findAll(filter);
      case 'discount':
        return this.getHotSaleProducts(filter, false);
      default:
        return this.findAll(filter);
    }
  }

  async findAll(filter: ProductQueryFilter) {
    const {
      page = 0,
      quantity = 25,
      search,
      minPrice,
      maxPrice,
      usePrice,
      categoryId,
      sort,
      total: isNeedTotal,
    } = filter;

    const productsPromise = this.prisma.product.findMany({
      take: quantity,
      skip: page * quantity,
      include: {
        ProductVariants: true,
        ProductInCategory: {
          include: { category: true },
        },
      },
      where: {
        ...this.getFilterForProductQuery(filter),
      },
      orderBy: {
        ...(sort === 'sale'
          ? {
              OrderItem: {
                _count: 'desc',
              },
            }
          : { createdAt: 'desc' }),
      },
    });

    let totalPromises;
    if (isNeedTotal) {
      totalPromises = this.prisma.product.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          ProductInCategory: {
            some: {
              productCategoryId: categoryId,
            },
          },
          ProductVariants: {
            some: {
              price: usePrice
                ? {
                    gte: minPrice,
                    lte: maxPrice,
                  }
                : {},
            },
          },
        },
      });
    }

    const [products, total] = await Promise.all([
      productsPromise,
      totalPromises,
    ]);
    return {
      products: this.convertToProductCardType(products),
      total: total,
    };
  }

  async findOne(id: number) {
    const productPromise = this.prisma.product.findFirst({ where: { id } });
    const productVariantsPromise = this.prisma.productVariants.findMany({
      where: { productId: id },
      orderBy: {
        price: 'asc',
      },
    });
    const [product, productVariants] = await Promise.all([
      productPromise,
      productVariantsPromise,
    ]);
    return {
      product,
      productVariants,
      relatedProducts: [],
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  convertToProductCardType(products: ProductCardTypeRaw[]): ProductCardType[] {
    return products.map((product) => {
      const { ProductInCategory, ProductVariants, ...info } = product;
      return {
        ...info,
        variants: ProductVariants,
        categories: ProductInCategory.map(
          (productInCategory) => productInCategory.category,
        ),
      };
    });
  }

  async getHotSaleProducts(
    filter: ProductQueryFilter = this.baseFilter,
    haveSalePercent: boolean = true,
  ): Promise<ProductsCardApiResponse> {
    const { quantity = 12 } = filter;
    const variantsPromise = this.prisma.productVariants.findMany({
      orderBy: {
        salePercent: 'desc',
      },
      distinct: 'productId',
      select: {
        product: {
          select: {
            id: true,
            name: true,
            images: true,
            ProductInCategory: {
              include: {
                category: true,
              },
            },
            ProductVariants: {
              orderBy: {
                salePercent: 'asc',
              },
            },
          },
        },
      },
      where: {
        salePercent: {
          gt: haveSalePercent ? 0 : undefined,
        },
        product: {
          ...this.getFilterForProductQuery(filter),
        },
      },
      take: quantity,
    });
    let totalPromise;
    if (filter.total) {
      totalPromise = this.prisma.productVariants.count({
        where: {
          salePercent: {
            gt: haveSalePercent ? 0 : undefined,
          },
          product: {
            ...this.getFilterForProductQuery(filter),
          },
        },
      });
    }

    const [variants, total] = await Promise.all([
      variantsPromise,
      totalPromise,
    ]);
    return {
      products: this.convertToProductCardType(
        variants.map((variant) => variant.product),
      ),
      total,
    };
  }

  async getFeatureProducts(
    catetoryIds: number[] = undefined,
  ): Promise<ProductsCardApiResponse> {
    const productsPromise = this.prisma.product.findMany({
      take: 8,
      where: {
        id: { in: catetoryIds },
      },
      select: {
        id: true,
        name: true,
        images: true,
        ProductVariants: {
          orderBy: {
            price: 'asc',
          },
        },
        ProductInCategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        OrderItem: {
          _count: 'desc',
        },
      },
    });
    const [products] = await Promise.all([productsPromise]);
    return {
      products: this.convertToProductCardType(products),
    };
  }

  async getLatestProducts(
    quantity: number = 9,
  ): Promise<ProductsCardApiResponse> {
    const productsPromise = this.prisma.product.findMany({
      take: quantity,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        ProductVariants: {
          orderBy: {
            price: 'asc',
          },
        },
        ProductInCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    const [products] = await Promise.all([productsPromise, ,]);
    return {
      products: this.convertToProductCardType(products),
    };
  }

  async getBestSellerProducts(
    filter: ProductQueryFilter = this.baseFilter,
  ): Promise<ProductsCardApiResponse> {
    const { quantity = 12 } = filter;
    const productsPromise = await this.prisma.product.findMany({
      take: quantity,
      orderBy: {
        OrderItem: {
          _count: 'desc',
        },
      },
      include: {
        ProductVariants: {
          orderBy: {
            price: 'asc',
          },
        },
        ProductInCategory: {
          include: {
            category: true,
          },
        },
      },
      where: {
        ...this.getFilterForProductQuery(filter),
      },
    });
    let totalPromise;
    if (filter.total) {
      totalPromise = this.prisma.product.count({
        where: {
          ...this.getFilterForProductQuery(filter),
        },
      });
    }
    const [products, total] = await Promise.all([
      productsPromise,
      totalPromise,
    ]);
    return {
      products: this.convertToProductCardType(products),
      total,
    };
  }

  async getTopRateProducts(
    quantity: number = 9,
  ): Promise<ProductsCardApiResponse> {
    const productsPromise = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        ProductInCategory: {
          include: {
            category: true,
          },
        },
        ProductVariants: {
          orderBy: {
            price: 'asc',
          },
        },
      },
      orderBy: {
        ProductReview: {
          _count: 'desc',
        },
      },
    });

    const [products] = await Promise.all([productsPromise, ,]);
    return {
      products: this.convertToProductCardType(products),
    };
  }
}
