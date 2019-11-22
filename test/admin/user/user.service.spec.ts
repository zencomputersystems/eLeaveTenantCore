import { Test } from '@nestjs/testing';
import { Resource } from '../../../src/common/model/resource.model';
import { UserService } from '../../../src/admin/User/User.service';
import { UserDbService } from '../../../src/common/db/table.db.service';
import { UserMainModel } from '../../../src/common/model/user-main.model';
import { SignupDTO } from '../../../src/auth/dto/signup.dto';
import { UpdateUserMainDTO } from '../../../src/admin/user-manage/dto/update-user-main.dto';
// No test function
describe('UserService', () => {
  let Service: UserService;
  let DBService: UserDbService;
  let CreateData: SignupDTO;
  let UpdateData: UpdateUserMainDTO;
  let UserMainModelData: UserMainModel;

  beforeEach(
    async () => {

      const UserServiceStub = {
        signUpUserAdmin: ([signupData, cipherPassword, req]: [SignupDTO, string, UserMainModel]) => ({
        }),

        updateUserMain: ([updateUserMainData, req]: [UpdateUserMainDTO, UserMainModel]) => ({
        }),

        findOne: (loginId: string, password: string) => ({
        }),

        findOneByPayload: (payload) => ({
        })

      };

      const UserDBServiceStub = {
        createByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        }),

        updateByModel: ([resource, fields, filters, idFields]: [Resource, string[], string[], string[]]) => ({
        })

      }

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
            provide: UserService,
            useValue: UserServiceStub
          },
          {
            provide: UserDbService,
            useValue: UserDBServiceStub
          },
          {
            provide: SignupDTO,
            useValue: SignupDTOStub
          },
          {
            provide: UpdateUserMainDTO,
            useValue: UpdateUserMainDTOStub
          },
          {
            provide: UserMainModel,
            useValue: UserMainModelStub
          }

        ]
      }).compile();

      Service = module.get<UserService>(UserService);
      DBService = module.get<UserDbService>(UserDbService);
      CreateData = module.get<SignupDTO>(SignupDTO);
      UpdateData = module.get<UpdateUserMainDTO>(UpdateUserMainDTO);
      UserMainModelData = module.get<UserMainModel>(UserMainModel);;
    });


  describe('UserService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

});

