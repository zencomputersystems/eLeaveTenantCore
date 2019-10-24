import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { UserModel } from '../user/model/user.model';

@Injectable()
export class UserManageService {
  constructor(private readonly userService: UserService) { }

  // sign up new user for local database
  public signupUser([signupData, cipherPassword, req]: [SignupDTO, string, UserModel]) {
    return this.userService.signUpUserAdmin([signupData, cipherPassword, req]);
  }

  public getAdminUser(role: string) {
    const field = [];
    const filter = ['(ROLE=' + role + ')'];
    return this.userService.findByFilterV4([field, filter, null, null]);
  }
}