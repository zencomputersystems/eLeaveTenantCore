import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateSubscriptionDTO } from './create-subscription.dto';

export class UpdateSubscriptionDTO extends CreateSubscriptionDTO {
  @ApiModelProperty({ description: 'Subscription guid', example: '159de5c0-fc55-11e9-b448-03c4266d6653' })
  @IsNotEmpty()
  @IsString()
  subscriptionGuid: string;
}