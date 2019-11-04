import { Injectable } from "@nestjs/common";
import { SubscriptionDbService } from '../../common/db/table.db.service';
import { CreateSubscriptionDTO } from './dto/create-subscription.dto';
import { UserMainModel } from '../../common/model/user-main.model';
import { SubscriptionModel } from '../../common/model/subscription.model';
import { Resource } from "../../common/model/resource.model";
import { v1 } from "uuid";
import { UpdateSubscriptionDTO } from './dto/update-subscription.dto';
import { setUpdateData } from "../../common/helper/basic-function";

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionDbService: SubscriptionDbService) { }

  public createSubscription([subscriptionData, req]: [CreateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel();

    data.SUBSCRIPTION_GUID = v1();
    this.inputDataSubscription([data, subscriptionData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.createByModel([resource, [], [], []]);
  }

  public getSubscription() {
    return this.subscriptionDbService.findByFilterV4([[], [], null, null, null]);
  }

  public updateSubscription([editSubscriptionData, req]: [UpdateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel

    data.SUBSCRIPTION_GUID = editSubscriptionData.subscriptionGuid;
    this.inputDataSubscription([data, editSubscriptionData]);
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.updateByModel([resource, [], [], []]);
  }

  public inputDataSubscription([model, data]: [SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO]) {

    model.CUSTOMER_GUID = data.customerGuid;
    model.PLAN = data.subscriptionPlan;
    model.STATUS = data.subscriptionStatus;
    model.QUOTA = data.subscriptionQuota;
    model.USED_QUOTA = data.usedQuota;
    model.ACTIVATION_DATE = data.activationDate;
    model.LAST_BILLING_DATE = data.lastBillingDate;
    model.NEXT_BILLING_DATE = data.nextBillingDate;
    model.RECURR_INTERVAL = data.recurrInterval;
    model.RECURR_INTERVAL_VAL = data.recurrIntervalVal;
    model.BILLING_CYCLE = data.billingCycle;

    return model;
  }

}