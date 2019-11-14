import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data create activity log
 *
 * @export
 * @class CreateActivityLogDTO
 */
export class CreateActivityLogDTO {
  /**
   * Customer guid
   *
   * @type {string}
   * @memberof CreateActivityLogDTO
   */
  @ApiModelProperty({ description: 'Customer guid', example: 'ddfce870-fbc1-11e9-9dcc-a3565a4d1490' })
  @IsNotEmpty()
  @IsString()
  customerId: string;
  /**
   * Subscription guid
   *
   * @type {string}
   * @memberof CreateActivityLogDTO
   */
  @ApiModelProperty({ description: 'Subscription guid', example: '58a035ca-b22f-1b4e-79c6-7e13ec15d2d2' })
  @IsNotEmpty()
  @IsString()
  subscriptionId: string;
  /**
   * Message activity log
   *
   * @type {string}
   * @memberof CreateActivityLogDTO
   */
  @ApiModelProperty({ description: 'Activity log message', example: 'Update profile data' })
  @IsNotEmpty()
  @IsString()
  message: string;
}