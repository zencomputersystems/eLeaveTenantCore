import { Controller, UseGuards, Get, Req, Res, Post, Body, ConflictException, Logger, Param, NotFoundException, Patch } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { UserManageService } from "./user-manage.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { encryptProcess } from "../../common/helper/basic-function";
import { Response } from 'express';
import { UpdateUserMainDTO } from './dto/update-user-main.dto';

@Controller('api/admin/user-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserManageController {

  constructor(private readonly userManageService: UserManageService) { }

  @UseGuards(RolesGuard)
  @Roles('salesperson', 'superadmin')
  @Get(':role')
  @ApiOperation({ title: 'Get user by role', description: 'Get user list by specify role. \nPermission : superadmin, salesperson' })
  @ApiImplicitParam({ name: 'role', description: 'Role to filter', required: true, enum: ['all', 'salesperson', 'superadmin', 'support'] })
  getUserAdmin(@Param('role') roleData, @Res() res) {
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

    // encrypt sha256 by dynamic key
    var cipherPassword = encryptProcess([signupData.password, signupData.loginId]);

    // process signup
    this.userManageService.signupUser([signupData, cipherPassword, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(new ConflictException('Duplicate entry', 'Failed to create user'));
      }
    );

  }

  @Patch('user-main')
  @ApiOperation({ title: 'Update user details', description: 'Update user main details. \nPermission : all' })
  updateUserMain(@Body() updateUserMainDto: UpdateUserMainDTO, @Req() req, @Res() res: Response) {
    this.userManageService.updateUserMain([updateUserMainDto, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(new NotFoundException('Data not found', 'Failed to update'));
      }
    );
  }

}