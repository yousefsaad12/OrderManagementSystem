import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    BadRequestException,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User as UserModel} from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { ApiTags } from '@nestjs/swagger';
  
@ApiTags('User')
@Controller('user')
export class UserController {

    constructor( 
      private readonly userService : UserService,
      private readonly cartService : CartService) {}

    @Post('add')
    async signupUser(
      @Body() userData: { uname : string; email: string; address : string; pword : string;},
    ): Promise<UserModel> {

      const user = await this.userService.createUser(userData);
      await  this.cartService.createCart(user.userId);

      return user
    }

    @Get('all')
    async getUsers() {
      return await this.userService.getUsers();
    }

    @Get(':userId/orders')
    async getOrdersByUserId(@Param('userId', ParseIntPipe) userId: number) {
      return await this.userService.getOrdersByUserId(userId);
    }
    
}
