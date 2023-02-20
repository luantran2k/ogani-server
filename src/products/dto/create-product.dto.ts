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
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Max(100)
  @Min(0)
  salePecent: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
