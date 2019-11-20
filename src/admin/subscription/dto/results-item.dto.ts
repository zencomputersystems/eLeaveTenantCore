/**
 * Data customer info
 *
 * @export
 * @class CustomerInfoDTO
 */
export class CustomerInfoDTO {
  /**
   * Name
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_name: string;
  /**
   * Email
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_email: string;
  /**
   * Contact number
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_contact_no: string;
  /**
   * Company name
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_company_name: string;
  /**
   * Address 1
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_address1: string;
  /**
   * Address 2
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_address2: string;
  /**
   * Zip or postcode
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_zip: string;
  /**
   * City
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_city: string;
  /**
   * State
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_state: string;
  /**
   * Country
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_country: string;
  /**
   * Currency
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  customer_currency: string;
  /**
   * Salesperson
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  salesperson_pic: string;
  /**
   * Subscription id
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  subscription_id: string;
  /**
   * Subscription label
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  subscription_label: string;
  /**
   * Subscription plan
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  subscription_plan: string;
  /**
   * Subscription status
   *
   * @type {number}
   * @memberof CustomerInfoDTO
   */
  subscription_status: number;
  /**
   * Subscription quota
   *
   * @type {number}
   * @memberof CustomerInfoDTO
   */
  subscription_quota: number;
  /**
   * Subscription used quota
   *
   * @type {number}
   * @memberof CustomerInfoDTO
   */
  subscription_used_quota: number;
  /**
   * Subscription creation date
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  creation_date: string;
  /**
   * Activation date
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  activation_date: string;
  /**
   * Last billing date
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  last_billing_date: string;
  /**
   * Next billing date
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  next_billing_date: string;
  /**
   * Recurr interval
   *
   * @type {string}
   * @memberof CustomerInfoDTO
   */
  recurr_interval: string;
  /**
   * Recurr interval value
   *
   * @type {number}
   * @memberof CustomerInfoDTO
   */
  recurr_interval_val: number;
  /**
   * Billing cycle
   *
   * @type {number}
   * @memberof CustomerInfoDTO
   */
  billing_cycle: number;
}



/**
 * Data company summary
 *
 * @export
 * @class CompanyDataDTO
 */
export class CompanyDataDTO {
  /**
   * Total company
   *
   * @type {number}
   * @memberof CompanyDataDTO
   */
  total_company: number;
  /**
   * Total employee
   *
   * @type {number}
   * @memberof CompanyDataDTO
   */
  total_employee: number;
  /**
   * Company details
   *
   * @type {CompanyInfoDTO[]}
   * @memberof CompanyDataDTO
   */
  company_details: CompanyInfoDTO[];
}



/**
 * Dataa company info
 *
 * @export
 * @class CompanyInfoDTO
 */
export class CompanyInfoDTO {
  /**
   * company id
   *
   * @type {string}
   * @memberof CompanyInfoDTO
   */
  id: string;
  /**
   * Name
   *
   * @type {string}
   * @memberof CompanyInfoDTO
   */
  name: string;
  /**
   * Registration number
   *
   * @type {string}
   * @memberof CompanyInfoDTO
   */
  registration_no: string;
  /**
   * Address
   *
   * @type {string}
   * @memberof CompanyInfoDTO
   */
  address: string;
  /**
   * Total employee in company
   *
   * @type {number}
   * @memberof CompanyInfoDTO
   */
  total_employee: number;
}



/**
 * Data customer history
 *
 * @export
 * @class CustomerHistoryDTO
 */
export class CustomerHistoryDTO {
  /**
   * History id
   *
   * @type {string}
   * @memberof CustomerHistoryDTO
   */
  history_id: string;
  /**
   * Message
   *
   * @type {string}
   * @memberof CustomerHistoryDTO
   */
  message: string;
  /**
   * Update time
   *
   * @type {string}
   * @memberof CustomerHistoryDTO
   */
  update_time: string;
  /**
   * Updater user guid
   *
   * @type {string}
   * @memberof CustomerHistoryDTO
   */
  update_by: string;
}



/**
 * Data next billing date
 *
 * @export
 * @class NextBillingDateDTO
 */
export class NextBillingDateDTO {
  /**
   * Next billing date
   *
   * @type {string}
   * @memberof NextBillingDateDTO
   */
  next_billing_date: string;
}



/**
 * Data usage quota
 *
 * @export
 * @class UsageDTO
 */
export class UsageDTO {
  /**
   * Subscription quota
   *
   * @type {number}
   * @memberof UsageDTO
   */
  subscription_quota: number;
  /**
   * Subscription used quota
   *
   * @type {number}
   * @memberof UsageDTO
   */
  subscription_used_quota: number;
}