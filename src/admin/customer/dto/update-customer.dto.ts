import { CreateCustomerDTO } from './create-customer.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data update customer
 *
 * @export
 * @class UpdateCustomerDTO
 * @extends {CreateCustomerDTO}
 */
export class UpdateCustomerDTO extends CreateCustomerDTO {
  /**
   * Customer guid
   *
   * @type {string}
   * @memberof UpdateCustomerDTO
   */
  @ApiModelProperty({ description: 'Customer guid', example: 'ddfce870-fbc1-11e9-9dcc-a3565a4d1490' })
  @IsNotEmpty()
  @IsString()
  customerGuid: string;
}