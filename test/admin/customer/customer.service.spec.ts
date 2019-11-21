
import { CustomerService } from '../../../src/admin/customer/customer.service';
import { Test } from '@nestjs/testing';
import { CreateCustomerDTO } from '../../../src/admin/customer/dto/create-customer.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateCustomerDTO } from '../../../src/admin/customer/dto/update-customer.dto';
import { CustomerDbService } from '../../../src/common/db/table.db.service';
import { Resource } from '../../../src/common/model/resource.model';
import { CustomerModel } from '../../../src/common/model/customer.model';

describe('CustomerService', () => {
  let Service: CustomerService;
  let DBService: CustomerDbService;
  let CreateData: CreateCustomerDTO;
  let UpdateData: UpdateCustomerDTO;
  let UserMainModelData: UserMainModel;
  let CustomerModelData: CustomerModel;

  beforeEach(
    async () => {

      const CustomerServiceStub = {
        createCustomer: ([customerData, req]: [CreateCustomerDTO, UserMainModel]) => ({
        }),

        getCustomer: () => ({
        }),

        updateCustomer: ([customerData, req]: [UpdateCustomerDTO, UserMainModel]) => ({
        }),

        inputData: ([model, data]: [CustomerModel, UpdateCustomerDTO | CreateCustomerDTO]) => ({

        })

      };

      const CustomerDBServiceStub = {
        findByFilterV4: ([fields, filters, order, limit, offset, relations, group]: [string[], string[], string, number, number, string[], string]) => ({
        }),

        createByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        }),

        updateByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        })

      }

      const CreateCustomerDTOStub = {
        fullname: {},
        nickname: {},
        email: {},
        contactNo: {},
        companyName: {},
        address1: {},
        address2: {},
        postcode: {},
        city: {},
        state: {},
        country: {},
        currency: {},
        salesperson: {}
      }

      const UpdateCustomerDTOStub = {
        customerGuid: {},
        fullname: {},
        nickname: {},
        email: {},
        contactNo: {},
        companyName: {},
        address1: {},
        address2: {},
        postcode: {},
        city: {},
        state: {},
        country: {},
        currency: {},
        salesperson: {}
      }

      const UserMainModelStub = {
        USER_GUID: {},
        LOGIN_ID: {},
        PASSWORD: {},
        EMAIL: {},
        FULLNAME: {},
        ROLE: {},
        ACTIVATION_FLAG: {},
        CREATION_USER_GUID: {},
        CREATION_TS: {},
        UPDATE_USER_GUID: {},
        UPDATE_TS: {},
        DELETED_AT: {}
      }

      const CustomerModelStub = {
        CUSTOMER_GUID: {},
        FULLNAME: {},
        NICKNAME: {},
        EMAIL: {},
        CONTACT_NO: {},
        COMPANY_NAME: {},
        ADDRESS1: {},
        ADDRESS2: {},
        POSTCODE: {},
        CITY: {},
        STATE: {},
        COUNTRY: {},
        CURRENCY: {},
        SALESPERSON: {},
        CREATION_TS: {},
        CREATION_USER_GUID: {},
        UPDATE_TS: {},
        UPDATE_USER_GUID: {},
        DELETED_AT: {}
      }



      const module = await Test.createTestingModule({
        providers: [
          {
            provide: CustomerService,
            useValue: CustomerServiceStub
          },
          {
            provide: CustomerDbService,
            useValue: CustomerDBServiceStub
          },
          {
            provide: CreateCustomerDTO,
            useValue: CreateCustomerDTOStub
          },
          {
            provide: UpdateCustomerDTO,
            useValue: UpdateCustomerDTOStub
          },
          {
            provide: UserMainModel,
            useValue: UserMainModelStub
          },
          {
            provide: CustomerModel,
            useValue: CustomerModelStub
          }

        ],
      }).compile();

      Service = module.get<CustomerService>(CustomerService);
      DBService = module.get<CustomerDbService>(CustomerDbService);
      CreateData = module.get<CreateCustomerDTO>(CreateCustomerDTO);
      UpdateData = module.get<UpdateCustomerDTO>(UpdateCustomerDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);;
      CustomerModelData = module.get<CustomerModel>(CustomerModel);;
    });


  describe('CustomerService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

  // Create customer method
  describe('Create Customer', () => {
    // Service
    it('Should not call method create customer in service customer', () => {
      spyOn(Service, 'createCustomer').and.callThrough();
      expect(Service.createCustomer).not.toHaveBeenCalled();
    })

    it('Should call method create customer in service customer', () => {
      spyOn(Service, 'createCustomer').and.callThrough();
      Service.createCustomer([CreateData, UserMainModelData]);
      expect(Service.createCustomer).toHaveBeenCalled();
    })

    it('Should call one time method create customer in service customer', () => {
      spyOn(Service, 'createCustomer').and.callThrough();
      Service.createCustomer([CreateData, UserMainModelData]);
      expect(Service.createCustomer).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service customer', () => {
      spyOn(Service, 'inputData').and.callThrough();
      Service.inputData([CustomerModelData, CreateData]);
      expect(Service.inputData).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method create customer in db service customer', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      expect(DBService.createByModel).not.toHaveBeenCalled();
    })

    it('Should call method create customer in db service customer', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalled();
    })

    it('Should call one time method create customer in db service customer', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalledTimes(1);
    })

  });

  // Get customer method
  describe('Get Customer', () => {

    // Service
    it('Should not call method get customer in service customer', () => {
      spyOn(Service, 'getCustomer').and.callThrough();
      expect(Service.getCustomer).not.toHaveBeenCalled();
    })

    it('Should call method get customer in service customer', () => {
      spyOn(Service, 'getCustomer').and.callThrough();
      Service.getCustomer();
      expect(Service.getCustomer).toHaveBeenCalled();
    })

    it('Should call one time method get customer in service customer', () => {
      spyOn(Service, 'getCustomer').and.callThrough();
      Service.getCustomer();
      expect(Service.getCustomer).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method get customer in db service customer', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      expect(DBService.findByFilterV4).not.toHaveBeenCalled();
    })

    it('Should call method get customer in db service customer', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalled();
    })

    it('Should call one time method get customer in db service customer', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalledTimes(1);
    })

  });


  // Update customer method
  describe('Update Customer', () => {
    // Service
    it('Should not call method update customer in service customer', () => {
      spyOn(Service, 'updateCustomer').and.callThrough();
      expect(Service.updateCustomer).not.toHaveBeenCalled();
    })

    it('Should call method update customer in service customer', () => {
      spyOn(Service, 'updateCustomer').and.callThrough();
      Service.updateCustomer([UpdateData, UserMainModelData]);
      expect(Service.updateCustomer).toHaveBeenCalled();
    })

    it('Should call one time method update customer in service customer', () => {
      spyOn(Service, 'updateCustomer').and.callThrough();
      Service.updateCustomer([UpdateData, UserMainModelData]);
      expect(Service.updateCustomer).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service customer', () => {
      spyOn(Service, 'inputData').and.callThrough();
      Service.inputData([CustomerModelData, UpdateData]);
      expect(Service.inputData).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method update customer in db service customer', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      expect(DBService.updateByModel).not.toHaveBeenCalled();
    })

    it('Should call method update customer in db service customer', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalled();
    })

    it('Should call one time method update customer in db service customer', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalledTimes(1);
    })

  });

});

