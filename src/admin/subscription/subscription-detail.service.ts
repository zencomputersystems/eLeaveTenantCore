import { Injectable } from "@nestjs/common";
import { of } from "rxjs";
import { SubscriptionDbService } from '../../common/db/table.db.service';
import { CustomerInfoDTO, CompanyInfoDTO, CustomerHistoryDTO, NextBillingDateDTO, UsageDTO } from './dto/results-item.dto';

@Injectable()
export class SubscriptionDetailService {
  constructor(private subscriptionDbService: SubscriptionDbService) { }
  public getData([item, subsId]: [string, string]) {
    return this.subscriptionDbService.findByFilterV4([[], ['(SUBSCRIPTION_GUID=' + subsId + ')'], null, null, null, ['tenant_customer_by_CUSTOMER_GUID'], null]);
    // return of(item + ' - ' + subsId);
  }

  public inputData([item, data]: [string, string[]]) {
    let inputObj;
    if (item == 'customer_info') { inputObj = this.assignCustomerInfo([inputObj, data]); }
    if (item == 'company_info') { inputObj = this.assignCompanyInfo([inputObj, data]); }
    if (item == 'customer_history') { inputObj = this.assignCustomerHistory([inputObj, data]); }
    if (item == 'next_billing_date') { inputObj = this.assignNextBillingDate([inputObj, data]); }
    if (item == 'usage') { inputObj = this.assignUsage([inputObj, data]); }

    return inputObj;
  }

  public assignCustomerInfo([inputObj, data]: [CustomerInfoDTO, any]) {
    inputObj = new CustomerInfoDTO;
    let customerData = data[0].tenant_customer_by_CUSTOMER_GUID[0];

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

    return inputObj;
  }

  public assignSubscriptionInfo([inputObj, data]) {
    inputObj.subscription_id = data[0].SUBSCRIPTION_GUID;
    inputObj.subscription_plan = data[0].PLAN
    inputObj.subscription_status = data[0].STATUS;
    inputObj.subscription_quota = data[0].QUOTA;
    inputObj.subscription_used_quota = data[0].USED_QUOTA;
    inputObj.creation_date = data[0].CREATION_TS;
    inputObj.activation_date = data[0].ACTIVATION_DATE;
    inputObj.last_billing_date = data[0].LAST_BILLING_DATE;
    inputObj.next_billing_date = data[0].NEXT_BILLING_DATE;
    inputObj.recurr_interval = data[0].RECURR_INTERVAL;
    inputObj.recurr_interval_val = data[0].RECURR_INTERVAL_VAL;
    inputObj.billing_cycle = data[0].BILLING_CYCLE;
  }

  public assignCompanyInfo([inputObj, data]: [CompanyInfoDTO, any]) {
    inputObj = new CompanyInfoDTO;

    inputObj.subs_id = data[0].SUBSCRIPTION_GUID;
    inputObj.company_name = '';
    inputObj.company_address1 = '';
    inputObj.company_address2 = '';
    inputObj.company_address3 = '';
    inputObj.employee_no = '';

    return inputObj;
  }
  public assignCustomerHistory([inputObj, data]: [CustomerHistoryDTO, any]) {
    inputObj = new CustomerHistoryDTO;

    inputObj.history_id = '';
    inputObj.message = '';
    inputObj.update_time = '';
    inputObj.update_by = '';

    return inputObj;
  }
  public assignNextBillingDate([inputObj, data]: [NextBillingDateDTO, any]) {
    inputObj = new NextBillingDateDTO;
    inputObj.next_billing_date = data[0].NEXT_BILLING_DATE;
    return inputObj;
  }
  public assignUsage([inputObj, data]: [UsageDTO, any]) {
    inputObj = new UsageDTO;

    inputObj.subscription_quota = data[0].QUOTA;
    inputObj.subscription_used_quota = data[0].USED_QUOTA;

    return inputObj;
  }

}