import { Injectable } from "@nestjs/common";
import { CustomerDbService, SubscriptionDbService, UsereLeaveDbService, UserInfoDbService } from '../../common/db/table.db.service';
import { mergeMap, map } from "rxjs/operators";
import { forkJoin, of } from "rxjs";
import { Resource } from "../../common/model/resource.model";
import { CustomerModel } from "../../common/model/customer.model";
import { v1 } from "uuid";
import { SubscriptionModel } from '../../common/model/subscription.model';
import moment = require("moment");
import { EmailNodemailerService } from "../../common/helper/email-nodemailer.service";
require('dotenv').config();
/** XMLparser from zen library  */
var { convertJsonToXML } = require('@zencloudservices/xmlparser');
/**
 * Declare cryptojs library
 */
var CryptoJS = require("crypto-js");

@Injectable()
export class SyncDataService {
  constructor(
    public customerDbService: CustomerDbService,
    public subscriptionDbService: SubscriptionDbService,
    public usereLeaveDbService: UsereLeaveDbService, //main
    public userInfoDbService: UserInfoDbService, //info
    public emailNodemailerService: EmailNodemailerService
  ) { }
  public processSync() {
    let wcData;
    let customerRes = [];
    let subscriptionRes = [];
    const urlSubscription = `https://beesuite.app:3003/subscription`;
    return this.customerDbService.findByFilterV4([[], [], null, null, null, [], null]).pipe(
      mergeMap(res => {
        let wcData = this.customerDbService.httpService.get(urlSubscription).pipe(map(res => { return res.data; }))

        return forkJoin(of(res), wcData);

      }),
      mergeMap(res => {

        let dbData = res[0];
        wcData = res[1];

        const dbEmail = [...new Set(dbData.map(x => x.EMAIL))];
        const wcEmail = [...new Set(wcData.map(x => x.billing.email))] as any[];

        let difference = wcEmail.filter(x => !dbEmail.includes(x));

        if (difference.length > 0) {
          let resource = new Resource(new Array());
          difference.forEach(email => {
            let dataToStore = wcData.find(x => x.billing.email === email);
            this.setupCustomerData([dataToStore.billing, resource]);
          })

          return this.customerDbService.createByModel([resource, ['CUSTOMER_GUID', 'EMAIL', 'FULLNAME'], [], []]).pipe(
            map(res => {
              customerRes = res.data.resource;
              return res.data.resource;
            })
          );
        } else {
          return of([]);
        }

      }), mergeMap(res => {
        if (res.length > 0) {
          let resource = new Resource(new Array());
          res.forEach(element => {
            let dataSubscription = wcData.filter(x => x.billing.email === element.EMAIL);
            this.setupSubscriptionData([dataSubscription, element.CUSTOMER_GUID, resource])
          });
          // console.log(resource);
          return this.subscriptionDbService.createByModel([resource, ['SUBSCRIPTION_GUID', 'CUSTOMER_GUID'], [], []]).pipe(
            map(res => {
              subscriptionRes = res.data.resource;
              return res.data.resource;
            })
          );
        } else {
          return of(res);
        }
      }), map(res => {
        // console.log(res);
        this.createFirstUser([customerRes, subscriptionRes]);
        return res;
      })
    )

  }

  public setupCustomerData([dataWc, resource]: [any, any]) {
    // console.log(dataWc);
    let data = new CustomerModel;
    data.CUSTOMER_GUID = v1();
    data.EMAIL = dataWc.email;
    data.FULLNAME = dataWc.first_name + ' ' + dataWc.last_name;
    data.COMPANY_NAME = dataWc.company;
    data.ADDRESS1 = dataWc.address_1;
    data.ADDRESS2 = dataWc.address_2;
    data.CITY = dataWc.city;
    data.STATE = dataWc.state;
    data.POSTCODE = dataWc.postcode;
    data.COUNTRY = dataWc.country;
    data.CONTACT_NO = dataWc.phone;

    resource.resource.push(data);
    return resource;
  }

  public setupSubscriptionData([dataWc, customerGuid, resource]: [any, string, any]) {
    if (dataWc.length > 0) {
      dataWc.forEach(element => {
        let data = new SubscriptionModel;
        data.SUBSCRIPTION_GUID = v1();
        data.SUBSCRIPTION_LABEL = 'SUB-' + element.id;
        data.COMMERCE_ID = element.id;
        data.CUSTOMER_GUID = customerGuid;
        data.STATUS = 1;
        data.QUOTA = element.line_items[0].quantity;
        resource.resource.push(data);
      });
      return resource;

    }
  }

