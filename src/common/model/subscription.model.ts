/**
 * Subscription model
 *
 * @export
 * @class SubscriptionModel
 */
export class SubscriptionModel {
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
   * Subscription used quota
   *
   * @type {number}
   * @memberof SubscriptionModel
   */
  USED_QUOTA: number;
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
   * Creation timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  CREATION_TS: string;
  /**
   * Creation user guid
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  CREATION_USER_GUID: string;
  /**
   * Update timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  UPDATE_TS: string;
  /**
   * Update user guid
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  UPDATE_USER_GUID: string;
  /**
   * Deleted timestamp
   *
   * @type {string}
   * @memberof SubscriptionModel
   */
  DELETED_AT: string;
}