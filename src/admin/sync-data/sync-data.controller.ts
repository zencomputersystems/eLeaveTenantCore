import { Controller, Post, Res, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation } from "@nestjs/swagger";
import { Resource } from "../../common/model/resource.model";
import { CustomerModel } from '../../common/model/customer.model';
import { v1 } from "uuid";
import { CustomerDbService } from "../../common/db/table.db.service";
import { map, mergeMap } from "rxjs/operators";
import { forkJoin, of } from 'rxjs';
import { SyncDataService } from "./sync-data.service";
import { mockPayload } from './mock.data';
import { SubscriptionModel } from '../../common/model/subscription.model';
import { subsUpdated } from './mock.updated';

@Controller('api/admin/sync-data')
export class SyncDataController {
  constructor(public syncdataService: SyncDataService) { }

  // @Get('test')
  // @ApiOperation({ title: 'test' })
  // test(@Res() res) {
  //   console.log('Hello')
  //   res.send(`Yes i'm here`);
  // }

  @Post('testsync')
  @ApiOperation({ title: 'Test sync' })
  testSync(@Res() res) {
    const urlSubscription = `https://beesuite.app:3003/subscription`;
    this.syncdataService.processSync().subscribe(
      data => { res.send(data); },
      err => { res.send(err); }
    )

    // let resource = new Resource(new Array());
    // let data = new CustomerModel;
    // data.CUSTOMER_GUID = v1();
    // resource.resource.push(data);

    // this.customerDbService.createByModel([resource, [], [], []]).subscribe(
    //   data => { res.send(data.data.resource); },
    //   err => { res.send(err); }
    // );
  }

  @Post('testsyncsubscription')
  @ApiOperation({ title: 'Test sync' })
  testSyncSubscription(@Req() req, @Res() res) {
    // console.log(req);
    // console.log('_____________________________________________');
    // console.log(req.body);
    // console.log('_____________________________________________');
    // console.log(res);
    const urlSubscription = `https://beesuite.app:3003/subscription`;
    this.syncdataService.customerDbService.httpService.get(urlSubscription).subscribe(
      data => { res.status(HttpStatus.OK).send(data.data); },
      err => { res.send(err); }
    )

    // let resource = new Resource(new Array());
    // let data = new CustomerModel;
    // data.CUSTOMER_GUID = v1();
    // resource.resource.push(data);

    // this.customerDbService.createByModel([resource, [], [], []]).subscribe(
    //   data => { res.send(data.data.resource); },
    //   err => { res.send(err); }
    // );
  }

  @Post('sync-subscription-create')
  @ApiOperation({ title: 'Sync created subscription' })
  syncSubscriptionCreated(@Req() req, @Res() res) {
    // get payload data
    // console.log(mockPayload.customer_id);
    // res.send(mockPayload.customer_id);
    // console.log(res);
    let urlCommerce = process.env.URL_COMMERCECORE + '/customers' || 'https://commercecore.beesuite.app/customers';
    // const payloadData = mockPayload;
    const payloadData = req.body;
    const customerId = payloadData.customer_id;
    const urlSubscription = urlCommerce + `/${customerId}`;
    let customerRes = [];
    let subscriptionRes = [];
    // console.log(urlSubscription);
    this.syncdataService.customerDbService.httpService.get(urlSubscription).pipe(
      mergeMap(res => {
        // console.log(res.data);
        let resource = new Resource(new Array());
        this.setupCustomerData([res.data, resource]);
        // console.log(resource);
        return this.syncdataService.customerDbService.createByModel([resource, ['CUSTOMER_GUID', 'EMAIL', 'FULLNAME'], [], []])
          .pipe(
            map(res => {
              console.log(res.data.resource);
              customerRes = res.data.resource;
              return res.data.resource;
            })
          );
      }), mergeMap(res => {
        let resource = new Resource(new Array());
        this.setupSubscriptionData([payloadData, resource, res[0].CUSTOMER_GUID]);
        // console.log(resource);
        return this.syncdataService.subscriptionDbService.createByModel([resource, ['SUBSCRIPTION_GUID', 'CUSTOMER_GUID'], [], []]).pipe(
          map(res => {
            console.log(res.data.resource);
            subscriptionRes = res.data.resource;
            return res.data.resource;
          })
        );
      }), map(res => {
        // console.log(res);
        this.syncdataService.createFirstUser([customerRes, subscriptionRes, payloadData]);
        return res;
      })
    ).subscribe(
      data => {
        // console.log(data);
        res.status(HttpStatus.OK).send(data);
      },
      err => {
        res.send(err);
      }
    )

    // let resource = new Resource(new Array());
    // let data = new CustomerModel;
    // data.CUSTOMER_GUID = v1();
    // resource.resource.push(data);

    // this.customerDbService.createByModel([resource, [], [], []]).subscribe(
    //   data => { res.send(data.data.resource); },
    //   err => { res.send(err); }
    // );
  }


