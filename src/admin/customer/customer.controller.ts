import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";
import { Response } from 'express';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { getResErr } from '../../common/helper/basic-function';

/**
 * Controller customer
 *
 * @export
 * @class CustomerController
 */
@Controller('api/admin/customer')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  /**
   * Get customer list
   *
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Get()
  @ApiOperation({ title: 'Get all user', description: 'Get all user in local db. \nPermission : superadmin, salesperson, support' })
  findAllCustomer(@Res() res: Response) {

    this.customerService.getCustomer().subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No customer found', 'Failed to retrieve customer list'));
      }
    );

  }

  /**
   * Create customer
   *
   * @param {CreateCustomerDTO} customerData
   * @param {*} req
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Post()
  @ApiOperation({ title: 'Sign up new user', description: 'Sign up new user in local db. \nPermission : superadmin, salesperson, support' })
  createCustomer(@Body() customerData: CreateCustomerDTO, @Req() req, @Res() res: Response) {

    // process create new user
    this.customerService.createCustomer([customerData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    );

  }

  /**
   * Update customer
   *
   * @param {UpdateCustomerDTO} updateCustomerData
   * @param {*} req
   * @param {Response} res
   * @memberof CustomerController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Patch()
  @ApiOperation({ title: 'Update user', description: 'Update a user in local db. \nPermission : superadmin, salesperson, support' })
  updateCustomer(@Body() updateCustomerData: UpdateCustomerDTO, @Req() req, @Res() res: Response) {

    this.customerService.updateCustomer([updateCustomerData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No customer found', 'Failed to update customer'));
      }
    );

  }

}