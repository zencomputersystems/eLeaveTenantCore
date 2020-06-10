import { Injectable } from "@nestjs/common";
import { UserMainModel } from '../../common/model/user-main.model';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerDbService } from '../../common/db/table.db.service';
import { CustomerModel } from '../../common/model/customer.model';
import { v1 } from "uuid";
import { Resource } from "../../common/model/resource.model";
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { setUpdateData } from "../../common/helper/basic-function";
import { hostURLSubscription } from "../../constant/commonUsed";

/**
 * Service for customer
 *
 * @export
 * @class CustomerService
 */
@Injectable()
export class CustomerService {
  /**
   *Creates an instance of CustomerService.
   * @param {CustomerDbService} customerDbService DB service for customer
   * @memberof CustomerService
   */
  constructor(public customerDbService: CustomerDbService) { }

  /**
   * Create customer
   *
   * @param {[CreateCustomerDTO, UserMainModel]} [customerData, req]
   * @returns
   * @memberof CustomerService
   */
  public createCustomer([customerData, req]: [CreateCustomerDTO, UserMainModel]) {
    const data = new CustomerModel();

    data.CUSTOMER_GUID = v1();
    this.inputData([data, customerData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.customerDbService.createByModel([resource, [], [], []]);
  }

  public createCustomerWoocommerce([data]: [CreateCustomerDTO]) {
    let method = hostURLSubscription + '/customers';
    let data1 = `{
      "email": "${data.email}",
      "first_name": "${data.fullname}",
      "last_name": "maybe",
      "username": "data.email",
      "billing": {
        "first_name": "${data.fullname}",
        "last_name": "maybe",
        "company": "${data.companyName}",
        "address_1": "${data.address1}",
        "address_2": "${data.address2}",
        "city": "${data.city}",
        "state": "${data.state}",
        "postcode": "${data.postcode}",
        "country": "${data.country}",
        "email": "${data.email}",
        "phone": "${data.contactNo}"
      },
      "shipping": {
        "first_name": "${data.fullname}",
        "last_name": "maybe",
        "company": "${data.companyName}",
        "address_1": "${data.address1}",
        "address_2": "${data.address2}",
        "city": "${data.city}",
        "state": "${data.state}",
        "postcode": "${data.postcode}",
        "country": "${data.country}"
      }
    }`;

    data1 = `{
      "email": "${data.email}",
      "first_name": "${data.fullname}",
      "last_name": "Doe",
      "username": "kohn.doe",
      "billing": {
        "first_name": "${data.fullname}",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US",
        "email": "${data.email}",
        "phone": "(555) 555-5555"
      },
      "shipping": {
        "first_name": "${data.fullname}",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US"
      }
    }`;
    console.log(data1);
    this.customerDbService.httpService.post(method, data1)
      .subscribe(
        data => {
          console.log(data.data);
          // res.send(data.data);
        }, err => {
          console.log(err);
          // res.send(err);
        })
  }

  /**
   * Get customer
   *
   * @returns
   * @memberof CustomerService
   */
  public getCustomer() {
    return this.customerDbService.findByFilterV4([[], [], null, null, null, [], null]);
  }

  /**
   * Update customer
   *
   * @param {[UpdateCustomerDTO, UserMainModel]} [editCustomerData, req]
   * @returns
   * @memberof CustomerService
   */
  public updateCustomer([editCustomerData, req]: [UpdateCustomerDTO, UserMainModel]) {
    const data = new CustomerModel();

    data.CUSTOMER_GUID = editCustomerData.customerGuid;
    this.inputData([data, editCustomerData]);
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.customerDbService.updateByModel([resource, [], [], []]);
  }

  /**
   * Input data create and update customer
   *
   * @param {([CustomerModel, UpdateCustomerDTO | CreateCustomerDTO])} [model, data]
   * @returns
   * @memberof CustomerService
   */
  public inputData([model, data]: [CustomerModel, UpdateCustomerDTO | CreateCustomerDTO]) {
    model.CUSTOMER_LABEL = data.customerLabel;
    model.FULLNAME = data.fullname;
    model.NICKNAME = data.nickname;
    model.EMAIL = data.email;
    model.CONTACT_NO = data.contactNo;
    model.COMPANY_NAME = data.companyName;
    model.ADDRESS1 = data.address1;
    model.ADDRESS2 = data.address2;
    model.POSTCODE = data.postcode;
    model.CITY = data.city;
    model.STATE = data.state;
    model.COUNTRY = data.country;
    model.CURRENCY = data.currency;
    model.SALESPERSON = data.salesperson;

    return model;
  }

}