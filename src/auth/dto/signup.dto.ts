import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * Data signup
 *
 * @export
 * @class SignupDTO
 */
export class SignupDTO {
  /**
   * Name
   *
   * @type {string}
   * @memberof SignupDTO
   */
  @ApiModelProperty({ description: 'Name of user', example: 'Mee Hai Lam' })
  @IsNotEmpty()
  name: string;

  /**
   * Email
   *
   * @type {string}
   * @memberof SignupDTO
   */
  @ApiModelProperty({ description: 'Email of user', example: 'meehailam@zen.com.my' })
  @IsNotEmpty()
  email: string;

  /**
   * Login id
   *
   * @type {string}
   * @memberof SignupDTO
   */
  @ApiModelProperty({ description: 'Login id of user', example: 'meehailam@zen.com.my' })
  @IsNotEmpty()
  loginId: string;

  /**
   * Password
   *
   * @type {string}
   * @memberof SignupDTO
   */
  @ApiModelProperty({ description: 'Encrypted password', example: 'U2FsdGVkX1/KIXThPp1Pl4cGVZEKLjRxVF8QgwS76NI=' })
  @IsNotEmpty()
  password: string;

  /**
   * Role
   *
   * @type {string}
   * @memberof SignupDTO
   */
  @ApiModelProperty({ description: 'Role of user', example: 'salesperson' })
  @IsNotEmpty()
  role: string;
}