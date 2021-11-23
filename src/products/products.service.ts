import {BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository <Product>
  ){}
  async create({name,price, thumbnail}: CreateProductDto) {
    const product = this.productRepository.create({ name, price, thumbnail })
    const productExists = await this.productRepository.findOne({name})
    if (productExists) {
      throw new ConflictException()
    }
    return await this.productRepository.save(product)
  }

  async findAll() {
    const products = await this.productRepository.find()
    return products
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneOrFail(id)
      return product
    } catch (err) {
      throw new NotFoundException(err.message)
    }

  }

 async update(id: string, updateProductDto: UpdateProductDto) {
   const updateResult = await this.productRepository.update(id, updateProductDto)
   if (!updateResult.affected) {
     throw new EntityNotFoundError(Product, id)
   }
   return this.productRepository.findOne(id)
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findOneOrFail(id)
      await this.productRepository.remove(product)
    } catch (err) {
      throw new BadRequestException(err.message)
   }
 }
}
