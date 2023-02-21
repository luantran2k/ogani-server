import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateProductVariantDto {
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
