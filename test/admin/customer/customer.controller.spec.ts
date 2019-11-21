
import { CustomerController } from '../../../src/admin/customer/customer.controller';
import { CustomerService } from '../../../src/admin/customer/customer.service';
import { Test } from '@nestjs/testing';
import { CreateCustomerDTO } from '../../../src/admin/customer/dto/create-customer.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateCustomerDTO } from '../../../src/admin/customer/dto/update-customer.dto';

describe('CustomerController', () => {
  let Controller: CustomerController;
  let Service: CustomerService;
  let CreateData: CreateCustomerDTO;
  let UpdateData: UpdateCustomerDTO;
  let UserMainModelData: UserMainModel;

  beforeEach(
    async () => {

      const CustomerControllerStub = {
        createCustomer: (customerData: CreateCustomerDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        findAllCustomer: (res: Response) => ({
          subscribe: () => ({
          })
        }),

        updateCustomer: (customerData: UpdateCustomerDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        })

      }

      const CustomerServiceStub = {
        createCustomer: ([customerData, req]: [CreateCustomerDTO, UserMainModel]) => ({
        }),

        getCustomer: () => ({
        }),

        updateCustomer: ([customerData, req]: [UpdateCustomerDTO, UserMainModel]) => ({
        }),
      };

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

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: CustomerController,
            useValue: CustomerControllerStub
          },
          {
            provide: CustomerService,
            useValue: CustomerServiceStub
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
          }
        ],
      }).compile();

      Controller = module.get<CustomerController>(CustomerController);
      Service = module.get<CustomerService>(CustomerService);
      CreateData = module.get<CreateCustomerDTO>(CreateCustomerDTO);
      UpdateData = module.get<UpdateCustomerDTO>(UpdateCustomerDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);
    });

  describe('CustomerController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

  // Create customer method
  describe('Create Customer', () => {
    // Controller
    it('Should not call method create customer in controller customer', () => {
      spyOn(Controller, 'createCustomer').and.callThrough();
      expect(Controller.createCustomer).not.toHaveBeenCalled();
    })

    it('Should call method create customer in controller customer', () => {
      spyOn(Controller, 'createCustomer').and.callThrough();
      Controller.createCustomer(CreateData, null, null);
      expect(Controller.createCustomer).toHaveBeenCalled();
    })

    it('Should call one time method create customer in controller customer', () => {
      spyOn(Controller, 'createCustomer').and.callThrough();
      Controller.createCustomer(CreateData, null, null);
      expect(Controller.createCustomer).toHaveBeenCalledTimes(1);
    })

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

  });

  // Get customer method
  describe('Get Customer', () => {
    // Controller
    it('Should not call method get customer in controller customer', () => {
      spyOn(Controller, 'findAllCustomer').and.callThrough();
      expect(Controller.findAllCustomer).not.toHaveBeenCalled();
    })

    it('Should call method get customer in controller customer', () => {
      spyOn(Controller, 'findAllCustomer').and.callThrough();
      Controller.findAllCustomer(null);
      expect(Controller.findAllCustomer).toHaveBeenCalled();
    })

    it('Should call one time method get customer in controller customer', () => {
      spyOn(Controller, 'findAllCustomer').and.callThrough();
      Controller.findAllCustomer(null);
      expect(Controller.findAllCustomer).toHaveBeenCalledTimes(1);
    })

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

  });


  // Update customer method
  describe('Update Customer', () => {
    // Controller
    it('Should not call method update customer in controller customer', () => {
      spyOn(Controller, 'updateCustomer').and.callThrough();
      expect(Controller.updateCustomer).not.toHaveBeenCalled();
    })

    it('Should call method update customer in controller customer', () => {
      spyOn(Controller, 'updateCustomer').and.callThrough();
      Controller.updateCustomer(UpdateData, null, null);
      expect(Controller.updateCustomer).toHaveBeenCalled();
    })

    it('Should call one time method update customer in controller customer', () => {
      spyOn(Controller, 'updateCustomer').and.callThrough();
      Controller.updateCustomer(UpdateData, null, null);
      expect(Controller.updateCustomer).toHaveBeenCalledTimes(1);
    })

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

  });

});

