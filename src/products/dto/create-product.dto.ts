import { CreateProductVariantDto } from './create-product-variant.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validator,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  categories: number[];

  // @IsArray()
  // @IsNotEmpty()
  // images: string[];

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  details: string;

  vairiants: CreateProductVariantDto[];
}
