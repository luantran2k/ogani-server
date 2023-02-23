import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterQuery } from './dto/filter.query';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productsService.create(createProductDto, images);
  }

  @Get()
  async findAll(@Query() filter: ProductFilterQuery) {
    return this.productsService.findAll(filter);
  }

  @Get('hot-sale')
  getHotSaleProducts() {
    return this.productsService.getHotSaleProducts();
  }

  @Get('featured')
  getFeatureProducts() {
    return this.productsService.getFeatureProducts();
  }

  @Get('latest')
  getLatestProduct() {
    return this.productsService.getLatestProducts();
  }

  @Get('best-sellers')
  getBestSellerProducts() {
    return this.productsService.getBestSellerProducts();
  }
  @Get('top-rate')
  getTopRateProducts() {
    return this.productsService.getTopRateProducts();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
