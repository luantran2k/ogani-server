import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

export type SortType =
  | 'sale'
  | 'discount'
  | 'latest'
  | 'accending price'
  | 'decending price';

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
  findAll(
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page?: number,
    @Query('quantity', new DefaultValuePipe(20), ParseIntPipe)
    quantity?: number,
    @Query('total', new DefaultValuePipe(false), ParseBoolPipe)
    total?: boolean,
    @Query('categoryId', new DefaultValuePipe(-1), ParseIntPipe)
    categoryId?: number,
    @Query('minPrice', new DefaultValuePipe(0), ParseIntPipe)
    minPrice?: number,
    @Query('maxPrice', new DefaultValuePipe(Number.POSITIVE_INFINITY))
    maxPrice?: number,
    @Query('sort', new DefaultValuePipe('latest')) sort?: SortType,
  ) {
    return this.productsService.findAll({ search, page, quantity });
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