  public createFirstUser([customerRes, subscriptionRes]) {

    // console.log(customerRes);
    // console.log(subscriptionRes);



    customerRes.forEach(element => {

      let resMain = new Resource(new Array());
      let resInfo = new Resource(new Array());

      const subsInfo = subscriptionRes.find(x => x.CUSTOMER_GUID === element.CUSTOMER_GUID);
      let dataMain = {};
      let dataInfo = {};

      var randPassword = Array(12).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');

      dataMain['USER_GUID'] = v1();
      dataMain['TENANT_GUID'] = element.CUSTOMER_GUID;
      dataMain['LOGIN_ID'] = element.EMAIL;
      dataMain['PASSWORD'] = randPassword;
      dataMain['EMAIL'] = element.EMAIL;
      dataMain['ACTIVATION_FLAG'] = 1;
      dataMain['CREATION_USER_GUID'] = dataMain['USER_GUID'];

      //setup for email
      let password = dataMain['PASSWORD'];
      let fullname = element.FULLNAME;
      let username = element.EMAIL;
      let tenantId = element.CUSTOMER_GUID;
      let userId = dataMain['USER_GUID'];

      // store encrypted password
      dataMain['PASSWORD'] = CryptoJS.SHA256(dataMain['PASSWORD'].trim()).toString(CryptoJS.enc.Hex);
      // console.log(dataMain['PASSWORD']);
      dataMain['PASSWORD'] = CryptoJS.AES.encrypt(dataMain['PASSWORD'], 'secret key 122').toString();
      // console.log(dataMain['PASSWORD']);

      resMain.resource.push(dataMain);
      // console.log(resMain);

      dataInfo['USER_INFO_GUID'] = v1();
      dataInfo['USER_GUID'] = dataMain['USER_GUID'];
      dataInfo['FULLNAME'] = fullname;
      dataInfo['TENANT_GUID'] = element.CUSTOMER_GUID;
      dataInfo['SUBSCRIPTION_GUID'] = subsInfo.SUBSCRIPTION_GUID;
      dataInfo['JOIN_DATE'] = moment().format('YYYY-MM-DD');
      dataInfo['CREATION_USER_GUID'] = dataMain['USER_GUID'];

      let base = {};
      let root = {};
      let employmentDetail = {};
      let personalDetails = {};

      employmentDetail['dateOfJoin'] = dataInfo['JOIN_DATE'];

      personalDetails['fullname'] = dataInfo['FULLNAME'];
      personalDetails['nickname'] = dataInfo['FULLNAME'];
      personalDetails['gender'] = 'Male';
      personalDetails['maritalStatus'] = 'Single';

      personalDetails['education'] = {};
      personalDetails['education']['educationDetail'] = [];

      personalDetails['certification'] = [];
      personalDetails['emergencyContact'] = {};
      personalDetails['emergencyContact']['contacts'] = [];

      personalDetails['family'] = {};
      personalDetails['family']['child'] = [];
      personalDetails['family']['spouse'] = [];

      root['employmentDetail'] = employmentDetail;
      root['personalDetails'] = personalDetails;

      base['root'] = root;

      dataInfo['PROPERTIES_XML'] = convertJsonToXML(base);

      resInfo.resource.push(dataInfo);
      // console.log(resMain);
      // console.log(resInfo);

      let userCreateProcess = this.usereLeaveDbService.createByModel([resMain, [], [], []]).pipe(
        mergeMap(res => {
          return this.userInfoDbService.createByModel([resInfo, [], [], []]).pipe(map(res => { return res.data.resource; }));
        }), mergeMap(res => {
          let url = process.env.URL_APPCORE + '/api/default-profile/' + tenantId;
          // console.log(url);
          return this.customerDbService.httpService.post(url);
        }), mergeMap(res => {
          let url = process.env.URL_APPCORE + '/api/default-profile/' + tenantId + '/' + userId;
          // console.log(url);
          return this.customerDbService.httpService.post(url);
        })
      );

      userCreateProcess.subscribe(
        data => {
          this.emailNodemailerService.mailProcessUserCreated([password, username, fullname, username]);
          console.log('data');
        }, err => {
          console.log('err');
        }
      )

    });



  }



}