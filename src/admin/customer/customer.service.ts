import { Injectable } from "@nestjs/common";
import { UserMainModel } from '../../common/model/user-main.model';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerDbService } from '../../common/db/table.db.service';
import { CustomerModel } from '../../common/model/customer.model';
import { v1 } from "uuid";
import { Resource } from "../../common/model/resource.model";
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerDbService: CustomerDbService) { }
  public createCustomer([customerData, req]: [CreateCustomerDTO, UserMainModel]) {
    const data = new CustomerModel();

    data.CUSTOMER_GUID = v1();
    this.inputData([data, customerData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.customerDbService.createByModel([resource, [], [], []]);
  }

  public getCustomer() {
    return this.customerDbService.findByFilterV4([[], [], null, null, null]);
  }

  public updateCustomer([editCustomerData, req]: [UpdateCustomerDTO, UserMainModel]) {
    const data = new CustomerModel();

    data.CUSTOMER_GUID = editCustomerData.customerGuid;
    this.inputData([data, editCustomerData]);
    data.UPDATE_TS = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);
    data.UPDATE_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.customerDbService.updateByModel([resource, [], [], []]);
  }

  public inputData([model, data]: [CustomerModel, UpdateCustomerDTO | CreateCustomerDTO]) {
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