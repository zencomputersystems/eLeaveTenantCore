
import { SubscriptionService } from '../../../src/admin/Subscription/Subscription.service';
import { Test } from '@nestjs/testing';
import { CreateSubscriptionDTO } from '../../../src/admin/Subscription/dto/create-Subscription.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateSubscriptionDTO } from '../../../src/admin/Subscription/dto/update-Subscription.dto';
import { SubscriptionDbService } from '../../../src/common/db/table.db.service';
import { Resource } from '../../../src/common/model/resource.model';
import { SubscriptionModel } from '../../../src/common/model/Subscription.model';

describe('SubscriptionService', () => {
  let Service: SubscriptionService;
  let DBService: SubscriptionDbService;
  let CreateData: CreateSubscriptionDTO;
  let UpdateData: UpdateSubscriptionDTO;
  let UserMainModelData: UserMainModel;
  let SubscriptionModelData: SubscriptionModel;

  beforeEach(
    async () => {

      const SubscriptionServiceStub = {
        createSubscription: ([SubscriptionData, req]: [CreateSubscriptionDTO, UserMainModel]) => ({
        }),

        getSubscription: () => ({
        }),

        updateSubscription: ([SubscriptionData, req]: [UpdateSubscriptionDTO, UserMainModel]) => ({
        }),

        inputDataSubscription: ([model, data]: [SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO]) => ({
        })

      };

      const SubscriptionDBServiceStub = {
        findByFilterV4: ([fields, filters, order, limit, offset, relations, group]: [string[], string[], string, number, number, string[], string]) => ({
        }),

        createByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        }),

        updateByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        })

      }

      const CreateSubscriptionDTOStub = {
        subscriptionLabel: {},
        customerGuid: {},
        subscriptionPlan: {},
        subscriptionStatus: {},
        subscriptionQuota: {},
        activationDate: {},
        lastBillingDate: {},
        nextBillingDate: {},
        recurrInterval: {},
        recurrIntervalVal: {},
        billingCycle: {}
      }

      const UpdateSubscriptionDTOStub = {
        subscriptionGuid: {},
        subscriptionLabel: {},
        customerGuid: {},
        subscriptionPlan: {},
        subscriptionStatus: {},
        subscriptionQuota: {},
        activationDate: {},
        lastBillingDate: {},
        nextBillingDate: {},
        recurrInterval: {},
        recurrIntervalVal: {},
        billingCycle: {}
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

      const SubscriptionModelStub = {
        SUBSCRIPTION_GUID: {},
        SUBSCRIPTION_LABEL: {},
        CUSTOMER_GUID: {},
        PLAN: {},
        STATUS: {},
        QUOTA: {},
        ACTIVATION_DATE: {},
        LAST_BILLING_DATE: {},
        NEXT_BILLING_DATE: {},
        RECURR_INTERVAL: {},
        RECURR_INTERVAL_VAL: {},
        BILLING_CYCLE: {},
        CREATION_TS: {},
        CREATION_USER_GUID: {},
        UPDATE_TS: new Date(),
        UPDATE_USER_GUID: {},
        DELETED_AT: {}
      }



      const module = await Test.createTestingModule({
        providers: [
          {
            provide: SubscriptionService,
            useValue: SubscriptionServiceStub
          },
          {
            provide: SubscriptionDbService,
            useValue: SubscriptionDBServiceStub
          },
          {
            provide: CreateSubscriptionDTO,
            useValue: CreateSubscriptionDTOStub
          },
          {
            provide: UpdateSubscriptionDTO,
            useValue: UpdateSubscriptionDTOStub
          },
          {
            provide: UserMainModel,
            useValue: UserMainModelStub
          },
          {
            provide: SubscriptionModel,
            useValue: SubscriptionModelStub
          }

        ]
      }).compile();

      Service = module.get<SubscriptionService>(SubscriptionService);
      DBService = module.get<SubscriptionDbService>(SubscriptionDbService);
      CreateData = module.get<CreateSubscriptionDTO>(CreateSubscriptionDTO);
      UpdateData = module.get<UpdateSubscriptionDTO>(UpdateSubscriptionDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);;
      SubscriptionModelData = module.get<SubscriptionModel>(SubscriptionModel);
    });


  describe('SubscriptionService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

  // Create Subscription method
  describe('Create Subscription', () => {
    // Service
    it('Should not call method create Subscription in service subscription', () => {
      spyOn(Service, 'createSubscription').and.callThrough();
      expect(Service.createSubscription).not.toHaveBeenCalled();
    })

    it('Should call method create Subscription in service subscription', () => {
      spyOn(Service, 'createSubscription').and.callThrough();
      Service.createSubscription([CreateData, UserMainModelData]);
      expect(Service.createSubscription).toHaveBeenCalled();
    })

    it('Should call one time method create Subscription in service subscription', () => {
      spyOn(Service, 'createSubscription').and.callThrough();
      Service.createSubscription([CreateData, UserMainModelData]);
      expect(Service.createSubscription).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service subscription', () => {
      spyOn(Service, 'inputDataSubscription').and.callThrough();
      Service.inputDataSubscription([SubscriptionModelData, CreateData]);
      expect(Service.inputDataSubscription).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method create Subscription in db service subscription', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      expect(DBService.createByModel).not.toHaveBeenCalled();
    })

    it('Should call method create Subscription in db service subscription', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalled();
    })

    it('Should call one time method create Subscription in db service subscription', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalledTimes(1);
    })

  });

  // Get Subscription method
  describe('Get Subscription', () => {

    // Service
    it('Should not call method get Subscription in service subscription', () => {
      spyOn(Service, 'getSubscription').and.callThrough();
      expect(Service.getSubscription).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in service subscription', () => {
      spyOn(Service, 'getSubscription').and.callThrough();
      Service.getSubscription();
      expect(Service.getSubscription).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in service subscription', () => {
      spyOn(Service, 'getSubscription').and.callThrough();
      Service.getSubscription();
      expect(Service.getSubscription).toHaveBeenCalledTimes(1);
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


  // Update Subscription method
  describe('Update Subscription', () => {
    // Service
    it('Should not call method update Subscription in service subscription', () => {
      spyOn(Service, 'updateSubscription').and.callThrough();
      expect(Service.updateSubscription).not.toHaveBeenCalled();
    })

    it('Should call method update Subscription in service subscription', () => {
      spyOn(Service, 'updateSubscription').and.callThrough();
      Service.updateSubscription([UpdateData, UserMainModelData]);
      expect(Service.updateSubscription).toHaveBeenCalled();
    })

    it('Should call one time method update Subscription in service subscription', () => {
      spyOn(Service, 'updateSubscription').and.callThrough();
      Service.updateSubscription([UpdateData, UserMainModelData]);
      expect(Service.updateSubscription).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service subscription', () => {
      spyOn(Service, 'inputDataSubscription').and.callThrough();
      Service.inputDataSubscription([SubscriptionModelData, UpdateData]);
      expect(Service.inputDataSubscription).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method update Subscription in db service subscription', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      expect(DBService.updateByModel).not.toHaveBeenCalled();
    })

    it('Should call method update Subscription in db service subscription', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalled();
    })

    it('Should call one time method update Subscription in db service subscription', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalledTimes(1);
    })

  });

});

