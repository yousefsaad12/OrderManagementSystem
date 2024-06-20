import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { OrderResponseDTO } from 'src/order/DTO/orderDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({
            data
        })
    }

    async getOrdersByUserId(userId: number)
    {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: { orderItems:{include : {product : true}} },
          });
          
          if (!orders.length) {
            throw new NotFoundException('No orders found for this user');
          }
          
          const user = this.prisma.user.findFirst({where:{userId}});

          const orderResponse =  orders.map(order => OrderResponseDTO(order, 0))

          return {
            Username : (await user).uname,
            orders : orderResponse
          };
    }

    async checkEmail (email)
    {
       const user = await this.prisma.user.findFirst(email);

       if(user)
            return false

       return true
    }
}