  @Post('sync-subscription-update')
  @ApiOperation({ title: 'Sync updateded subscription' })
  syncSubscriptionUpdated(@Req() req, @Res() res) {
    // const payloadData = subsUpdated;
    const payloadData = req.body;
    let resource = new Resource(new Array());
    this.setupSubscriptionData([payloadData, resource, null]);
    // console.log(resource);
    this.syncdataService.subscriptionDbService.updateByModel([resource, [], [`(COMMERCE_ID=${payloadData.id})`], []]).pipe(
      map(res => {
        return res.data.resource;
      })
    ).subscribe(
      data => {
        // console.log(data);
        res.status(HttpStatus.OK).send(data);
      },
      err => {
        res.send(err);
      }
    )
  }



  public setupCustomerData([dataWc, resource]: [any, any]) {
    // console.log('____________________________');
    // console.log(dataWc);
    // console.log(dataWc.email);
    let billingInfo = dataWc.billing;
    let data = new CustomerModel;
    data.CUSTOMER_GUID = v1();
    data.CUSTOMER_LABEL = `CUS-${dataWc.id}`;
    data.COMMERCE_ID = dataWc.id;
    data.EMAIL = dataWc.email;
    data.FULLNAME = dataWc.first_name + ' ' + dataWc.last_name;
    data.NICKNAME = dataWc.first_name;
    data.COMPANY_NAME = billingInfo.company;
    data.ADDRESS1 = billingInfo.address_1;
    data.ADDRESS2 = billingInfo.address_2;
    data.CITY = billingInfo.city;
    data.STATE = billingInfo.state;
    data.POSTCODE = billingInfo.postcode;
    data.COUNTRY = billingInfo.country;
    data.CONTACT_NO = billingInfo.phone;

    resource.resource.push(data);
    // console.log(resource);
    return resource;
  }

  public setupSubscriptionData([dataWcSubs, resource, customerGuid]: [any, any, string]) {
    let data = new SubscriptionModel;
    data.SUBSCRIPTION_GUID = v1();
    data.SUBSCRIPTION_LABEL = `SUB-${dataWcSubs.id}`;
    data.COMMERCE_ID = dataWcSubs.id;
    if (customerGuid != null)
      data.CUSTOMER_GUID = customerGuid;
    data.STATUS = dataWcSubs.status == 'active' ? 1 : 0;
    data.QUOTA = dataWcSubs.line_items[0].quantity;
    data.ACTIVATION_DATE = dataWcSubs.start_date;
    data.LAST_BILLING_DATE = dataWcSubs.date_paid_gmt;
    data.NEXT_BILLING_DATE = dataWcSubs.next_payment_date;
    data.RECURR_INTERVAL = dataWcSubs.billing_period;
    data.RECURR_INTERVAL_VAL = dataWcSubs.billing_interval;

    resource.resource.push(data);
    return resource;
  }

}