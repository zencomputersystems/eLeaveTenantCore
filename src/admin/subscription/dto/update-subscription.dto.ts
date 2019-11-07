import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateSubscriptionDTO } from './create-subscription.dto';

/**
 * Data update subscription
 *
 * @export
 * @class UpdateSubscriptionDTO
 * @extends {CreateSubscriptionDTO}
 */
export class UpdateSubscriptionDTO extends CreateSubscriptionDTO {
  /**
   * Subscription guid
   *
   * @type {string}
   * @memberof UpdateSubscriptionDTO
   */
  @ApiModelProperty({ description: 'Subscription guid', example: '159de5c0-fc55-11e9-b448-03c4266d6653' })
  @IsNotEmpty()
  @IsString()
  subscriptionGuid: string;
}