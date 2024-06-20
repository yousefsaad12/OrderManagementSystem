export class AddToCartDto {
    userId: number;
    productId: number;
    quantity: number;
  }
  
  export class CartResponse {
    userId: number;
    cartItems: CartItemResponse[];
    totalPrice : number
  }

 export class CartItemResponse {
  quantity: number;
  pname: string;
  description: string;
  price: number;
}
  
  export class UpdateCartDto {
    userId : number
    cartItemId: number;
    quantity: number;
  }
  
  // src/cart/dto/remove-from-cart.dto.ts
  
  export class RemoveFromCartDto {
    cartItemId : number
    userId: number;
  }