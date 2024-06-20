import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AppController, UserController, CartController, ProductController, OrderController],
  providers: [AppService, UserService, PrismaService, CartService, ProductService, OrderService],
})

export class AppModule {}
