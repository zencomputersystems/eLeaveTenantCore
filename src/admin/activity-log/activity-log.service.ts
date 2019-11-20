import { Injectable } from "@nestjs/common";
import { CreateActivityLogDTO } from './dto/create-activity-log.dto';
import { UserMainModel } from '../../common/model/user-main.model';
import { ActivityLogModel } from '../../common/model/activity-log.model';
import { v1 } from 'uuid';
import { Resource } from "../../common/model/resource.model";
import { ActivityLogDbService } from '../../common/db/table.db.service';
import { UpdateActivityLogDTO } from './dto/update-activity-log.dto';
import { setUpdateData } from '../../common/helper/basic-function';

/**
 * Service for activity log
 *
 * @export
 * @class ActivityLogService
 */
@Injectable()
export class ActivityLogService {

  /**
   *Creates an instance of ActivityLogService.
   * @param {ActivityLogDbService} activityLogDbService DB service for activity log
   * @memberof ActivityLogService
   */
  constructor(private readonly activityLogDbService: ActivityLogDbService) { }

  /**
   * Create activity log
   *
   * @param {[CreateActivityLogDTO, UserMainModel]} [activityLogData, req]
   * @returns
   * @memberof ActivityLogService
   */
  public createActivityLog([activityLogData, req]: [CreateActivityLogDTO, UserMainModel]) {
    const data = new ActivityLogModel();

    data.LOG_GUID = v1();
    this.inputData([data, activityLogData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.activityLogDbService.createByModel([resource, [], [], []]);
  }

  /**
   * Update activity log
   *
   * @param {[UpdateActivityLogDTO, UserMainModel]} [editActivityLogData, req]
   * @returns
   * @memberof ActivityLogService
   */
  public updateActivityLog([editActivityLogData, req]: [UpdateActivityLogDTO, UserMainModel]) {
    const data = new ActivityLogModel();

    data.LOG_GUID = editActivityLogData.logId;
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.activityLogDbService.updateByModel([resource, [], [], []]);
  }

  /**
   * Get activity log
   *
   * @param {[string]} [subscriptionGuid]
   * @returns
   * @memberof ActivityLogService
   */
  public getActivityLog([subscriptionGuid]: [string]) {
    return this.activityLogDbService.findByFilterV4([[], ['(SUBSCRIPTION_GUID=' + subscriptionGuid + ')'], null, null, null, ['CREATOR_DATA', 'EDITOR_DATA'], null]);
  }

  /**
   * Input data create and update activity log
   *
   * @param {([ActivityLogModel, UpdateActivityLogDTO | CreateActivityLogDTO])} [model, data]
   * @returns
   * @memberof ActivityLogService
   */
  public inputData([model, data]: [ActivityLogModel, UpdateActivityLogDTO | CreateActivityLogDTO]) {
    model.CUSTOMER_GUID = data.customerId;
    model.SUBSCRIPTION_GUID = data.subscriptionId
    model.MESSAGE = data.message;

    return model;
  }

}