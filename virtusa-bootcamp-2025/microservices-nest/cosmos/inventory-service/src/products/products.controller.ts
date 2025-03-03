import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ): Promise<{ available: boolean }> {
    return this.productsService.validateStock(id, quantity);
  }
  @Patch(':id/quantity')
  async reduceStock(
    @Param('id') id: number,
    @Body('quantity') quantity: number,
  ): Promise<Product> {
    return this.productsService.reduceStock(id, quantity);
  }
}
