import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDTO {
  @ApiModelProperty({ description: 'Fullname', example: 'Angela Amelia Hart' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiModelProperty({ description: 'Nickname', example: 'Amelia Hart' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiModelProperty({ description: 'Email', example: 'amelia@abccompany1.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiModelProperty({ description: 'Contact number', example: '60135558778' })
  @IsNotEmpty()
  @IsString()
  contactNo: string;

  @ApiModelProperty({ description: 'Company name', example: 'ABC Company 1 Sdn. Bhd.' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiModelProperty({ description: 'Address 1', example: 'Level 201A, 8, Jalan Damansara' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiModelProperty({ description: 'Address 2', example: 'Empire City' })
  @IsNotEmpty()
  @IsString()
  address2: string;

  @ApiModelProperty({ description: 'Postcode', example: '47820' })
  @IsNotEmpty()
  @IsString()
  postcode: string;

  @ApiModelProperty({ description: 'City', example: 'Petaling Jaya' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiModelProperty({ description: 'State', example: 'Selangor' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiModelProperty({ description: 'Country', example: 'Malaysia' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiModelProperty({ description: 'Currency', example: 'MYR' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiModelProperty({ description: 'Salesperson', example: 'Bruno Mckinley' })
  @IsNotEmpty()
  @IsString()
  salesperson: string;
}