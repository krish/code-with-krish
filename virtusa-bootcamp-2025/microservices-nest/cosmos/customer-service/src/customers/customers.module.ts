import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';

@Module({
  providers: [CustomersService],
  controllers: [CustomersController],
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {}
