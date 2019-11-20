import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { UserMainModel } from '../../common/model/user-main.model';
import { UpdateUserMainDTO } from './dto/update-user-main.dto';

/**
 * Service for user manage
 *
 * @export
 * @class UserManageService
 */
@Injectable()
export class UserManageService {
  /**
   *Creates an instance of UserManageService.
   * @param {UserService} userService User service
   * @memberof UserManageService
   */
  constructor(private readonly userService: UserService) { }

  // sign up new user for local database
  /**
   * Sign up user
   *
   * @param {[SignupDTO, string, UserMainModel]} [signupData, cipherPassword, req]
   * @returns
   * @memberof UserManageService
   */
  public signupUser([signupData, cipherPassword, req]: [SignupDTO, string, UserMainModel]) {
    return this.userService.signUpUserAdmin([signupData, cipherPassword, req]);
  }

  /**
   * Update user main
   *
   * @param {[UpdateUserMainDTO, UserMainModel]} [UpdateUserMainDTO, req]
   * @returns
   * @memberof UserManageService
   */
  public updateUserMain([UpdateUserMainDTO, req]: [UpdateUserMainDTO, UserMainModel]) {
    return this.userService.updateUserMain([UpdateUserMainDTO, req]);
  }

  /**
   *  Get admin user
   *
   * @param {string} role
   * @returns
   * @memberof UserManageService
   */
  public getAdminUser(role: string) {
    const field = ['USER_GUID', 'EMAIL', 'FULLNAME', 'ROLE', 'ACTIVATION_FLAG'];
    let filter = ['(ROLE=' + role + ')'];
    filter = role == 'all' ? [] : filter;
    return this.userService.userDbService.findByFilterV4([field, filter, null, null, null, [], null]);
  }
}