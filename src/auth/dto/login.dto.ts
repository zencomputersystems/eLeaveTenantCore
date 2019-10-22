import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {

  @ApiModelProperty({ description: 'Email id account', example: 'tarmimi@zen.com.my' })
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ description: 'Password for email account', example: 'P@ss1234' })
  @IsNotEmpty()
  readonly password: string;

}