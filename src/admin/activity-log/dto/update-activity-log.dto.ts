import { CreateActivityLogDTO } from "./create-activity-log.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data update activity log
 *
 * @export
 * @class UpdateActivityLogDTO
 * @extends {CreateActivityLogDTO}
 */
export class UpdateActivityLogDTO extends CreateActivityLogDTO {
  /**
   * Log guid
   *
   * @type {string}
   * @memberof UpdateActivityLogDTO
   */
  @ApiModelProperty({ description: 'Log guid', example: 'ddfce870-fbc1-11e9-9dcc-a3565a4d1490' })
  @IsNotEmpty()
  @IsString()
  logId: string;
}