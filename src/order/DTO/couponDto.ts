
import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty()
  @IsString()
  readonly couponCode: string;
}