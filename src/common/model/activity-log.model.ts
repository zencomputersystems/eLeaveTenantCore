/**
 * Activity Log Model
 *
 * @export
 * @class ActivityLogModel
 */
export class ActivityLogModel {
  /**
   * Log guid
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  LOG_GUID: string;
  /**
   * Customer guid
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  CUSTOMER_GUID: string;
  /**
   * Subscription guid
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  SUBSCRIPTION_GUID: string;
  /**
   * Message
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  MESSAGE: string;
  /**
   * Creation user guid
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  CREATION_USER_GUID: string;
  /**
   * Creation timestamp
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  CREATION_TS: string;
  /**
   * Update user guid
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  UPDATE_USER_GUID: string;
  /**
   * Update timestamp
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  UPDATE_TS: string;
  /**
   * Deleted timestamp
   *
   * @type {string}
   * @memberof ActivityLogModel
   */
  DELETED_AT: string;
}