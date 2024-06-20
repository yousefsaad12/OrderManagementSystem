// src/order/dto/create-order.dto.ts

import { OrderStatus } from "@prisma/client";

export class CreateOrderDto {
    userId: number;
  }
  
  // src/order/dto/update-order-status.dto.ts
  
  
export interface UpdateOrderStatusDto {
    status: OrderStatus;
  }



  export function OrderResponseDTO(createdOrder,discount : number) {
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