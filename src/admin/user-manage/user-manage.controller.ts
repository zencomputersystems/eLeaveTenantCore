import { Controller, UseGuards, Get, Req, Res, Post, Body, ConflictException, Logger, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitQuery } from "@nestjs/swagger";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { UserManageService } from "./user-manage.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { decryptProcess, encryptProcess, verifyParam } from "../../common/helper/basic-function";
import { Response } from 'express';

@Controller('api/admin/user-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserManageController {

  constructor(private readonly userManageService: UserManageService) { }

  @UseGuards(RolesGuard)
  @Roles('salesperson', 'superadmin')
  @Get(':role')
  @ApiOperation({ title: 'Get user by role', description: 'Get user list by specify role. \nPermission : superadmin, salesperson' })
  @ApiImplicitQuery({ name: 'role', description: 'Role to filter', required: true, enum: ['salesperson', 'superadmin', 'support'] })
  getUserAdmin(@Param('role') role, @Req() req, @Res() res) {
    //get parameter data from link or parameter extension (admin/user-manage/salesperson) || (admin/user-manage/{role}?role=salesperson)
    let roleData = verifyParam([req, 'role', role]);

    this.userManageService.getAdminUser(roleData).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(err);
      }
    );
  }

  @UseGuards(RolesGuard)
  @Roles('superadmin')
  @Post('sign-up')
  @ApiOperation({ title: 'Sign up new user', description: 'Sign up new user in local db. \nPermission : superadmin' })
  signup(@Body() signupData: SignupDTO, @Req() req, @Res() res: Response) {
    // decrypt password
    var plainPassword = decryptProcess([signupData.password, 'secret key 122']);
    // encrypt by dynamic key
    var cipherPassword = encryptProcess([plainPassword, signupData.email]);
    // process signup
    this.userManageService.signupUser([signupData, cipherPassword, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(new ConflictException('Duplicate entry', 'Failed to create user'));
      }
    );

  }

}