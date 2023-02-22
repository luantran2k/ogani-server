import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import BaseFilter from 'src/types/base/BaseFilter';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductCategoryDto: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({
      data: createProductCategoryDto,
    });
  }

  async findAll({ search, page, quantity }: BaseFilter) {
    const productCategoriesPromise = this.prisma.productCategory.findMany({
      skip: page * quantity,
      take: quantity,
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    const productCategoriesCountPromise = this.prisma.productCategory.count({
      where: {
        name: {
          contains: search,
        },
      },
    });

    const [productCategories, productCategoriesCount] = await Promise.all([
      productCategoriesPromise,
      productCategoriesCountPromise,
    ]);

    return {
      productCategories,
      total: productCategoriesCount,
    };
  }

  async findOne(id: number) {
    const productCategory = await this.prisma.productCategory.findFirst({
      where: { id },
    });
    if (!productCategory) {
      throw new NotFoundException('ProductCategory not found');
    }
    return productCategory;
  }

  update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: { id },
      data: updateProductCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.productCategory.delete({ where: { id } });
  }

  removeMany(ids: number[]) {
    return this.prisma.productCategory.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
