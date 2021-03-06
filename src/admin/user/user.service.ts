import { Injectable } from '@nestjs/common';
import { SignupDTO } from "../../auth/dto/signup.dto";
import { v1 } from 'uuid';
import { Resource } from "../../common/model/resource.model";
import { UserDbService } from '../../common/db/table.db.service';
import { UserMainModel } from '../../common/model/user-main.model';
import { UpdateUserMainDTO } from '../user-manage/dto/update-user-main.dto';
import { setUpdateData } from '../../common/helper/basic-function';

/**
 * Service for user
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

  /**
   *Creates an instance of UserService.
   * @param {UserDbService} userDbService DB service for user
   * @memberof UserService
   */
  constructor(public readonly userDbService: UserDbService) { }

  /**
   * Sign up process
   *
   * @param {[SignupDTO, string, UserMainModel]} [signupData, cipherPassword, req]
   * @returns
   * @memberof UserService
   */
  public signUpUserAdmin([signupData, cipherPassword, req]: [SignupDTO, string, UserMainModel]) {

    const data = new UserMainModel();

    data.USER_GUID = v1();
    data.LOGIN_ID = signupData.loginId;
    data.PASSWORD = cipherPassword;
    data.EMAIL = signupData.email;
    data.FULLNAME = signupData.name;
    data.ROLE = signupData.role;
    data.ACTIVATION_FLAG = 1;
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.userDbService.createByModel([resource, [], [], []]);

  }

  /**
   * Update user main
   *
   * @param {[UpdateUserMainDTO, UserMainModel]} [updateUserMainData, req]
   * @returns
   * @memberof UserService
   */
  public updateUserMain([updateUserMainData, req]: [UpdateUserMainDTO, UserMainModel]) {
    const data = new UserMainModel();

    data.USER_GUID = updateUserMainData.userId;
    data.EMAIL = updateUserMainData.email;
    data.FULLNAME = updateUserMainData.fullname;
    data.ROLE = updateUserMainData.role;
    data.ACTIVATION_FLAG = updateUserMainData.status;
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.userDbService.updateByModel([resource, [], [], []]);
  }

  /**
   * Find one data
   *
   * @param {string} loginId
   * @param {string} password
   * @returns {Promise<any>}
   * @memberof UserService
   */
  public async findOne(loginId: string, password: string): Promise<any> {
    const fields = ['USER_GUID', 'LOGIN_ID', 'PASSWORD', 'EMAIL', 'FULLNAME', 'ROLE', 'ACTIVATION_FLAG'];
    const filters = ['(LOGIN_ID=' + loginId + ')'];

    const url = this.userDbService.queryService.generateDbQuery([this.userDbService.tableDB, fields, filters]);
    return this.userDbService.httpService.get(url).toPromise();

  }

  /**
   * Find one data by payload JWT
   *
   * @param {*} payload
   * @returns {Promise<any>}
   * @memberof UserService
   */
  public async findOneByPayload(payload): Promise<any> {
    const fields = ['USER_GUID', 'LOGIN_ID', 'PASSWORD', 'EMAIL', 'FULLNAME', 'ROLE', 'ACTIVATION_FLAG'];
    const filters = ['(EMAIL=' + payload.email + ')', '(USER_GUID=' + payload.userId + ')', '(LOGIN_ID=' + payload.loginId + ')']

    const url = this.userDbService.queryService.generateDbQuery([this.userDbService.tableDB, fields, filters]);
    return this.userDbService.httpService.get(url).toPromise();
  }

}