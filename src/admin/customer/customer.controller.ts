import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";
import { Response } from 'express';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { getResErr } from '../../common/helper/basic-function';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Resource } from '../../common/model/resource.model';
import { CustomerModel } from '../../common/model/customer.model';
import uuid = require('uuid');
import { hostURLSubscription } from '../../constant/commonUsed';

/**
 * Controller customer
 *
 * @export
 * @class CustomerController
 */
@Controller('api/admin/customer')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService,

  ) { }

  /**
   * Get customer list
   *
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Get()
  @ApiOperation({ title: 'Get all user', description: 'Get all user in local db. \nPermission : superadmin, salesperson, support' })
  findAllCustomer(@Res() res: Response) {

    this.customerService.getCustomer().subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No customer found', 'Failed to retrieve customer list'));
      }
    );

  }

  @Get('woocommerce')
  @ApiOperation({ title: 'Get woocommerce customer', description: 'Get customer from woocommerce' })
  findWoocommerceCustomer(@Res() res) {
    let method = hostURLSubscription + '/customers';
    this.customerService.customerDbService.httpService.get(method).pipe(
      mergeMap(res => {
        let customerData = this.customerService.customerDbService.findByFilterV4([[], [], null, null, null, [], null]);
        return forkJoin(of(res.data), customerData);
      }),
      map(res => {

        // 0-woo 1-tnt
        let arrWoo = []; // array customer woocommerce
        let arrTnt = []; // array customer tenant
        let notInWoo = []; // email not in woocommerce
        let notInTnt = []; // email not in tenant

        res[0].forEach(x => { arrWoo.push(x.email); });
        res[1].forEach(x => { arrTnt.push(x.EMAIL); });

        notInWoo = arrWoo.filter(function (el) { return arrTnt.indexOf(el) < 0; });
        notInTnt = arrTnt.filter(function (el) { return arrWoo.indexOf(el) < 0; });

        console.log(arrWoo);
        console.log(arrTnt);

        console.log(notInWoo);
        console.log(notInTnt);

        let dataToStoreInTnt = [];
        let dataToStoreInWoo = [];

        dataToStoreInTnt = res[0].filter(x => notInWoo.includes(x.email));
        // console.log(dataToStoreInTnt);

        dataToStoreInWoo = res[1].filter(x => notInTnt.includes(x.EMAIL));
        // console.log(dataToStoreInWoo);

        if (dataToStoreInTnt.length > 0) {
          let resource = new Resource(new Array);
          dataToStoreInTnt.forEach(element => {
            this.setupDataToStoreTenant([element, resource]);
          });

          if (resource.resource.length > 0) {
            // console.log(resource);
            this.customerService.customerDbService.createByModel([resource, [], [], []]).subscribe(
              data => { console.log('success'); },
              err => { console.log('error'); }
            );
          }
        }

        console.log(dataToStoreInWoo.length);
        if (dataToStoreInWoo.length > 0) {
          let createData = [];
          dataToStoreInWoo.forEach(element => {
            this.setupDataToStoreWoo([element, createData]);
          })
          // console.log(createData);
          let data = {};
          data['create'] = createData;
          // console.log(data);

          let method = hostURLSubscription + '/customers/batch';
          let result = this.customerService.customerDbService.httpService.post(method, data).subscribe(
            data => { console.log(data); },
            err => { console.log(err); }
          );
        }



        // let data2 = res[1];
        return res;
      })
    )
      .subscribe(
        data => {
          // console.log(data);
          // let dbData = data[0];

          // data[0].foreach(x => {

          // })
          // console.log(data[1]);

          res.send(data[1]);
        }, err => {
          // console.log(err);
          res.send(err);
        })
  }

  /**
   * Create customer
   *
   * @param {CreateCustomerDTO} customerData
   * @param {*} req
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Post()
  @ApiOperation({ title: 'Sign up new customer', description: 'Sign up new user in local db. \nPermission : superadmin, salesperson, support' })
  createCustomer(@Body() customerData: CreateCustomerDTO, @Req() req, @Res() res: Response) {

    // process create new customer
    this.customerService.createCustomer([customerData, req.user]).subscribe(
      data => {
        this.customerService.createCustomerWoocommerce([customerData]);
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    );

  }

  /**
   * Update customer
   *
   * @param {UpdateCustomerDTO} updateCustomerData
   * @param {*} req
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Patch()
  @ApiOperation({ title: 'Update user', description: 'Update a user in local db. \nPermission : superadmin, salesperson, support' })
  updateCustomer(@Body() updateCustomerData: UpdateCustomerDTO, @Req() req, @Res() res: Response) {

    this.customerService.updateCustomer([updateCustomerData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No customer found', 'Failed to update customer'));
      }
    );

  }

  private setupDataToStoreTenant([data, resource]: [any, Resource]) {

    console.log(resource);
    let model = new CustomerModel();

    var randNumber = Array(13).fill("0123456789").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');

    let custPersonal = data.billing;

    model.CUSTOMER_GUID = uuid();
    model.CUSTOMER_LABEL = 'CUS-' + randNumber;
    model.FULLNAME = data.first_name + ' ' + data.last_name;
    model.NICKNAME = data.first_name;
    model.EMAIL = data.email;
    model.CONTACT_NO = custPersonal.phone;
    model.COMPANY_NAME = custPersonal.company;
    model.ADDRESS1 = custPersonal.address_1;
    model.ADDRESS2 = custPersonal.address_2;
    model.POSTCODE = custPersonal.postcode;
    model.CITY = custPersonal.city;
    model.STATE = custPersonal.state;
    model.COUNTRY = custPersonal.country;
    // model.CURRENCY = '';
    // model.SALESPERSON = '';

    resource.resource.push(model);

    return resource;
  }

  private setupDataToStoreWoo([data, resArr]: [any, any[]]) {
    // console.log('im here');
    let tempObj = {};

    tempObj['email'] = data.EMAIL;
    tempObj['first_name'] = data.FULLNAME;
    tempObj['last_name'] = '';
    tempObj['username'] = data.EMAIL;
    // console.log('im here 2');
    let tempBilling = {};
    tempBilling['first_name'] = data.FULLNAME;
    tempBilling['last_name'] = '';
    tempBilling['company'] = data.COMPANY_NAME;
    tempBilling['address_1'] = data.ADDRESS1;
    tempBilling['address_2'] = data.ADDRESS2;
    tempBilling['city'] = data.CITY;
    tempBilling['state'] = data.STATE;
    tempBilling['postcode'] = data.POSTCODE;
    tempBilling['country'] = data.COUNTRY;
    tempBilling['email'] = data.EMAIL;
    tempBilling['phone'] = data.CONTACT_NO;
    tempObj['billing'] = tempBilling;

    let tempShipping = {};
    tempShipping['first_name'] = data.FULLNAME;
    tempShipping['last_name'] = '';
    tempShipping['company'] = data.COMPANY_NAME;
    tempShipping['address_1'] = data.ADDRESS1;
    tempShipping['address_2'] = data.ADDRESS2;
    tempShipping['city'] = data.CITY;
    tempShipping['state'] = data.STATE;
    tempShipping['postcode'] = data.POSTCODE;
    tempShipping['country'] = data.COUNTRY;
    tempObj['shipping'] = tempShipping;


    // console.log('im here 3');
    resArr.push(tempObj);

    // console.log(resArr);

    return resArr;
  }

}