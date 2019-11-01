import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateSubscriptionDTO {
  @ApiModelProperty({ description: 'Subscription plan', example: 'standard' })
  @IsNotEmpty()
  @IsString()
  subscriptionPlan: string;

  @ApiModelProperty({ description: 'Subscription status', example: 0 })
  @IsNotEmpty()
  @IsNumber()
  subscriptionStatus: number;

  @ApiModelProperty({ description: 'Subscription quota', example: 500 })
  @IsNotEmpty()
  @IsNumber()
  subscriptionQuota: number;

  @ApiModelProperty({ description: 'Subscription used quota', example: 300 })
  @IsNotEmpty()
  @IsNumber()
  usedQuota: number;

  @ApiModelProperty({ description: 'Activated date', example: '2018-01-01' })
  @IsNotEmpty()
  @IsString()
  activationDate: string;

  @ApiModelProperty({ description: 'Last billing date', example: '2019-10-30' })
  @IsNotEmpty()
  @IsString()
  lastBillingDate: string;

  @ApiModelProperty({ description: 'Next billing date', example: '2019-11-30' })
  @IsNotEmpty()
  @IsString()
  nextBillingDate: string;

  @ApiModelProperty({ description: 'Recurr interval', example: 'Month' })
  @IsNotEmpty()
  @IsString()
  recurrInterval: string;

  @ApiModelProperty({ description: 'Recurr interval value', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  recurrIntervalVal: number;

  @ApiModelProperty({ description: 'Billing cycle', example: 22 })
  @IsNotEmpty()
  @IsNumber()
  billingCycle: number;
}