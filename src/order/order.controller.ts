import { Body, Controller, Inject, Post, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderResponse, OrderServiceClient, ORDER_SERVICE_NAME } from './order.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('order')
export class OrderController implements OnModuleInit {
  private service: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(@Body() body: any): Promise<Observable<CreateOrderResponse>> {
    return this.service.createOrder(body);
  }
}
