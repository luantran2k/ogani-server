import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import BaseFilter from 'src/types/base/BaseFilter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
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

  findOne(id: number) {
    return this.prisma.product.findFirst({ where: { id } });
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
}
