import { CreateCustomerDTO } from './create-customer.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustomerDTO extends CreateCustomerDTO {
  @ApiModelProperty({ description: 'Customer guid', example: 'ddfce870-fbc1-11e9-9dcc-a3565a4d1490' })
  @IsNotEmpty()
  @IsString()
  customerGuid: string;
}