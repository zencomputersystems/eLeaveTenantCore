
import { RoleController } from '../../../src/admin/role/role.controller';
import { RoleService } from '../../../src/admin/role/role.service';
import { Test } from '@nestjs/testing';

describe('RoleController', () => {
  let Controller: RoleController;
  let Service: RoleService;

  beforeEach(
    async () => {

      const RoleControllerStub = {
        getRoleList: (res: Response) => ({
          subscribe: () => ({
          })
        })
      }

      const RoleServiceStub = {
        getRole: () => ({
        })
      };

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: RoleController,
            useValue: RoleControllerStub
          },
          {
            provide: RoleService,
            useValue: RoleServiceStub
          }
        ],
      }).compile();

      Controller = module.get<RoleController>(RoleController);
      Service = module.get<RoleService>(RoleService);
    });

  describe('RoleController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

  // Get Role method
  describe('Get Role', () => {
    // Controller
    it('Should not call method get Role in controller role', () => {
      spyOn(Controller, 'getRoleList').and.callThrough();
      expect(Controller.getRoleList).not.toHaveBeenCalled();
    })

    it('Should call method get Role in controller role', () => {
      spyOn(Controller, 'getRoleList').and.callThrough();
      Controller.getRoleList(null);
      expect(Controller.getRoleList).toHaveBeenCalled();
    })

    it('Should call one time method get Role in controller role', () => {
      spyOn(Controller, 'getRoleList').and.callThrough();
      Controller.getRoleList(null);
      expect(Controller.getRoleList).toHaveBeenCalledTimes(1);
    })

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

  });

});

