import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { SignupDTO } from "./dto/signup.dto";
import { of } from "rxjs";
import { UserService } from '../admin/user/user.service';
import { UserModel } from "src/admin/user/model/user.model";
import { decryptProcess } from '../common/helper/basic-function';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  // sign up new user for local database
  public signupUser([signupData, cipherPassword]: [SignupDTO, string]) {
    // Logger.log(signupData, 'sign up process');
    return this.userService.signUpUserAdmin([signupData, cipherPassword]);
    // return of(cipherPassword);
  }

  public async createToken(signedUser: UserModel) {
    // 3300(55m) 28800(8h) 600(10m)
    // Logger.log(signedUser.EMAIL + ' - ' + signedUser.USER_GUID + ' - ' + signedUser.ROLE, 'data');
    const expiresIn = 120, secretOrKey = 'this_is_secret';
    const user = {
      loginId: signedUser.LOGIN_ID,
      email: signedUser.EMAIL,
      userId: signedUser.USER_GUID,
      fullname: signedUser.FULLNAME,
      role: signedUser.ROLE
    };
    return {
      expires_in: expiresIn,
      access_token: await sign(user, secretOrKey, { expiresIn })
    }
  }

  public async adLogin(data) {

    // return await this.userService.findByFilterV2([], ['(LOGIN_ID=' + data._json.userPrincipalName + ')']).toPromise()
    //   .then(async user => {

    //     return (user.length > 0)
    //       ? Promise.resolve(user[0])
    //       : Promise.reject(new UnauthorizedException('Invalid Credential'))
    //   })
    // return data;
    return (data)
      ? Promise.resolve(data)
      : Promise.reject(new UnauthorizedException('Invalid Credential'))
  }

  /**
   * Verify the JWT token data
   *
   * @param {*} payload
   * @returns
   * @memberof AuthService
   */
  public async verify(payload) {
    return await this.userService.findOneByPayload(payload)
      .then(async user => {
        return (user.data.resource.length > 0)
          ? Promise.resolve(user.data.resource[0])
          : Promise.reject(new UnauthorizedException('Invalid Authorization'))
      })

    // return (payload)
    //   ? Promise.resolve(payload)
    //   : Promise.reject(new UnauthorizedException('Invalid Credential'))

  }

  public async localLogin(data) {

    // return await this.userService.findByFilterV2([], ['(LOGIN_ID=' + data._json.userPrincipalName + ')']).toPromise()
    //   .then(async user => {

    //     return (user.length > 0)
    //       ? Promise.resolve(user[0])
    //       : Promise.reject(new UnauthorizedException('Invalid Credential'))
    //   })
    // return data;
    return (data)
      ? Promise.resolve(data)
      : Promise.reject(new UnauthorizedException('Invalid Credential'))
  }

  public async logIn(email, password) {
    // Logger.log('in login', 'authservice');
    return await this.userService.findOne(email, password)
      .then(async user => {
        // Logger.log(user.data.resource[0], 'data-user');

        let userData: UserModel = user.data.resource[0];

        let dbPassword = null;
        let inputPassword = decryptProcess([password, 'secret key 122']);

        dbPassword = userData ? decryptProcess([userData.PASSWORD, userData.LOGIN_ID]) : null;

        // Logger.log(dbPassword, 'dbPassword');
        // Logger.log(inputPassword, 'inputPassword');
        return (inputPassword === dbPassword && dbPassword != null)
          ? Promise.resolve(userData)
          : Promise.reject(new UnauthorizedException('Invalid Credential'))
      })
  }

}