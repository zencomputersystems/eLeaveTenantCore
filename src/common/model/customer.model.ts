import { CreateUpdateModel } from "./create-update.model";

/**
 * Customer model
 *
 * @export
 * @class CustomerModel
 */
export class CustomerModel extends CreateUpdateModel {
  /**
   * Customer id
   *
   * @type {string}
   * @memberof CustomerModel
   */
  CUSTOMER_GUID: string;
  /**
   * Customer label
   *
   * @type {string}
   * @memberof CustomerModel
   */
  CUSTOMER_LABEL: string;
  /**
   * Commerce id
   *
   * @type {string}
   * @memberof CustomerModel
   */
  COMMERCE_ID: string;
  /**
   * Fullname
   *
   * @type {string}
   * @memberof CustomerModel
   */
  FULLNAME: string;
  /**
   * Nickname
   *
   * @type {string}
   * @memberof CustomerModel
   */
  NICKNAME: string;
  /**
   * Email
   *
   * @type {string}
   * @memberof CustomerModel
   */
  EMAIL: string;
  /**
   * Contact no
   *
   * @type {string}
   * @memberof CustomerModel
   */
  CONTACT_NO: string;
  /**
   * Company name
   *
   * @type {string}
   * @memberof CustomerModel
   */
  COMPANY_NAME: string;
  /**
   * Address 1
   *
   * @type {string}
   * @memberof CustomerModel
   */
  ADDRESS1: string;
  /**
   * Address 2
   *
   * @type {string}
   * @memberof CustomerModel
   */
  ADDRESS2: string;
  /**
   * Postcode
   *
   * @type {string}
   * @memberof CustomerModel
   */
  POSTCODE: string;
  /**
   * City
   *
   * @type {string}
   * @memberof CustomerModel
   */
  CITY: string;
  /**
   * State
   *
   * @type {string}
   * @memberof CustomerModel
   */
  STATE: string;
  /**
   * Country
   *
   * @type {string}
   * @memberof CustomerModel
   */
  COUNTRY: string;
  /**
   * Currency
   *
   * @type {string}
   * @memberof CustomerModel
   */
  CURRENCY: string;
  /**
   * Salesperson
   *
   * @type {string}
   * @memberof CustomerModel
   */
  SALESPERSON: string;
}