import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path"
import {MicroserviceOptions, Transport} from "@nestjs/microservices"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle("Cadastro de produtos")
    .setVersion("0.0.1")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("apidocs", app, document)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50051",
      package: "product",
      protoPath: join(__dirname, "products/proto/product.proto")
    }
  })
  await app.startAllMicroservices()
  await app.listen(3001);
}
bootstrap();
