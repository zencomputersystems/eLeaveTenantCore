import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { UserMainModel } from '../../common/model/user-main.model';

@Injectable()
export class UserManageService {
  constructor(private readonly userService: UserService) { }

  // sign up new user for local database
  public signupUser([signupData, cipherPassword, req]: [SignupDTO, string, UserMainModel]) {
    return this.userService.signUpUserAdmin([signupData, cipherPassword, req]);
  }

  public getAdminUser(role: string) {
    const field = [];
    const filter = ['(ROLE=' + role + ')'];
    return this.userService.userDbService.findByFilterV4([field, filter, null, null]);
  }
}