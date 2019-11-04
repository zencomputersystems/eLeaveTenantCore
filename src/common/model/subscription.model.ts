export class SubscriptionModel {
  SUBSCRIPTION_GUID: string;
  CUSTOMER_GUID: string;
  PLAN: string;
  STATUS: number;
  QUOTA: number;
  USED_QUOTA: number;
  ACTIVATION_DATE: string;
  LAST_BILLING_DATE: string;
  NEXT_BILLING_DATE: string;
  RECURR_INTERVAL: string;
  RECURR_INTERVAL_VAL: number;
  BILLING_CYCLE: number;
  CREATION_TS: string;
  CREATION_USER_GUID: string;
  UPDATE_TS: string;
  UPDATE_USER_GUID: string;
  DELETED_AT: string;
}