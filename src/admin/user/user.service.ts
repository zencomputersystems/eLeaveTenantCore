import { Injectable, HttpService, Logger } from '@nestjs/common';
import { BaseDBService } from "../../common/base/base-db.service";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { v1 } from 'uuid';
import { UserModel } from "./model/user.model";
import { Resource } from "../../common/model/resource.model";

@Injectable()
export class UserService extends BaseDBService {

  /**
   * Declare tablename user main
   *
   * @private
   * @memberof UserService
   */
  private table_name = 'user_main_tenant';
  /**
   *Creates an instance of UserService.
   * @param {HttpService} httpService Service for http
   * @param {QueryParserService} queryService Service for query
   * @memberof UserService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "user_main_tenant")
  }

  public signUpUserAdmin([signupData, cipherPassword]: [SignupDTO, string]) {

    const data = new UserModel();

    data.USER_GUID = v1();
    data.LOGIN_ID = signupData.email;
    data.PASSWORD = cipherPassword;
    data.EMAIL = signupData.email;
    data.FULLNAME = signupData.name;
    data.ROLE = signupData.role;
    data.ACTIVATION_FLAG = 1;
    // data.CREATION_USER_GUID : string;
    // data.CREATION_TS: string;
    // data.UPDATE_USER_GUID: string;
    // data.UPDATE_TS: string;
    // data.DELETED_AT: string;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.createByModel(resource, [], [], []);

  }

  // public verifyUserExist(dataValidate: string) {
  //   const fields = ['USER_GUID'];
  //   const filters = ['(EMAIL=' + dataValidate + ')'];

  //   const url = this.queryService.generateDbQuery(this.table_name, fields, filters);
  //   return this.httpService.get(url).toPromise();
  // }

  /**
     * Find single user
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     * @memberof UserService
     */
  public async findOne(email: string, password: string): Promise<any> {
    // Logger.log(email + ' - ' + password);
    // const fields = ['USER_GUID', 'EMAIL', 'PASSWORD'];
    const fields = ['USER_GUID', 'LOGIN_ID', 'PASSWORD', 'EMAIL', 'FULLNAME', 'ROLE', 'ACTIVATION_FLAG'];
    //const filters = ['(EMAIL='+email+')','(PASSWORD='+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+')'];
    const filters = ['(LOGIN_ID=' + email + ')'];

    // console.log(filters);

    const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

    //call DF to validate the user
    return this.httpService.get(url).toPromise();

  }

  public async findOneByPayload(payload): Promise<any> {
    const fields = ['USER_GUID', 'LOGIN_ID', 'PASSWORD', 'EMAIL', 'FULLNAME', 'ROLE', 'ACTIVATION_FLAG'];
    const filters = ['(EMAIL=' + payload.email + ')', '(USER_GUID=' + payload.userId + ')', '(LOGIN_ID=' + payload.loginId + ')']

    const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

    //call DF to validate the user
    return this.httpService.get(url).toPromise();
  }

}