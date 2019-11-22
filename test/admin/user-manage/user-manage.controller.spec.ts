
import { UserManageController } from '../../../src/admin/user-manage/user-manage.controller';
import { UserManageService } from '../../../src/admin/user-manage/user-manage.service';
import { Test } from '@nestjs/testing';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { SignupDTO } from '../../../src/auth/dto/Signup.dto';
import { UpdateUserMainDTO } from '../../../src/admin/user-manage/dto/update-user-main.dto';
// No test function
describe('UserManageController', () => {
  let Controller: UserManageController;
  let Service: UserManageService;
  let CreateData: SignupDTO;
  let UpdateData: UpdateUserMainDTO;

  beforeEach(
    async () => {

      const UserManageControllerStub = {
        getUserAdmin: (roleData: string, res: Response) => ({
          subscribe: () => ({
          })
        }),

        signup: (signupData: SignupDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        updateUserMain: (updateUserMainDto: UpdateUserMainDTO, req, res: Response) => ({
          subscribe: () => ({
          })
        })

      }

      const UserManageServiceStub = {
        signupUser: ([signupData, cipherPassword, req]: [SignupDTO, string, UserMainModel]) => ({
        }),

        updateUserMain: ([UpdateUserMainDTO, req]: [UpdateUserMainDTO, UserMainModel]) => ({
        }),

        getAdminUser: (role: string) => ({
        }),
      };

      const SignupDTOStub = {
        name: {},
        email: {},
        loginId: {},
        password: {},
        role: {}
      }

      const UpdateUserMainDTOStub = {
        userId: {},
        email: {},
        fullname: {},
        role: {},
        status: {}
      }

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: UserManageController,
            useValue: UserManageControllerStub
          },
          {
            provide: UserManageService,
            useValue: UserManageServiceStub
          },
          {
            provide: SignupDTO,
            useValue: SignupDTOStub
          },
          {
            provide: UpdateUserMainDTO,
            useValue: UpdateUserMainDTOStub
          }
        ],
      }).compile();

      Controller = module.get<UserManageController>(UserManageController);
      Service = module.get<UserManageService>(UserManageService);
      CreateData = module.get<SignupDTO>(SignupDTO);
      UpdateData = module.get<UpdateUserMainDTO>(UpdateUserMainDTO);
    });

  describe('UserManageController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

});

