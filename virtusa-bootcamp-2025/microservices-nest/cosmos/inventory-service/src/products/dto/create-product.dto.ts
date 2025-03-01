import { IsString, IsDecimal, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsInt()
  @Min(0)
  quantity: number;
}
