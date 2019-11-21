
import { ActivityLogService } from '../../../src/admin/activity-log/activity-log.service';
import { Test } from '@nestjs/testing';
import { CreateActivityLogDTO } from '../../../src/admin/activity-log/dto/create-activity-log.dto';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { UpdateActivityLogDTO } from '../../../src/admin/activity-log/dto/update-activity-log.dto';
import { ActivityLogDbService } from '../../../src/common/db/table.db.service';
import { Resource } from '../../../src/common/model/resource.model';
import { ActivityLogModel } from '../../../src/common/model/activity-log.model';

describe('ActivityLogService', () => {
  let Service: ActivityLogService;
  let DBService: ActivityLogDbService;
  let CreateData: CreateActivityLogDTO;
  let UpdateData: UpdateActivityLogDTO;
  let UserMainModelData: UserMainModel;
  let ActivityLogModelData: ActivityLogModel;

  beforeEach(
    async () => {

      const ActivityLogServiceStub = {
        createActivityLog: ([ActivityLogData, req]: [CreateActivityLogDTO, UserMainModel]) => ({
        }),

        getActivityLog: () => ({
        }),

        updateActivityLog: ([ActivityLogData, req]: [UpdateActivityLogDTO, UserMainModel]) => ({
        }),

        inputData: ([model, data]: [ActivityLogModel, UpdateActivityLogDTO | CreateActivityLogDTO]) => ({

        })

      };

      const ActivityLogDBServiceStub = {
        findByFilterV4: ([fields, filters, order, limit, offset, relations, group]: [string[], string[], string, number, number, string[], string]) => ({
        }),

        createByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        }),

        updateByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        })

      }

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

      const ActivityLogModelStub = {
        LOG_GUID: {},
        CUSTOMER_GUID: {},
        SUBSCRIPTION_GUID: {},
        MESSAGE: {}
      }



      const module = await Test.createTestingModule({
        providers: [
          {
            provide: ActivityLogService,
            useValue: ActivityLogServiceStub
          },
          {
            provide: ActivityLogDbService,
            useValue: ActivityLogDBServiceStub
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
          },
          {
            provide: ActivityLogModel,
            useValue: ActivityLogModelStub
          }

        ],
      }).compile();

      Service = module.get<ActivityLogService>(ActivityLogService);
      DBService = module.get<ActivityLogDbService>(ActivityLogDbService);
      CreateData = module.get<CreateActivityLogDTO>(CreateActivityLogDTO);
      UpdateData = module.get<UpdateActivityLogDTO>(UpdateActivityLogDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);;
      ActivityLogModelData = module.get<ActivityLogModel>(ActivityLogModel);;
    });


  describe('ActivityLogService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

  // Get ActivityLog method
  describe('Get ActivityLog', () => {

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

    // DB Service
    it('Should not call method get ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      expect(DBService.findByFilterV4).not.toHaveBeenCalled();
    })

    it('Should call method get ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalled();
    })

    it('Should call one time method get ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalledTimes(1);
    })

  });

  // Create ActivityLog method
  describe('Create ActivityLog', () => {
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

    it('Should call one time method input data in service activity-log', () => {
      spyOn(Service, 'inputData').and.callThrough();
      Service.inputData([ActivityLogModelData, CreateData]);
      expect(Service.inputData).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method create ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      expect(DBService.createByModel).not.toHaveBeenCalled();
    })

    it('Should call method create ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalled();
    })

    it('Should call one time method create ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'createByModel').and.callThrough();
      DBService.createByModel([null, null, null, null]);
      expect(DBService.createByModel).toHaveBeenCalledTimes(1);
    })

  });

  // Update ActivityLog method
  describe('Update ActivityLog', () => {
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

    it('Should call one time method input data in service activity-log', () => {
      spyOn(Service, 'inputData').and.callThrough();
      Service.inputData([ActivityLogModelData, UpdateData]);
      expect(Service.inputData).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method update ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      expect(DBService.updateByModel).not.toHaveBeenCalled();
    })

    it('Should call method update ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalled();
    })

    it('Should call one time method update ActivityLog in db service activity-log', () => {
      spyOn(DBService, 'updateByModel').and.callThrough();
      DBService.updateByModel([null, null, null, null]);
      expect(DBService.updateByModel).toHaveBeenCalledTimes(1);
    })

  });

});

