/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface FindOneData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
}

export interface ProductServiceController {
  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  createProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOne', 'createProduct'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
