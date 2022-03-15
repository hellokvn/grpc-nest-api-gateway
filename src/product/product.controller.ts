import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FindOneResponse, ProductServiceClient, PRODUCT_SERVICE_NAME, CreateResponse, CreateRequest } from './product.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('product')
export class ProductController implements OnModuleInit {
  private service: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async getStock(@Body() body: CreateRequest): Promise<Observable<CreateResponse>> {
    return this.service.create(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
    return this.service.findOne({ id });
  }
}
