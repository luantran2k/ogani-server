import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
    @Query('quantity', new DefaultValuePipe(20), ParseIntPipe)
    quantity?: number,
  ) {
    return this.productCategoriesService.findAll({ search, page, quantity });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoriesService.update(+id, updateProductCategoryDto);
  }

  @Delete()
  removeMany(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    ids: number[],
  ) {
    return this.productCategoriesService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoriesService.remove(+id);
  }
}
