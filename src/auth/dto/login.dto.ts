import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {

  @ApiModelProperty({ description: 'Email id account', example: 'meehailam@zen.com.my' })
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ description: 'Password for email account', example: 'U2FsdGVkX1/KIXThPp1Pl4cGVZEKLjRxVF8QgwS76NI=' })
  @IsNotEmpty()
  readonly password: string;

}