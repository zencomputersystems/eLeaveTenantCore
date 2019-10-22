import { Injectable, UnauthorizedException } from "@nestjs/common";
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

  public async createToken(signedUser) {
    // 3300(55m) 28800(8h) 600(10m)
    console.log(signedUser.EMAIL + ' - ' + signedUser.USER_GUID + ' - ' + signedUser.TENANT_GUID);
    const expiresIn = 120, secretOrKey = 'this_is_secret';
    const user = {
      email: signedUser.EMAIL,
      userId: signedUser.USER_GUID,
      tenantId: signedUser.TENANT_GUID
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
    // return await this.userService.findOneByPayload(payload)
    //   .then(async user => {
    //     return (user.data.resource.length > 0)
    //       ? Promise.resolve(user.data.resource[0])
    //       : Promise.reject(new UnauthorizedException('Invalid Authorization'))
    //   })

    return (payload)
      ? Promise.resolve(payload)
      : Promise.reject(new UnauthorizedException('Invalid Credential'))

  }

}