import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateUserMainDTO {
  @ApiModelProperty({ description: 'User guid', example: '5a72eae0-fa27-11e9-b5e6-3318c41713a4' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiModelProperty({ description: 'Email of user', example: 'sally@zen.com.my' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiModelProperty({ description: 'Fullname of user', example: 'Nur Salina Binti Mustapha' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiModelProperty({ description: 'Role of user', example: 'support' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiModelProperty({ description: 'Status of user (0:Inactive / 1:Active)', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  status: number;
}