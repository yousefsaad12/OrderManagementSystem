import { Controller, Post, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTO/orderDto'
import { UpdateOrderStatusDto } from './DTO/orderDto'
import { ApiTags } from '@nestjs/swagger';
import { ApplyCouponDto } from './DTO/couponDto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto);
  }

  @Post(':orderId/coupon')
  async applyCoupon(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() applyCouponDto: ApplyCouponDto,
  ) {
    return this.orderService.applyCoupon(orderId, applyCouponDto);
  }
}