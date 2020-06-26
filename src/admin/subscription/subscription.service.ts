import { Injectable } from "@nestjs/common";
import { SubscriptionDbService, UsereLeaveDbService, CustomerDbService, UserInfoDbService } from '../../common/db/table.db.service';
import { CreateSubscriptionDTO } from './dto/create-subscription.dto';
import { UserMainModel } from '../../common/model/user-main.model';
import { SubscriptionModel } from '../../common/model/subscription.model';
import { Resource } from "../../common/model/resource.model";
import { v1 } from "uuid";
import { UpdateSubscriptionDTO } from './dto/update-subscription.dto';
import { setUpdateData } from "../../common/helper/basic-function";
import { map, mergeMap } from "rxjs/operators";
import { EmailNodemailerService } from '../../common/helper/email-nodemailer.service';
import { hostURLSubscription } from "../../constant/commonUsed";
import moment = require('moment');
require('dotenv').config();
/**
 * Declare cryptojs library
 */
var CryptoJS = require("crypto-js");
/**
 * Service subscription
 *
 * @export
 * @class SubscriptionService
 */
@Injectable()
export class SubscriptionService {
  /**
   *Creates an instance of SubscriptionService.
   * @param {SubscriptionDbService} subscriptionDbService DB service for subscription
   * @memberof SubscriptionService
   */
  constructor(
    public subscriptionDbService: SubscriptionDbService,
    public usereLeaveDbService: UsereLeaveDbService,
    public customerDbService: CustomerDbService,
    public emailNodemailerService: EmailNodemailerService,
    public userInfoDbService: UserInfoDbService
  ) { }

