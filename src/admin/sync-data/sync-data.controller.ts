import { Controller, Post, Res, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation } from "@nestjs/swagger";
import { Resource } from "../../common/model/resource.model";
import { CustomerModel } from '../../common/model/customer.model';
import { v1 } from "uuid";
import { CustomerDbService } from "../../common/db/table.db.service";
import { map, mergeMap } from "rxjs/operators";
import { forkJoin, of } from 'rxjs';
import { SyncDataService } from "./sync-data.service";

@Controller('api/admin/sync-data')
export class SyncDataController {
  constructor(public syncdataService: SyncDataService) { }

  @Get('test')
  @ApiOperation({ title: 'test' })
  test(@Res() res) {
    console.log('Hello')
    res.send(`Yes i'm here`);
  }

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
  testSyncSubscription(@Res() res) {
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

  public setupCustomerData([dataWc, resource]: [any, any]) {
    console.log(dataWc);
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

}