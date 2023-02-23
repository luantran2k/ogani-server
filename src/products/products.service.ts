import { Injectable } from '@nestjs/common';
import {
  ProductCategory,
  ProductInCategory,
  ProductVariants,
} from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, ProductCardType } from 'src/schemas/product';
import BaseFilter from 'src/types/base/BaseFilter';
import { ProductFilter, SortType } from 'src/types/product';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterQuery } from './dto/filter.query';
import { UpdateProductDto } from './dto/update-product.dto';

type ProductCardTypeRaw = Product & {
  ProductInCategory: (ProductInCategory & {
    category: ProductCategory;
  })[];
  ProductVariants: ProductVariants[];
};

@Injectable()
export class ProductsService {
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

  async findAll(filter: ProductFilterQuery) {
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalPromises = this.prisma.product.count({
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

  async getHotSaleProducts(quantity: number = 8) {
    const variants = await this.prisma.productVariants.findMany({
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
          gt: 0,
        },
      },
      take: quantity,
    });
    return this.convertToProductCardType(
      variants.map((variant) => variant.product),
    );
  }

  async getFeatureProducts(
    catetoryIds: number[] = undefined,
  ): Promise<ProductCardType[]> {
    const products = await this.prisma.product.findMany({
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
    return this.convertToProductCardType(products);
  }

  async getLatestProducts(quantity: number = 9): Promise<ProductCardType[]> {
    const products = await this.prisma.product.findMany({
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
    return products.map((product) => {
      const { ProductVariants, ProductInCategory, ...info } = product;
      return {
        ...info,
        variants: ProductVariants,
        categories: ProductInCategory.map(
          (productInCategory) => productInCategory.category,
        ),
      };
    });
  }

  async getBestSellerProducts(
    quantity: number = 9,
  ): Promise<ProductCardType[]> {
    const products = await this.prisma.product.findMany({
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
    });
    return this.convertToProductCardType(products);
  }

  async getTopRateProducts(quantity: number = 9): Promise<ProductCardType[]> {
    const products = await this.prisma.product.findMany({
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
    return this.convertToProductCardType(products);
  }
}
