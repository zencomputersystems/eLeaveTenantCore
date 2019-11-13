import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data create customer
 *
 * @export
 * @class CreateCustomerDTO
 */
export class CreateCustomerDTO {
  /**
   * Customer label
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Customer label', example: 'CUS-1' })
  @IsNotEmpty()
  @IsString()
  customerLabel: string;

  /**
   * Fullname
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Fullname', example: 'Angela Amelia Hart' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  /**
   * Nickname
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Nickname', example: 'Amelia Hart' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  /**
   * Email
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Email', example: 'amelia@abccompany1.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  /**
   * Contact no
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Contact number', example: '60135558778' })
  @IsNotEmpty()
  @IsString()
  contactNo: string;

  /**
   * Company name
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Company name', example: 'ABC Company 1 Sdn. Bhd.' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  /**
   * Address 1
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Address 1', example: 'Level 201A, 8, Jalan Damansara' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  /**
   * Address 2
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Address 2', example: 'Empire City' })
  @IsNotEmpty()
  @IsString()
  address2: string;

  /**
   * Postcode
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Postcode', example: '47820' })
  @IsNotEmpty()
  @IsString()
  postcode: string;

  /**
   * City
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'City', example: 'Petaling Jaya' })
  @IsNotEmpty()
  @IsString()
  city: string;

  /**
   * State
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'State', example: 'Selangor' })
  @IsNotEmpty()
  @IsString()
  state: string;

  /**
   * Country
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Country', example: 'Malaysia' })
  @IsNotEmpty()
  @IsString()
  country: string;

  /**
   * Currency
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Currency', example: 'MYR' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  /**
   * Salesperson
   *
   * @type {string}
   * @memberof CreateCustomerDTO
   */
  @ApiModelProperty({ description: 'Salesperson', example: 'Bruno Mckinley' })
  @IsNotEmpty()
  @IsString()
  salesperson: string;
}