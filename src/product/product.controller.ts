import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { Product as ProductModel} from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
  
@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor( private readonly productService: ProductService) {}

    @Post('add')
    async createProduct(
      @Body() productData: { pname : string; description: string; price : number; stock : number;},
    ): Promise<ProductModel> {
      return this.productService.createProduct(productData);
    }

    @Get('all')
    async getProducts() {
      return this.productService.getProducts();
    }
    
}
