import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

/**
 * Data update user main
 *
 * @export
 * @class UpdateUserMainDTO
 */
export class UpdateUserMainDTO {
  /**
   * User id
   *
   * @type {string}
   * @memberof UpdateUserMainDTO
   */
  @ApiModelProperty({ description: 'User guid', example: '5a72eae0-fa27-11e9-b5e6-3318c41713a4' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  /**
   * Email
   *
   * @type {string}
   * @memberof UpdateUserMainDTO
   */
  @ApiModelProperty({ description: 'Email of user', example: 'sally@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  email: string;

  /**
   * Fullname
   *
   * @type {string}
   * @memberof UpdateUserMainDTO
   */
  @ApiModelProperty({ description: 'Fullname of user', example: 'Nur Salina Binti Mustapha' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  /**
   * Role
   *
   * @type {string}
   * @memberof UpdateUserMainDTO
   */
  @ApiModelProperty({ description: 'Role of user', example: 'support' })
  @IsNotEmpty()
  @IsString()
  role: string;

  /**
   * Status
   *
   * @type {number}
   * @memberof UpdateUserMainDTO
   */
  @ApiModelProperty({ description: 'Status of user (0:Inactive / 1:Active)', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  status: number;
}