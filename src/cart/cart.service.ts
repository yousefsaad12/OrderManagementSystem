import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddToCartDto, CartItemResponse, CartResponse, RemoveFromCartDto, UpdateCartDto} from './cartDto';
import { connect } from 'http2';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}
    
    
    async createCart(userId : number)
    {
      await this.prisma.cart.create({ data :  {userId} })
    }
        


    async addToCart(addToCartDto: AddToCartDto) {
        const { userId, productId, quantity } = addToCartDto;
    
        const cart = await this.prisma.cart.findFirst({
          where: {
            userId,
          },
          include: {
            cartItems: true,
          },
        });
    
        if (!cart) {
          throw new NotFoundException(`Cart not found for userId ${userId}`);
        }
    
        // Check if the cart item already exists
        const existingCartItem = cart.cartItems.find(item => item.productId === productId);
    
        if (existingCartItem) {
          // Update quantity if the cart item exists
          return this.prisma.cartItem.update({
            where: {
              cartItemId: existingCartItem.cartItemId,
            },
            data: {
              quantity: {
                increment: quantity,
              },
            },
          });
        } else {
          // Create a new cart item if it doesn't exist
          const cartItemData: any = {
            cart: {
              connect: {
                cartId: cart.cartId,             
              },
            },

            product : {
              connect: {
                productId : productId
              }
            },
            
            quantity,
            
          };
    
          return this.prisma.cartItem.create({
            data: cartItemData,
          });
        }
      }
    
      // Other methods like viewCart, updateCart, removeFromCart...
    
    
      async viewCart(userId: number) {
        const cart = await this.prisma.cart.findFirst({
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
    
        if (!cart) {
          throw new NotFoundException(`Cart not found for userId ${userId}`);
        }
        
        const cartResponse =  await this.transformCartToResponse(cart);
       
        return cartResponse;
      }


    
      async updateCart(updateCartDto: UpdateCartDto) {
        const { userId, cartItemId, quantity } = updateCartDto;
    
        const existingCart = await this.prisma.cart.findFirst({
          where: {
            userId,
          },
          include: {
            cartItems: true,
          },
        });

        if(existingCart)
          {
            const existingCartItem = existingCart.cartItems
                                                 .find(item => item.cartItemId == cartItemId);
          if (existingCartItem) {
          const cartItem = await this.prisma.cartItem.update({
               where: {
                         cartItemId: existingCartItem.cartItemId,
                     },
               data: {
                      quantity,
                     },
              include : 
                    {
                      product : true
                    }
              });
              return await this.transformToCartItemResponse(cartItem);

          } else {
             throw new NotFoundException('Cart item not found');
              }
        }
          else
          {
            throw new NotFoundException(`Cart not found for cartId ${userId}`);
          }
     
      }
    
      async removeFromCart(removeFromCartDto: RemoveFromCartDto) {
        const { userId, cartItemId} = removeFromCartDto;
        
        const cart = await this.prisma.cart.findFirst({where : { userId}, include : {cartItems : true}})

        if(!cart)
          throw new NotFoundException(`Cart not found for cartId ${userId}`);

        const cartItem = await cart.cartItems.find(item => item.cartItemId === cartItemId);
    
        if (!cartItem) {
          throw new NotFoundException(`CartItem not found for cartItemId ${cartItemId}`);
        }
    
        const cartItemAfterDelete = await this.prisma.cartItem.delete({
          where: {
            cartItemId,
          },
          include : 
          {
            product : true
          }
        });
        
        return await this.transformToCartItemResponse(cartItemAfterDelete);
      }

      async  transformCartToResponse(cartData: any): Promise<CartResponse> {
        const cartResponse = new CartResponse();
        cartResponse.userId = cartData.userId;
        cartResponse.cartItems = cartData.cartItems.map((item: any) => {
          const cartItemResponse = new CartItemResponse();
          cartItemResponse.quantity = item.quantity;
          cartItemResponse.pname = item.product.pname;
          cartItemResponse.description = item.product.description;
          cartItemResponse.price = item.product.price;
          return cartItemResponse;
        });
        cartResponse.totalPrice = cartData.cartItems.reduce((total: number, item: any) => {
          return total + (item.quantity * item.product.price);
        }, 0);
        return cartResponse;
      }

      async transformToCartItemResponse(cartItem: any): Promise<CartItemResponse> {
        const cartItemResponse = new CartItemResponse();
        cartItemResponse.quantity = cartItem.quantity;
        cartItemResponse.pname = cartItem.product.pname;
        cartItemResponse.description = cartItem.product.description;
        cartItemResponse.price = cartItem.product.price;
        return cartItemResponse;
      }

} 