  /**
   * Create subscription
   *
   * @param {[CreateSubscriptionDTO, UserMainModel]} [subscriptionData, req]
   * @returns
   * @memberof SubscriptionService
   */
  public createSubscription([subscriptionData, req]: [CreateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel();

    data.SUBSCRIPTION_GUID = v1();
    data.SUBSCRIPTION_LABEL = subscriptionData.subscriptionLabel;
    this.inputDataSubscription([data, subscriptionData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.createByModel([resource, [], [], []]);
  }

  public createSubscriptionWoocommerce([data]: [CreateSubscriptionDTO]) {
    let lineItems = [{
      // name: "FOC Ala carte",
      // sku: "",
      product_id: 267,
      // variation_id: 0,
      quantity: data.subscriptionQuota,
      // tax_class: "",
      // price: "0.00",
      // subtotal: "0.00",
      // subtotal_tax: "0.00",
      // total: "0.00",
      // total_tax: "0.00",
      // taxes: [],
      // meta: []
    }];
    const dataPost = {
      status: 'on-hold',
      line_items: lineItems
    };

    let subscriptionId = 268;

    let method = hostURLSubscription + `/subscription/${subscriptionId}`;
    this.subscriptionDbService.httpService.patch(method, dataPost)
      .subscribe(
        data => {
          // console.log(data.data);
        }, err => {
          // console.log(err);
        })

    // let method = hostURLSubscription+'/subscription';
    // this.subscriptionDbService.httpService.post(method, dataPost)
    //   .subscribe(
    //     data => {
    //       console.log(data.data);
    //     }, err => {
    //       console.log(err);
    //     })
  }

  public createUsereLeave([data, dataResSubs]: [CreateSubscriptionDTO, any]) {
    let resource = new Resource(new Array);
    let dataTemp = {};
    let password;
    let fullname;
    let username;
    let userId;
    this.customerDbService.findByFilterV4([[], [`(CUSTOMER_GUID=${data.customerGuid})`], null, null, null, [], null]).pipe(
      map(res => {
        // console.log(res);
        return res;
      }), mergeMap(res => {
        // console.log(res);
        var randPassword = Array(12).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');

        dataTemp['USER_GUID'] = v1();
        dataTemp['TENANT_GUID'] = dataResSubs[0].SUBSCRIPTION_GUID;
        dataTemp['LOGIN_ID'] = res[0].EMAIL;
        dataTemp['PASSWORD'] = randPassword;
        dataTemp['EMAIL'] = res[0].EMAIL;
        dataTemp['ACTIVATION_FLAG'] = 1;
        dataTemp['CREATION_USER_GUID'] = dataTemp['USER_GUID'];

        //setup for email
        password = dataTemp['PASSWORD'];
        fullname = res[0].FULLNAME;
        username = res[0].EMAIL;

        // store encrypted password
        dataTemp['PASSWORD'] = CryptoJS.SHA256(dataTemp['PASSWORD'].trim()).toString(CryptoJS.enc.Hex);
        console.log(dataTemp['PASSWORD']);
        dataTemp['PASSWORD'] = CryptoJS.AES.encrypt(dataTemp['PASSWORD'], 'secret key 122').toString();
        console.log(dataTemp['PASSWORD']);

        resource.resource.push(dataTemp);
        console.log(resource);

        userId = dataTemp['USER_GUID'];

        return this.usereLeaveDbService.createByModel([resource, [], [], []]);
      })).subscribe(
        data => {
          this.createUserInfo([userId]);
          console.log(password);
          this.emailNodemailerService.mailProcessUserCreated([password, username, fullname, username]);
        },
        err => { console.log(err); }
      )

    return 'success';
  }

  public createUserInfo([userId]: [string]) {
    console.log('did u here?');
    let resource = new Resource(new Array());
    let data = {};
    data['USER_INFO_GUID'] = v1();
    data['USER_GUID'] = userId;
    data['JOIN_DATE'] = moment().format('YYYY-MM-DD');
    data['CREATION_USER_GUID'] = userId;
    resource.resource.push(data);
    this.userInfoDbService.createByModel([resource, [], [], []]).subscribe(
      data => { console.log(data.data.resource); },
      err => { console.log(err); }
    );
  }

  public createDefaultProfile([data, dataResSubs]: [CreateSubscriptionDTO, any]) {
    let url = process.env.URL_APPCORE + '/api/default-profile/' + dataResSubs[0].SUBSCRIPTION_GUID; // + data.customerGuid;
    this.customerDbService.httpService.post(url).subscribe(
      data => { console.log(data); },
      err => { console.log(err); }
    );
  }

  public assignDefaultToFirstUser([userIdEleave, tenantId]) {
    return 'Assign default';
  }

  /**
   * Get subscription
   *
   * @returns
   * @memberof SubscriptionService
   */
  public getSubscription() {
    return this.subscriptionDbService.findByFilterV4([[], [], null, null, null, [], null]);
  }

  /**
   * Update subscription
   *
   * @param {[UpdateSubscriptionDTO, UserMainModel]} [editSubscriptionData, req]
   * @returns
   * @memberof SubscriptionService
   */
  public updateSubscription([editSubscriptionData, req]: [UpdateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel

    data.SUBSCRIPTION_GUID = editSubscriptionData.subscriptionGuid;
    data.REMARKS = editSubscriptionData.remarks;
    this.inputDataSubscription([data, editSubscriptionData]);
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.updateByModel([resource, [], [], []]);
  }

  /**
   * Input data subscription to create and update
   *
   * @param {([SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO])} [model, data]
   * @returns
   * @memberof SubscriptionService
   */
  public inputDataSubscription([model, data]: [SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO]) {

    model.CUSTOMER_GUID = data.customerGuid;
    model.PLAN = data.subscriptionPlan;
    model.STATUS = data.subscriptionStatus;
    model.QUOTA = data.subscriptionQuota;
    model.ACTIVATION_DATE = data.activationDate;
    model.LAST_BILLING_DATE = data.lastBillingDate;
    model.NEXT_BILLING_DATE = data.nextBillingDate;
    model.RECURR_INTERVAL = data.recurrInterval;
    model.RECURR_INTERVAL_VAL = data.recurrIntervalVal;
    model.BILLING_CYCLE = data.billingCycle;

    return model;
  }

}