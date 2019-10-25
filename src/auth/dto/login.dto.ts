import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {

  @ApiModelProperty({ description: 'Login id account', example: 'meehailam@zen.com.my' })
  @IsNotEmpty()
  readonly loginId: string;

  @ApiModelProperty({ description: 'Password for user account', example: '1f86c446121a0219e5eae8c531981ee550b0844384f1603bc0c9eb625b2c3d91' })
  @IsNotEmpty()
  readonly password: string;

}