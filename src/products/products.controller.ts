import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags("Produtos")  
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Rota para criação de produtos" })
  @ApiResponse({ status: 201, description: "Produto criado" })
  @ApiResponse({status: 409, description: "Produto ja cadastrado"})  
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Rota para buscar todos os produtos cadastrados" })
  @ApiResponse({ status: 200, description: "ok" })
  
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota para busca um produto por id" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({status: 404, description: "Não encontrado"})  
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Rota para atualizar um produto" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({status: 404, description: "Não encontrado"})  
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @ApiOperation({ summary: "Rota para deletar um produto" })
  @ApiResponse({ status: 204, description: "Sem conteudo" })
  @ApiResponse({status: 400, description: "Bad request"})  
  @Delete(':id')
 async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
