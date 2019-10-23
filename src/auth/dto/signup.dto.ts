import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignupDTO {
  @ApiModelProperty({ description: 'Name of user', example: 'Mee Hai Lam' })
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({ description: 'Email of user', example: 'meehailam@zen.com.my' })
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({ description: 'Encrypted password', example: 'U2FsdGVkX1/KIXThPp1Pl4cGVZEKLjRxVF8QgwS76NI=' })
  @IsNotEmpty()
  password: string;

  @ApiModelProperty({ description: 'Role of user', example: 'salesperson' })
  @IsNotEmpty()
  role: string;
}