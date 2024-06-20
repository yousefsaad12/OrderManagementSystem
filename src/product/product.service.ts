import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async getProducts(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data
        })
    }
}
