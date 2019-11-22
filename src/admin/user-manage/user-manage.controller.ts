import { Controller, UseGuards, Get, Req, Res, Post, Body, ConflictException, Param, NotFoundException, Patch, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { UserManageService } from "./user-manage.service";
import { SignupDTO } from "../../auth/dto/signup.dto";
import { encryptProcess, getResErr } from '../../common/helper/basic-function';
import { Response } from 'express';
import { UpdateUserMainDTO } from './dto/update-user-main.dto';

/**
 * Controller user manager
 *
 * @export
 * @class UserManageController
 */
@Controller('api/admin/user-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserManageController {

  /**
   *Creates an instance of UserManageController.
   * @param {UserManageService} userManageService Service user manager
   * @memberof UserManageController
   */
  constructor(private readonly userManageService: UserManageService) { }

  /**
   * Get user admin
   *
   * @param {*} roleData
   * @param {*} res
   * @memberof UserManageController
   */
  @UseGuards(RolesGuard)
  @Roles('salesperson', 'superadmin')
  @Get('personal-detail')
  @ApiOperation({ title: 'Get user personal detail', description: 'Get user detail' })
  getPersonalDetail(@Req() req, @Res() res) {
    this.userManageService.getAdminUser([null, req.user.USER_GUID]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(err);
      }
    );
  }

  /**
   * Get user admin
   *
   * @param {*} roleData
   * @param {*} res
   * @memberof UserManageController
   */
  @UseGuards(RolesGuard)
  @Roles('salesperson', 'superadmin')
  @Get(':role')
  @ApiOperation({ title: 'Get user by role', description: 'Get user list by specify role. \nPermission : superadmin, salesperson' })
  @ApiImplicitParam({ name: 'role', description: 'Role to filter', required: true, enum: ['all', 'salesperson', 'superadmin', 'support'] })
  getUserAdmin(@Param('role') roleData, @Res() res) {
    this.userManageService.getAdminUser([roleData, null]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(err);
      }
    );
  }

  /**
   * Sign up new user
   *
   * @param {SignupDTO} signupData
   * @param {*} req
   * @param {Response} res
   * @memberof UserManageController
   */
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
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    );

  }

  /**
   * Update user main
   *
   * @param {UpdateUserMainDTO} updateUserMainDto
   * @param {*} req
   * @param {Response} res
   * @memberof UserManageController
   */
  @Patch('user-main')
  @ApiOperation({ title: 'Update user details', description: 'Update user main details. \nPermission : all' })
  updateUserMain(@Body() updateUserMainDto: UpdateUserMainDTO, @Req() req, @Res() res: Response) {
    this.userManageService.updateUserMain([updateUserMainDto, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('Data not found', 'Failed to update'));
      }
    );
  }

}