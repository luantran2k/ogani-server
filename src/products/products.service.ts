import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async getProductInfoHomePage() {
    const categories = await this.prisma.productCategory.findMany({
      take: 8,
      orderBy: {
        ProductInCategory: {
          _count: 'desc',
        },
      },
    });
    const featuredProductPromise = this.prisma.product.findMany({
      take: 8,
      where: {
        id: { in: categories.map((categories) => categories.id) },
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
        ProductInCategory: true,
      },
      orderBy: {
        OrderItem: {
          _count: 'desc',
        },
      },
    });
    const [featuredProductRaw] = await Promise.all([featuredProductPromise]);
    const featuredProduct = featuredProductRaw.map((product) => {
      const { ProductInCategory, ProductVariants, ...productInfo } = product;
      return {
        ...productInfo,
        variants: ProductVariants,
        categoryIds: ProductInCategory.map(
          (category) => category.productCategoryId,
        ),
      };
    });
    return {
      featuredProduct,
      categories,
    };
  }
}
