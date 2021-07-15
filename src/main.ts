import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrapUser() {
  const app = await NestFactory.create(UserModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`User application is running on: ${await app.getUrl()}`);
}
bootstrapUser();

// product
async function bootstrapProduct() {
  const app = await NestFactory.create(ProductModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(`Product application is running on: ${await app.getUrl()}`);
}
bootstrapProduct();

// cart
async function bootstrapCart() {
  const app = await NestFactory.create(CartModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Cart')
    .setDescription('The carts API description')
    .setVersion('1.0')
    .addTag('carts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
  console.log(`Cart application is running on: ${await app.getUrl()}`);
}
bootstrapCart();

//order
async function bootstrapOrder() {
  const app = await NestFactory.create(OrderModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Order')
    .setDescription('The orders API description')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3003);
  console.log(`Order application is running on: ${await app.getUrl()}`);
}
bootstrapOrder();

//auth
async function bootstrapAuth() {
  const app = await NestFactory.create(AuthModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3004);
  console.log(`Auth application is running on: ${await app.getUrl()}`);
}
bootstrapAuth();
