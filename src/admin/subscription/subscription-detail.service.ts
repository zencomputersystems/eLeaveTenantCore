import { Injectable, BadRequestException } from "@nestjs/common";
import { SubscriptionDbService } from '../../common/db/table.db.service';
import { CustomerInfoDTO, CompanyInfoDTO, CustomerHistoryDTO, NextBillingDateDTO, UsageDTO, CompanyDataDTO } from './dto/results-item.dto';

/**
 * Service for subscription details
 *
 * @export
 * @class SubscriptionDetailService
 */
@Injectable()
export class SubscriptionDetailService {
  /**
   *Creates an instance of SubscriptionDetailService.
   * @param {SubscriptionDbService} subscriptionDbService DB service for subscription
   * @memberof SubscriptionDetailService
   */
  constructor(private subscriptionDbService: SubscriptionDbService) { }

  /**
   * Get subscription data
   *
   * @param {[string]} [subsId]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public getData([subsId]: [string]) {
    return this.subscriptionDbService.findByFilterV4([[], ['(SUBSCRIPTION_GUID=' + subsId + ')'], null, null, null, ['CUSTOMER_DATA', 'QUOTA_DATA', 'COMPANY_DATA'], null]);
  }

  /**
   * Filter input data parameter
   *
   * @param {[string, string[]]} [item, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public inputData([item, data]: [string, string[]]) {
    let inputObj;
    if (data.length > 0) {
      if (item == 'customer_info') { inputObj = this.assignCustomerInfo([inputObj, data]); }
      if (item == 'company_info') { inputObj = this.assignCompanyInfo([inputObj, data]); }
      if (item == 'customer_history') { inputObj = this.assignCustomerHistory([inputObj, data]); }
      if (item == 'next_billing_date') { inputObj = this.assignNextBillingDate([inputObj, data]); }
      if (item == 'usage') { inputObj = this.assignUsage([inputObj, data]); }
      return inputObj;
    } else {
      return new BadRequestException('Please input valid filter', 'Invalid filter');
    }

  }

  /**
   * Assign customer info results
   *
   * @param {[CustomerInfoDTO, any]} [inputObj, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public assignCustomerInfo([inputObj, data]: [CustomerInfoDTO, any]) {
    inputObj = new CustomerInfoDTO;
    if (data[0].CUSTOMER_DATA.length > 0) {
      let customerData = data[0].CUSTOMER_DATA[0];

      inputObj.customer_name = customerData.FULLNAME;
      inputObj.customer_email = customerData.EMAIL;
      inputObj.customer_contact_no = customerData.CONTACT_NO;
      inputObj.customer_company_name = customerData.COMPANY_NAME;
      inputObj.customer_address1 = customerData.ADDRESS1;
      inputObj.customer_address2 = customerData.ADDRESS2;
      inputObj.customer_zip = customerData.POSTCODE;
      inputObj.customer_city = customerData.CITY;
      inputObj.customer_state = customerData.STATE;
      inputObj.customer_country = customerData.COUNTRY;
      inputObj.customer_currency = customerData.CURRENCY;
      inputObj.salesperson_pic = customerData.SALESPERSON;
      this.assignSubscriptionInfo([inputObj, data]);
    }
    return inputObj;
  }

  /**
   * Assign subscription info results
   *
   * @param {[CustomerInfoDTO, any]} [inputObj, data]
   * @memberof SubscriptionDetailService
   */
  public assignSubscriptionInfo([inputObj, data]: [CustomerInfoDTO, any]) {
    inputObj.subscription_id = data[0].SUBSCRIPTION_GUID;
    inputObj.subscription_label = data[0].SUBSCRIPTION_LABEL;
    inputObj.subscription_plan = data[0].PLAN
    inputObj.subscription_status = data[0].STATUS;
    inputObj.subscription_quota = data[0].QUOTA;
    inputObj.subscription_used_quota = data[0].QUOTA_DATA.USED_QUOTA;
    inputObj.creation_date = data[0].CREATION_TS;
    inputObj.activation_date = data[0].ACTIVATION_DATE;
    inputObj.last_billing_date = data[0].LAST_BILLING_DATE;
    inputObj.next_billing_date = data[0].NEXT_BILLING_DATE;
    inputObj.recurr_interval = data[0].RECURR_INTERVAL;
    inputObj.recurr_interval_val = data[0].RECURR_INTERVAL_VAL;
    inputObj.billing_cycle = data[0].BILLING_CYCLE;
    inputObj.remarks = data[0].REMARKS;
  }

  /**
   * Assign company info results
   *
   * @param {[CompanyInfoDTO, any]} [inputObj, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public assignCompanyInfo([inputObj, data]: [CompanyInfoDTO, any]) {
    let companyArr = [];
    let companyData = new CompanyDataDTO;
    companyData.total_company = data[0].QUOTA_DATA.COMPANY_COUNT;
    companyData.total_employee = data[0].QUOTA_DATA.USED_QUOTA;
    if (data[0].COMPANY_DATA.length > 0) {
      data[0].COMPANY_DATA.forEach(element => {
        inputObj = new CompanyInfoDTO;

        inputObj.id = element.TENANT_COMPANY_GUID;
        inputObj.name = element.NAME;
        inputObj.registration_no = element.REGISTRATION_NO;
        inputObj.address = element.ADDRESS;
        inputObj.total_employee = element.TOTAL_EMPLOYEE;

        companyArr.push(inputObj);
      });
    }
    companyData.company_details = companyArr;

    return companyData;
  }
  /**
   * Assign customer history results
   *
   * @param {[CustomerHistoryDTO, any]} [inputObj, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public assignCustomerHistory([inputObj, data]: [CustomerHistoryDTO, any]) {
    inputObj = new CustomerHistoryDTO;

    inputObj.history_id = '';
    inputObj.message = '';
    inputObj.update_time = '';
    inputObj.update_by = '';

    return inputObj;
  }
  /**
   * Assign next billing date results
   *
   * @param {[NextBillingDateDTO, any]} [inputObj, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public assignNextBillingDate([inputObj, data]: [NextBillingDateDTO, any]) {
    inputObj = new NextBillingDateDTO;
    inputObj.next_billing_date = data[0].NEXT_BILLING_DATE;
    return inputObj;
  }
  /**
   * Assign usage results
   *
   * @param {[UsageDTO, any]} [inputObj, data]
   * @returns
   * @memberof SubscriptionDetailService
   */
  public assignUsage([inputObj, data]: [UsageDTO, any]) {
    inputObj = new UsageDTO;

    inputObj.subscription_quota = data[0].QUOTA;
    inputObj.subscription_used_quota = data[0].QUOTA_DATA.USED_QUOTA;

    return inputObj;
  }

}