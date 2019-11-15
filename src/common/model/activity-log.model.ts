import { CreateUpdateModel } from "./create-update.model";

/**
 * Activity Log Model
 *
 * @export
 * @class ActivityLogModel
 */
export class ActivityLogModel extends CreateUpdateModel {
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
}