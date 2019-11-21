
import { SubscriptionDetailService } from '../../../src/admin/subscription/Subscription-detail.service';
import { Test } from '@nestjs/testing';
import { SubscriptionDbService } from '../../../src/common/db/table.db.service';
import { CustomerInfoDTO, CompanyInfoDTO, CustomerHistoryDTO, NextBillingDateDTO, UsageDTO, CompanyDataDTO } from '../../../src/admin/subscription/dto/results-item.dto';

describe('SubscriptionDetailService', () => {
  let Service: SubscriptionDetailService;
  let DBService: SubscriptionDbService;
  let CustomerInfoData: CustomerInfoDTO;
  let CompanyInfoData: CompanyInfoDTO;
  let CustomerHistoryData: CustomerHistoryDTO;
  let NextBillingDateData: NextBillingDateDTO;
  let UsageData: UsageDTO;
  let CompanyData: CompanyDataDTO;

  beforeEach(
    async () => {

      const SubscriptionDetailServiceStub = {
        getData: ([subsId]: [string]) => ({
        }),

        inputData: ([item, data]: [string, string[]]) => ({
        }),

        assignCustomerInfo: ([inputObj, data]: [CustomerInfoDTO, any]) => ({
        }),

        assignSubscriptionInfo: ([inputObj, data]: [CustomerInfoDTO, any]) => ({
        }),

        assignCompanyInfo: ([inputObj, data]: [CompanyInfoDTO, any]) => ({
        }),

        assignCustomerHistory: ([inputObj, data]: [CustomerHistoryDTO, any]) => ({
        }),

        assignNextBillingDate: ([inputObj, data]: [NextBillingDateDTO, any]) => ({
        }),

        assignUsage: ([inputObj, data]: [UsageDTO, any]) => ({
        })

      };

      const SubscriptionDBServiceStub = {
        findByFilterV4: ([fields, filters, order, limit, offset, relations, group]: [string[], string[], string, number, number, string[], string]) => ({
        })

      }

      const CustomerInfoDTOStub = {
        customer_name: {},
        customer_email: {},
        customer_contact_no: {},
        customer_company_name: {},
        customer_address1: {},
        customer_address2: {},
        customer_zip: {},
        customer_city: {},
        customer_state: {},
        customer_country: {},
        customer_currency: {},
        salesperson_pic: {},
        subscription_id: {},
        subscription_label: {},
        subscription_plan: {},
        subscription_status: {},
        subscription_quota: {},
        subscription_used_quota: {},
        creation_date: {},
        activation_date: {},
        last_billing_date: {},
        next_billing_date: {},
        recurr_interval: {},
        recurr_interval_val: {},
        billing_cycle: {}

      }
      const CompanyInfoDTOStub = {
        id: {},
        name: {},
        registration_no: {},
        address: {},
        total_employee: {}
      }

      const CompanyDataDTOStub = {
        total_company: {},
        total_employee: {},
        company_details: CompanyInfoDTOStub
      }

      const CustomerHistoryDTOStub = {
        history_id: {},
        message: {},
        update_time: {},
        update_by: {}
      }

      const NextBillingDateDTOStub = {
        next_billing_date: {},
      }

      const UsageDTOStub = {
        subscription_quota: {},
        subscription_used_quota: {}
      }



      const module = await Test.createTestingModule({
        providers: [
          {
            provide: SubscriptionDetailService,
            useValue: SubscriptionDetailServiceStub
          },
          {
            provide: SubscriptionDbService,
            useValue: SubscriptionDBServiceStub
          },
          {
            provide: CustomerInfoDTO,
            useValue: CustomerInfoDTOStub
          },
          {
            provide: CompanyInfoDTO,
            useValue: CompanyInfoDTOStub
          },
          {
            provide: CustomerHistoryDTO,
            useValue: CustomerHistoryDTOStub
          },
          {
            provide: NextBillingDateDTO,
            useValue: NextBillingDateDTOStub
          },
          {
            provide: UsageDTO,
            useValue: UsageDTOStub
          },
          {
            provide: CompanyDataDTO,
            useValue: CompanyDataDTOStub
          }

        ]
      }).compile();

      Service = module.get<SubscriptionDetailService>(SubscriptionDetailService);
      DBService = module.get<SubscriptionDbService>(SubscriptionDbService);
      CustomerInfoData = module.get<CustomerInfoDTO>(CustomerInfoDTO);
      CompanyInfoData = module.get<CompanyInfoDTO>(CompanyInfoDTO);
      CustomerHistoryData = module.get<CustomerHistoryDTO>(CustomerHistoryDTO);
      NextBillingDateData = module.get<NextBillingDateDTO>(NextBillingDateDTO);
      UsageData = module.get<UsageDTO>(UsageDTO);
      CompanyData = module.get<CompanyDataDTO>(CompanyDataDTO);
    });


  describe('SubscriptionDetailService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });


  // Get Subscription method
  describe('Get Subscription', () => {

    // Service
    it('Should not call method get Subscription in service subscription', () => {
      spyOn(Service, 'getData').and.callThrough();
      expect(Service.getData).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in service subscription', () => {
      spyOn(Service, 'getData').and.callThrough();
      Service.getData([null]);
      expect(Service.getData).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in service subscription', () => {
      spyOn(Service, 'getData').and.callThrough();
      Service.getData([null]);
      expect(Service.getData).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method get Subscription in db service subscription', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      expect(DBService.findByFilterV4).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in db service subscription', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in db service subscription', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalledTimes(1);
    })

  });


  // Input data method
  describe('Input data Subscription', () => {
    it('Should call customer info method input data Subscription in service subscription', () => {
      spyOn(Service, 'inputData').and.callThrough();
      Service.inputData([null, null]);
      expect(Service.inputData).toHaveBeenCalledTimes(1);
    })

  });


  // Assign customer info method
  describe('Assign customer info Subscription', () => {
    it('Should call customer info method assign customer info Subscription in service subscription', () => {
      spyOn(Service, 'assignCustomerInfo').and.callThrough();
      Service.assignCustomerInfo([CustomerInfoData, null]);
      expect(Service.assignCustomerInfo).toHaveBeenCalledTimes(1);
    })

  });

  // Assign company info method
  describe('Assign company info Subscription', () => {
    it('Should call customer info method assign company info Subscription in service subscription', () => {
      spyOn(Service, 'assignCompanyInfo').and.callThrough();
      Service.assignCompanyInfo([CompanyInfoData, null]);
      expect(Service.assignCompanyInfo).toHaveBeenCalledTimes(1);
    })

  });

  // Assign subscription info method
  describe('Assign subscription info Subscription', () => {
    it('Should call customer info method assign subscription info Subscription in service subscription', () => {
      spyOn(Service, 'assignSubscriptionInfo').and.callThrough();
      Service.assignSubscriptionInfo([CustomerInfoData, null]);
      expect(Service.assignSubscriptionInfo).toHaveBeenCalledTimes(1);
    })

  });

  // Assign customer history method
  describe('Assign customer history Subscription', () => {
    it('Should call customer info method assign customer history Subscription in service subscription', () => {
      spyOn(Service, 'assignCustomerHistory').and.callThrough();
      Service.assignCustomerHistory([CustomerHistoryData, null]);
      expect(Service.assignCustomerHistory).toHaveBeenCalledTimes(1);
    })

  });

  // Assign next billing date method
  describe('Assign next billing date Subscription', () => {
    it('Should call customer info method assign next billing date Subscription in service subscription', () => {
      spyOn(Service, 'assignNextBillingDate').and.callThrough();
      Service.assignNextBillingDate([NextBillingDateData, null]);
      expect(Service.assignNextBillingDate).toHaveBeenCalledTimes(1);
    })

  });

  // Assign usage method
  describe('Assign usage Subscription', () => {
    it('Should call customer info method assign usage Subscription in service subscription', () => {
      spyOn(Service, 'assignUsage').and.callThrough();
      Service.assignUsage([UsageData, null]);
      expect(Service.assignUsage).toHaveBeenCalledTimes(1);
    })

  });

});

