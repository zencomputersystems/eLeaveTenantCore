export class CustomerInfoDTO {
  customer_name: string;
  customer_email: string;
  customer_contact_no: string;
  customer_company_name: string;
  customer_address1: string;
  customer_address2: string;
  customer_zip: string;
  customer_city: string;
  customer_state: string;
  customer_country: string;
  customer_currency: string;
  salesperson_pic: string;
  subscription_id: string;
  subscription_plan: string;
  subscription_status: number;
  subscription_quota: number;
  subscription_used_quota: number;
  creation_date: string;
  activation_date: string;
  last_billing_date: string;
  next_billing_date: string;
  recurr_interval: string;
  recurr_interval_val: number;
  billing_cycle: number;
}

export class CompanyInfoDTO {
  subs_id: string;
  company_name: string;
  company_address1: string;
  company_address2: string;
  company_address3: string;
  employee_no: string;
}

export class CustomerHistoryDTO {
  history_id: string;
  message: string;
  update_time: string;
  update_by: string;
}

export class NextBillingDateDTO {
  next_billing_date: string;
}

export class UsageDTO {
  subscription_quota: number;
  subscription_used_quota: number;
}