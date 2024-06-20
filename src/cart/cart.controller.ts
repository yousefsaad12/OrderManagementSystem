import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddToCartDto, RemoveFromCartDto, UpdateCartDto } from './cartDto';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Post('add')
    async addToCart(@Body() addToCartDto: AddToCartDto) {
      return this.cartService.addToCart(addToCartDto);
    }
  
    @Get(':userId')
    async viewCart(@Param('userId', ParseIntPipe) userId: number) {
      return this.cartService.viewCart(userId);
    }
  
    @Put('update')
    async updateCart(@Body() updateCartDto: UpdateCartDto) {
      return this.cartService.updateCart(updateCartDto);
    }
  
    @Delete('delete')
    async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
      return this.cartService.removeFromCart(removeFromCartDto);
    }
}
