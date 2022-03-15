import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController]
})
export class OrderModule {}
