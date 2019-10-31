import { Injectable, UnauthorizedException } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { UserService } from '../admin/user/user.service';
import { decryptProcess } from '../common/helper/basic-function';
import { UserMainModel } from '../common/model/user-main.model';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  public async createToken(signedUser: UserMainModel) {
    // 3300(55m) 28800(8h) 600(10m)
    const expiresIn = 28800, secretOrKey = 'this_is_secret';
    const user = {
      loginId: signedUser.LOGIN_ID,
      email: signedUser.EMAIL,
      userId: signedUser.USER_GUID,
      fullname: signedUser.FULLNAME,
      role: signedUser.ROLE
    };
    return {
      status: signedUser.ACTIVATION_FLAG,
      role: signedUser.ROLE,
      expires_in: expiresIn,
      access_token: await sign(user, secretOrKey, { expiresIn })
    }
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
  }

  public async logIn(loginId, password) {

    return await this.userService.findOne(loginId, password)
      .then(async user => {

        let userData: UserMainModel = user.data.resource[0];

        let dbPassword = null;

        dbPassword = userData ? decryptProcess([userData.PASSWORD, userData.LOGIN_ID]) : null;

        return (password === dbPassword && dbPassword != null)
          ? Promise.resolve(userData)
          : Promise.reject(new UnauthorizedException('Invalid Credential'))

      })
  }

}