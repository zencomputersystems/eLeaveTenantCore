
import { ActivityLogController } from '../../../src/admin/activity-log/activity-log.controller';
import { ActivityLogService } from '../../../src/admin/activity-log/activity-log.service';
import { Test } from '@nestjs/testing';
import { CreateActivityLogDTO } from '../../../src/admin/activity-log/dto/create-activity-log.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateActivityLogDTO } from '../../../src/admin/activity-log/dto/update-activity-log.dto';

describe('ActivityLogController', () => {
  let Controller: ActivityLogController;
  let Service: ActivityLogService;
  let CreateData: CreateActivityLogDTO;
  let UpdateData: UpdateActivityLogDTO;
  let UserMainModelData: UserMainModel;

  beforeEach(
    async () => {

      const ActivityLogControllerStub = {
        createActivityLog: (ActivityLogData: CreateActivityLogDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        findAllActivityLog: (res: Response) => ({
          subscribe: () => ({
          })
        }),

        updateActivityLog: (ActivityLogData: UpdateActivityLogDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        })

      }

      const ActivityLogServiceStub = {
        createActivityLog: ([ActivityLogData, req]: [CreateActivityLogDTO, UserMainModel]) => ({
        }),

        getActivityLog: () => ({
        }),

        updateActivityLog: ([ActivityLogData, req]: [UpdateActivityLogDTO, UserMainModel]) => ({
        }),
      };

      const CreateActivityLogDTOStub = {
        customerId: {},
        subscriptionId: {},
        message: {}
      }

      const UpdateActivityLogDTOStub = {
        logId: {},
        customerId: {},
        subscriptionId: {},
        message: {}
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
            provide: ActivityLogController,
            useValue: ActivityLogControllerStub
          },
          {
            provide: ActivityLogService,
            useValue: ActivityLogServiceStub
          },
          {
            provide: CreateActivityLogDTO,
            useValue: CreateActivityLogDTOStub
          },
          {
            provide: UpdateActivityLogDTO,
            useValue: UpdateActivityLogDTOStub
          },
          {
            provide: UserMainModel,
            useValue: UserMainModelStub
          }
        ],
      }).compile();

      Controller = module.get<ActivityLogController>(ActivityLogController);
      Service = module.get<ActivityLogService>(ActivityLogService);
      CreateData = module.get<CreateActivityLogDTO>(CreateActivityLogDTO);
      UpdateData = module.get<UpdateActivityLogDTO>(UpdateActivityLogDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);
    });

  describe('ActivityLogController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

  // Get ActivityLog method
  describe('Get ActivityLog', () => {
    // Controller
    it('Should not call method get ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'findAllActivityLog').and.callThrough();
      expect(Controller.findAllActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method get ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'findAllActivityLog').and.callThrough();
      Controller.findAllActivityLog(null, null);
      expect(Controller.findAllActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method get ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'findAllActivityLog').and.callThrough();
      Controller.findAllActivityLog(null, null);
      expect(Controller.findAllActivityLog).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get ActivityLog in service activity-log', () => {
      spyOn(Service, 'getActivityLog').and.callThrough();
      expect(Service.getActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method get ActivityLog in service activity-log', () => {
      spyOn(Service, 'getActivityLog').and.callThrough();
      Service.getActivityLog([null]);
      expect(Service.getActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method get ActivityLog in service activity-log', () => {
      spyOn(Service, 'getActivityLog').and.callThrough();
      Service.getActivityLog([null]);
      expect(Service.getActivityLog).toHaveBeenCalledTimes(1);
    })

  });

  // Create ActivityLog method
  describe('Create ActivityLog', () => {
    // Controller
    it('Should not call method create ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'createActivityLog').and.callThrough();
      expect(Controller.createActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method create ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'createActivityLog').and.callThrough();
      Controller.createActivityLog(CreateData, null, null);
      expect(Controller.createActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method create ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'createActivityLog').and.callThrough();
      Controller.createActivityLog(CreateData, null, null);
      expect(Controller.createActivityLog).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method create ActivityLog in service activity-log', () => {
      spyOn(Service, 'createActivityLog').and.callThrough();
      expect(Service.createActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method create ActivityLog in service activity-log', () => {
      spyOn(Service, 'createActivityLog').and.callThrough();
      Service.createActivityLog([CreateData, UserMainModelData]);
      expect(Service.createActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method create ActivityLog in service activity-log', () => {
      spyOn(Service, 'createActivityLog').and.callThrough();
      Service.createActivityLog([CreateData, UserMainModelData]);
      expect(Service.createActivityLog).toHaveBeenCalledTimes(1);
    })

  });

  // Update ActivityLog method
  describe('Update ActivityLog', () => {
    // Controller
    it('Should not call method update ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'updateActivityLog').and.callThrough();
      expect(Controller.updateActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method update ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'updateActivityLog').and.callThrough();
      Controller.updateActivityLog(UpdateData, null, null);
      expect(Controller.updateActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method update ActivityLog in controller activity-log', () => {
      spyOn(Controller, 'updateActivityLog').and.callThrough();
      Controller.updateActivityLog(UpdateData, null, null);
      expect(Controller.updateActivityLog).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method update ActivityLog in service activity-log', () => {
      spyOn(Service, 'updateActivityLog').and.callThrough();
      expect(Service.updateActivityLog).not.toHaveBeenCalled();
    })

    it('Should call method update ActivityLog in service activity-log', () => {
      spyOn(Service, 'updateActivityLog').and.callThrough();
      Service.updateActivityLog([UpdateData, UserMainModelData]);
      expect(Service.updateActivityLog).toHaveBeenCalled();
    })

    it('Should call one time method update ActivityLog in service activity-log', () => {
      spyOn(Service, 'updateActivityLog').and.callThrough();
      Service.updateActivityLog([UpdateData, UserMainModelData]);
      expect(Service.updateActivityLog).toHaveBeenCalledTimes(1);
    })

  });

});

