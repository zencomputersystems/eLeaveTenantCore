
import { RoleService } from '../../../src/admin/role/role.service';
import { Test } from '@nestjs/testing';
import { RoleDbService } from '../../../src/common/db/table.db.service';

describe('RoleService', () => {
  let Service: RoleService;
  let DBService: RoleDbService;

  beforeEach(
    async () => {

      const RoleServiceStub = {
        getRole: () => ({
        })

      };

      const RoleDBServiceStub = {
        findByFilterV4: ([fields, filters, order, limit, offset, relations, group]: [string[], string[], string, number, number, string[], string]) => ({
        })

      }

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: RoleService,
            useValue: RoleServiceStub
          },
          {
            provide: RoleDbService,
            useValue: RoleDBServiceStub
          }

        ],
      }).compile();

      Service = module.get<RoleService>(RoleService);
      DBService = module.get<RoleDbService>(RoleDbService);
    });


  describe('RoleService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

  // Get Role method
  describe('Get Role', () => {

    // Service
    it('Should not call method get Role in service role', () => {
      spyOn(Service, 'getRole').and.callThrough();
      expect(Service.getRole).not.toHaveBeenCalled();
    })

    it('Should call method get Role in service role', () => {
      spyOn(Service, 'getRole').and.callThrough();
      Service.getRole();
      expect(Service.getRole).toHaveBeenCalled();
    })

    it('Should call one time method get Role in service role', () => {
      spyOn(Service, 'getRole').and.callThrough();
      Service.getRole();
      expect(Service.getRole).toHaveBeenCalledTimes(1);
    })

    // DB Service
    it('Should not call method get Role in db service role', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      expect(DBService.findByFilterV4).not.toHaveBeenCalled();
    })

    it('Should call method get Role in db service role', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalled();
    })

    it('Should call one time method get Role in db service role', () => {
      spyOn(DBService, 'findByFilterV4').and.callThrough();
      DBService.findByFilterV4([null, null, null, null, null, null, null]);
      expect(DBService.findByFilterV4).toHaveBeenCalledTimes(1);
    })

  });

});

