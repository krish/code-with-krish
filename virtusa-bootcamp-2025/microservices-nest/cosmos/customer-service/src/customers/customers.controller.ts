import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entity/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number): Promise<Customer> {
    return this.customersService.getCustomerById(id);
  }

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }
}
