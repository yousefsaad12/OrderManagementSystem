// src/order/order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { CreateOrderDto } from './DTO/orderDto';
import { UpdateOrderStatusDto } from './DTO/orderDto';
import { ApplyCouponDto } from './DTO/couponDto';


@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  private coupons = [
    { code: 'SUMMER21', discount: 0.10 },
    { code: 'WINTER21', discount: 0.15 },
    { code: 'SPRING21', discount: 0.5 },
  ];

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId } = createOrderDto;

    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true, 
          },
        },
      },
    });

    
    const userItem = userCart.cartItems;
    const cartId = userCart.cartId

    if (userItem.length === 0) 
      throw new NotFoundException(`Cart is empty for this user Id ${userId}`);
    

    const orderItems = userItem.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const createdOrder = await this.prisma.order.create({
      data: {
        userId,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems :{
            include:{product : true}
            
        },
      },
    });

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    });

    for (const item of orderItems) {
      await this.prisma.product.update({
        where: { productId: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return await this.OrderResponseDTO(createdOrder,0);
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true, 
          },
      },
    }})

    if(!order)
      throw new NotFoundException(`order not found for order Id ${orderId}`);

    return await this.OrderResponseDTO(order, 0);
  }

  async updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const {status}  = updateOrderStatusDto;

    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error(`Invalid order status: ${status}`);
    }
    await this.prisma.order.update({
      where: {
        orderId: orderId, 
      },
      data: {
        status,
      },
    });

    return { message: `Order status with id ${orderId} has been updated` };
  }



  
  async applyCoupon(orderId: number, applyCouponDto: ApplyCouponDto) {
    const { couponCode } = applyCouponDto;

    const coupon = this.coupons.find(c => c.code === couponCode);

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    const order = await this.prisma.order.findUnique(
      { where: { orderId: orderId }, 
      include : 
      {   orderItems:
          { include : {product : true}} 
      } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }


    return await this.OrderResponseDTO(order, coupon.discount);
  }

  async OrderResponseDTO(createdOrder,discount : number) {
    const orderItems = createdOrder.orderItems.map(item => ({
      productName: item.product.pname,
      price: item.product.price,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
    }));
  
    var totalOrderPrice = orderItems.reduce((total, item) => total + item.totalPrice, 0);
    totalOrderPrice = totalOrderPrice - totalOrderPrice * discount
    const status = createdOrder.status
    const date = createdOrder.orderDate
    return {
      orderItems,
      totalOrderPrice,
      discount,
      status,
      date
    };
  }


}