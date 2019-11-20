import { Controller, UseGuards, Get, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RoleService } from './role.service';
import { Response } from 'express';

/**
 * Controller for role
 *
 * @export
 * @class RoleController
 */
@Controller('api/admin/role')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RoleController {
  /**
   *Creates an instance of RoleController.
   * @param {RoleService} roleService Service for role
   * @memberof RoleController
   */
  constructor(private readonly roleService: RoleService) { }
  /**
   * Get role list
   *
   * @param {Response} res
   * @memberof RoleController
   */
  @Get()
  @ApiOperation({ title: 'Get all role', description: 'Get list of role. \nPermission : all' })
  getRoleList(@Res() res: Response) {
    this.roleService.getRole().subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No data found', 'Failed to get data'));
      }
    );
  }
}