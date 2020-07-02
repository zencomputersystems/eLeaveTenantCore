import { CreateUpdateModel } from "./create-update.model";

/**
 * Subscription model
 *
 * @export
 * @class SubscriptionModel
 */
export class SubscriptionModel extends CreateUpdateModel {
  /**
   * Subscription guid
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  SUBSCRIPTION_GUID: string;
  /**
   * Subscription label
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  SUBSCRIPTION_LABEL: string;
  /**
   * Commerce id
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  COMMERCE_ID: string;
  /**
   * Customer guid
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  CUSTOMER_GUID: string;
  /**
   * Subscription plan
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  PLAN: string;
  /**
   * Subscription status
   *
   * @type {number}
   * @memberof SubscriptionModel
   */
  STATUS: number;
  /**
   * Subscription quota
   *
   * @type {number}
   * @memberof SubscriptionModel
   */
  QUOTA: number;
  /**
   * Activation date timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  ACTIVATION_DATE: string;
  /**
   * Last billing date timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  LAST_BILLING_DATE: string;
  /**
   * Next billing date timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  NEXT_BILLING_DATE: string;
  /**
   * Recurr interval text : month/year/day
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  RECURR_INTERVAL: string;
  /**
   * Recurr interval value : 1/2/3
   *
   * @type {number}
   * @memberof SubscriptionModel
   */
  RECURR_INTERVAL_VAL: number;
  /**
   * Billing cycle
   *
   * @type {number}
   * @memberof SubscriptionModel
   */
  BILLING_CYCLE: number;
  /**
   * Remarks
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  REMARKS: string;
}