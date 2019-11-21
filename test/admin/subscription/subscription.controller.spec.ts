
import { SubscriptionController } from '../../../src/admin/subscription/subscription.controller';
import { SubscriptionService } from '../../../src/admin/subscription/subscription.service';
import { Test } from '@nestjs/testing';
import { CreateSubscriptionDTO } from '../../../src/admin/subscription/dto/create-subscription.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateSubscriptionDTO } from '../../../src/admin/subscription/dto/update-subscription.dto';
import { SubscriptionDetailService } from '../../../src/admin/subscription/subscription-detail.service';

describe('SubscriptionController', () => {
  let Controller: SubscriptionController;
  let Service: SubscriptionService;
  let ServiceDetail: SubscriptionDetailService;
  let CreateData: CreateSubscriptionDTO;
  let UpdateData: UpdateSubscriptionDTO;
  let UserMainModelData: UserMainModel;

  beforeEach(
    async () => {

      const SubscriptionControllerStub = {
        createSubscription: (SubscriptionData: CreateSubscriptionDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        getCustomerDetails: (param: { item: string, subs_id: string }, res: Response) => ({
          subscribe: () => ({
          })
        }),

        findAllSubscription: (res: Response) => ({
          subscribe: () => ({
          })
        }),

        updateSubscription: (SubscriptionData: UpdateSubscriptionDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        })

      }

      const SubscriptionServiceStub = {
        createSubscription: ([SubscriptionData, req]: [CreateSubscriptionDTO, UserMainModel]) => ({
        }),

        getSubscription: () => ({
        }),

        updateSubscription: ([SubscriptionData, req]: [UpdateSubscriptionDTO, UserMainModel]) => ({
        })

      };

      const SubscriptionDetailServiceStub = {
        getData: (subsId: string) => ({
        }),

        inputData: ([item, data]: [string, string[]]) => ({
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

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: SubscriptionController,
            useValue: SubscriptionControllerStub
          },
          {
            provide: SubscriptionService,
            useValue: SubscriptionServiceStub
          },
          {
            provide: SubscriptionDetailService,
            useValue: SubscriptionDetailServiceStub
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
          }
        ],
      }).compile();

      Controller = module.get<SubscriptionController>(SubscriptionController);
      Service = module.get<SubscriptionService>(SubscriptionService);
      ServiceDetail = module.get<SubscriptionDetailService>(SubscriptionDetailService);
      CreateData = module.get<CreateSubscriptionDTO>(CreateSubscriptionDTO);
      UpdateData = module.get<UpdateSubscriptionDTO>(UpdateSubscriptionDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);
    });

  describe('SubscriptionController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

  // Get Subscription method
  describe('Get Subscription Detail', () => {
    // Controller
    it('Should not call method get Subscription in controller subscription', () => {
      spyOn(Controller, 'getCustomerDetails').and.callThrough();
      expect(Controller.getCustomerDetails).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in controller subscription', () => {
      spyOn(Controller, 'getCustomerDetails').and.callThrough();
      Controller.getCustomerDetails(null, null);
      expect(Controller.getCustomerDetails).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in controller subscription', () => {
      spyOn(Controller, 'getCustomerDetails').and.callThrough();
      Controller.getCustomerDetails(null, null);
      expect(Controller.getCustomerDetails).toHaveBeenCalledTimes(1);
    })

    // Service Detail
    it('Should not call method get Subscription in service detail subscription', () => {
      spyOn(ServiceDetail, 'getData').and.callThrough();
      expect(ServiceDetail.getData).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in service detail subscription', () => {
      spyOn(ServiceDetail, 'getData').and.callThrough();
      ServiceDetail.getData(null);
      expect(ServiceDetail.getData).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in service detail subscription', () => {
      spyOn(ServiceDetail, 'getData').and.callThrough();
      ServiceDetail.getData(null);
      expect(ServiceDetail.getData).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method get Subscription in controller subscription', () => {
      spyOn(ServiceDetail, 'inputData').and.callThrough();
      ServiceDetail.inputData([null, null]);
      expect(ServiceDetail.inputData).toHaveBeenCalledTimes(1);
    })

  });

  // Get Subscription method
  describe('Get Subscription', () => {
    // Controller
    it('Should not call method get Subscription in controller subscription', () => {
      spyOn(Controller, 'findAllSubscription').and.callThrough();
      expect(Controller.findAllSubscription).not.toHaveBeenCalled();
    })

    it('Should call method get Subscription in controller subscription', () => {
      spyOn(Controller, 'findAllSubscription').and.callThrough();
      Controller.findAllSubscription(null);
      expect(Controller.findAllSubscription).toHaveBeenCalled();
    })

    it('Should call one time method get Subscription in controller subscription', () => {
      spyOn(Controller, 'findAllSubscription').and.callThrough();
      Controller.findAllSubscription(null);
      expect(Controller.findAllSubscription).toHaveBeenCalledTimes(1);
    })

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

  });

  // Create Subscription method
  describe('Create Subscription', () => {
    // Controller
    it('Should not call method create Subscription in controller subscription', () => {
      spyOn(Controller, 'createSubscription').and.callThrough();
      expect(Controller.createSubscription).not.toHaveBeenCalled();
    })

    it('Should call method create Subscription in controller subscription', () => {
      spyOn(Controller, 'createSubscription').and.callThrough();
      Controller.createSubscription(CreateData, null, null);
      expect(Controller.createSubscription).toHaveBeenCalled();
    })

    it('Should call one time method create Subscription in controller subscription', () => {
      spyOn(Controller, 'createSubscription').and.callThrough();
      Controller.createSubscription(CreateData, null, null);
      expect(Controller.createSubscription).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Subscription method
  describe('Update Subscription', () => {
    // Controller
    it('Should not call method update Subscription in controller subscription', () => {
      spyOn(Controller, 'updateSubscription').and.callThrough();
      expect(Controller.updateSubscription).not.toHaveBeenCalled();
    })

    it('Should call method update Subscription in controller subscription', () => {
      spyOn(Controller, 'updateSubscription').and.callThrough();
      Controller.updateSubscription(UpdateData, null, null);
      expect(Controller.updateSubscription).toHaveBeenCalled();
    })

    it('Should call one time method update Subscription in controller subscription', () => {
      spyOn(Controller, 'updateSubscription').and.callThrough();
      Controller.updateSubscription(UpdateData, null, null);
      expect(Controller.updateSubscription).toHaveBeenCalledTimes(1);
    })

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

  });

});

