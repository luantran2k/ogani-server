import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCardType } from 'src/schemas/product';
import BaseFilter from 'src/types/base/BaseFilter';
import ultis from 'src/utils/ultis';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async findAll({ page, quantity, search }: BaseFilter) {
    const productsPromise = this.prisma.product.findMany({
      take: quantity,
      skip: page * quantity,
      where: {
        name: {
          contains: search,
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
        },
      },
    });
    const [products, total] = await Promise.all([
      productsPromise,
      totalPromises,
    ]);
    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const productPromise = this.prisma.product.findFirst({ where: { id } });
    const productVariantsPromise = this.prisma.productVariants.findMany({
      where: { productId: id },
      orderBy: {
        id: 'asc',
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

  getProductCategoies(quantity: number = 8) {
    return this.prisma.productCategory.findMany({
      take: quantity,
      orderBy: {
        ProductInCategory: {
          _count: 'desc',
        },
      },
    });
  }

  async getHotSaleProducts(quantity: number = 8): Promise<ProductCardType[]> {
    const products = await this.prisma.productVariants.findMany({
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
            ProductInCategory: true,
            ProductVariants: true,
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
    return products.map((item) => {
      const { ProductInCategory, ProductVariants, ...product } = item.product;
      const categoryIds = ProductInCategory.map(
        (category) => category.productCategoryId,
      );
      return { ...product, variants: ProductVariants, categoryIds };
    });
  }

  async getFeatureProducts(catetoryIds: number[] = undefined) {
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
          select: {
            id: true,
            price: true,
            quantity: true,
            salePercent: true,
            variant: true,
          },
        },
        ProductInCategory: {
          select: {
            categogry: true,
          },
        },
      },
      orderBy: {
        OrderItem: {
          _count: 'desc',
        },
      },
    });
    return products.map((productRaw) => {
      const { ProductInCategory, ProductVariants, ...product } = productRaw;
      return {
        ...product,
        variants: ProductVariants,
        categories: ProductInCategory.map(
          (productInCategory) => productInCategory.categogry,
        ),
      };
    });
  }

  getLatestProducts(quantity: number = 9) {
    return this.prisma.product.findMany({
      take: quantity,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getBestSellerProducts(quantity: number = 9) {
    return this.prisma.product.findMany({
      take: quantity,
      orderBy: {
        OrderItem: {
          _count: 'desc',
        },
      },
    });
  }

  getTopRateProducts(quantity: number = 9) {
    return this.prisma.productReview.groupBy({
      by: ['productId'],
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: 'desc',
        },
      },
    });
  }

  async test() {
    console.log('products/test');
    const products = await this.prisma.product.findMany({
      take: 10,
    });
    console.log('PRODUCT TEST: ', products);
    return products;
  }
}
