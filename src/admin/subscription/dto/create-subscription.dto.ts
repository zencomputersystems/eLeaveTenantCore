import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

/**
 * Data create subscription
 *
 * @export
 * @class CreateSubscriptionDTO
 */
export class CreateSubscriptionDTO {
  /**
   * Subscription label
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription label', example: 'SUB-1' })
  @IsNotEmpty()
  @IsString()
  subscriptionLabel: string;

  /**
   * Customer guid
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Customer Id', example: '2c077cf0-fbc8-11e9-9e4f-17c749da278d' })
  @IsNotEmpty()
  @IsString()
  customerGuid: string;

  /**
   * Subscription plan
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription plan', example: 'standard' })
  @IsNotEmpty()
  @IsString()
  subscriptionPlan: string;

  /**
   * Subscription status (0-Inactive/1-Active)
   *
   * @type {number}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription status', example: 0 })
  @IsNotEmpty()
  @IsNumber()
  subscriptionStatus: number;

  /**
   * Subscription quota
   *
   * @type {number}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription quota', example: 500 })
  @IsNotEmpty()
  @IsNumber()
  subscriptionQuota: number;

  /**
   * Subscription used quota
   *
   * @type {number}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription used quota', example: 300 })
  @IsNotEmpty()
  @IsNumber()
  usedQuota: number;

  /**
   * Activation date
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Activated date', example: '2018-01-01' })
  @IsNotEmpty()
  @IsString()
  activationDate: string;

  /**
   * Last billing date
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Last billing date', example: '2019-10-30' })
  @IsNotEmpty()
  @IsString()
  lastBillingDate: string;

  /**
   * Next billing date
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Next billing date', example: '2019-11-30' })
  @IsNotEmpty()
  @IsString()
  nextBillingDate: string;

  /**
   * Recurr interval
   *
   * @type {string}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Recurr interval', example: 'Month' })
  @IsNotEmpty()
  @IsString()
  recurrInterval: string;

  /**
   * Recurr interval value
   *
   * @type {number}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Recurr interval value', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  recurrIntervalVal: number;

  /**
   * Billing cycle
   *
   * @type {number}
   * @memberof CreateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Billing cycle', example: 22 })
  @IsNotEmpty()
  @IsNumber()
  billingCycle: number;
}