import { Metadata} from '@grpc/grpc-js';
import { BadRequestException, ConflictException, Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from 'grpc';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../products.service';

@Controller('product-grpc-server')
export class ProductGrpcServerController {
    constructor(private readonly productService: ProductsService) {
        
    }
    @GrpcMethod("ProductService", "Create")
   async create({name, price, thumbnail}: CreateProductDto, metadata: Metadata, call) {
        try {
            const prod = await this.productService.create({ name, price, thumbnail })
            return prod
        } catch (err) {
            throw new RpcException({
                message: "Product already exists",
                code: status.ALREADY_EXISTS
            })
        }
    }
    @GrpcMethod("ProductService", "Update")
    async update(
        data: { id?: string, name?: string, price?: number, thumbnail?: string },
        metadata: Metadata,
        call
    ) {
        try {
            const {id, ...rest} = data
            const updatedProd = await this.productService.update(id, rest)
            return updatedProd
        } catch (err) {
            throw new RpcException({
                message: "Product not found",
                code: status.NOT_FOUND
            })
        }
    }
    @GrpcMethod("ProductService", "FindOne")
    async findOne(data: { id: string }) {
        try {
            const {id} = data
            const product = await this.productService.findOne(id)
            return product
        } catch (err) {
            throw new RpcException({
                message: "Product not found",
                code: status.NOT_FOUND
            })
        }
    }
    @GrpcMethod("ProductService", "FindAll")
    async FindAll(data) {
        try {
            const products = await this.productService.findAll()
            return {data: products}
        } catch (err) {
            throw new RpcException({
                message: "Bad Request",
                code: status.INTERNAL
            })
        }
    }
}
