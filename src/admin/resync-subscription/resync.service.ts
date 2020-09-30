import { Injectable, HttpService } from '@nestjs/common';
import { of } from "rxjs";
import { map, mergeMap } from 'rxjs/operators';
import { runServiceCallback } from '../../common/helper/basic-function';
import { CustomerDbService, SubscriptionDbService } from '../../common/db/table.db.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionModel } from '../../common/model/subscription.model';
import { CreateSubscriptionDTO } from '../subscription/dto/create-subscription.dto';
import { v1 } from 'uuid';
import { Resource } from '../../common/model/resource.model';

@Injectable()
export class ResyncSubscriptionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly subscriptionDbService: SubscriptionDbService,
    private readonly customerDbService: CustomerDbService
  ) { }
  public async resyncSubscription([customer_id]: [number]) {
    let customerData = await runServiceCallback(this.customerDbService.findByFilterV4([[], [`(COMMERCE_ID=${customer_id})`], null, null, null, [], null])) as any[];
    // console.log(customerData);
    let subscriptionData = await runServiceCallback(this.subscriptionDbService.findByFilterV4([[], [`(CUSTOMER_GUID=${customerData[0].CUSTOMER_GUID})`], null, null, null, [], null])) as any[];
    // console.log(subscriptionData);
    let commerceData = await runServiceCallback(this.httpService.get('https://commercecore.beesuite.app/subscription/customer/' + customer_id));
    // console.log(commerceData['data']);
    commerceData['data'].forEach(x => {
      let subscriptionId = x.id;
      // let statusSubscription = x.status;
      // let customerId = x.customer_id
      let existData = subscriptionData.find(y => parseInt(y.COMMERCE_ID) === subscriptionId);
      // console.log(existData);
      // console.log(subscriptionId + '-' + statusSubscription + '-' + customerId);
      // let customerStatus = customerData.filter(y => y.COMMERCE_ID === x.customer_id);
      // let customerStatus2 = customerData.find(y => y.COMMERCE_ID === x.customer_id);
      if (existData == undefined) {
        // console.log('___________________');
        this.addSubscription([x, customerData[0].CUSTOMER_GUID]).subscribe(
          data => { console.log(data); },
          err => { console.log(err.response.data.error.context.resource); }
        );
      }
      // console.log(customerStatus);
      // console.log(customerStatus2);

    });
    return of(commerceData['data']);
    // return this.subscriptionDbService.findByFilterV4([[], [], null, null, null, [], null]).pipe(
    //   mergeMap(res => {
    //     console.log(res);
    //     return this.httpService.get('https://commercecore.beesuite.app/subscription');
    //   }), map(res => {
    //     // console.log(res.data);
    //     console.log(res.data.length);
    //     res.data.forEach(element => {
    //       console.log('sub' + element.id);
    //       console.log('cus' + element.customer_id);
    //     });
    //     return res.data;
    //   })
    // )
    // return this.httpService.get('https://commercecore.beesuite.app/subscription').pipe(
    //   map(res => {
    //     console.log(res.data);
    //     console.log(res.data.length);
    //     res.data.forEach(element => {
    //       console.log('sub' + element.id);
    //       console.log('cus' + element.customer_id);
    //     });
    //     return res.data;
    //   })
    // );

  }

  public addSubscription([dataSubs, customerGuid]: [any, string]) {
    // console.log(dataSubs);
    let model = new SubscriptionModel();
    let data = new CreateSubscriptionDTO;
    data.customerGuid = customerGuid;
    data.subscriptionPlan = 'standard';
    data.subscriptionStatus = dataSubs.status == 'active' ? 1 : 0;
    data.subscriptionQuota = dataSubs.line_items[0].quantity;
    data.activationDate = dataSubs.date_created;
    data.lastBillingDate = dataSubs.date_paid_gmt;
    data.nextBillingDate = dataSubs.next_payment_date;
    data.recurrInterval = dataSubs.billing_period;
    data.recurrIntervalVal = dataSubs.billing_interval;
    data.billingCycle;

    model.SUBSCRIPTION_GUID = v1();
    model.SUBSCRIPTION_LABEL = `SUB-${dataSubs.id}`;
    model.COMMERCE_ID = dataSubs.id;
    this.inputDataSubscription([model, data]);

    const resource = new Resource(new Array);
    resource.resource.push(model);
    // console.log(resource);

    return this.subscriptionDbService.createByModel([resource, [], [], []]);
    // return of('send');
  }

  public inputDataSubscription([model, data]: [SubscriptionModel, CreateSubscriptionDTO]) {

    model.CUSTOMER_GUID = data.customerGuid;
    model.PLAN = data.subscriptionPlan;
    model.STATUS = data.subscriptionStatus;
    model.QUOTA = data.subscriptionQuota;
    model.ACTIVATION_DATE = data.activationDate;
    model.LAST_BILLING_DATE = data.lastBillingDate;
    model.NEXT_BILLING_DATE = data.nextBillingDate;
    model.RECURR_INTERVAL = data.recurrInterval;
    model.RECURR_INTERVAL_VAL = data.recurrIntervalVal;
    // model.BILLING_CYCLE = data.billingCycle;
    // model.REMARKS = 
    model.LOGIN_TYPE = 'local';

    return model;
  }
}