import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";
import { Response } from 'express';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('api/admin/customer')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }
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
        res.send(new ConflictException('Duplicate entry', 'Failed to create user'));
      }
    );

  }

  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Get()
  @ApiOperation({ title: 'Get all user', description: 'Get all user in local db. \nPermission : superadmin, salesperson, support' })
  findAllCustomer(@Res() res: Response) {

    this.customerService.getCustomer().subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(new NotFoundException('No customer found', 'Failed to retrieve customer list'));
      }
    );

  }

  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Patch()
  @ApiOperation({ title: 'Update user', description: 'Update a user in local db. \nPermission : superadmin, salesperson, support' })
  updateCustomer(@Body() updateCustomerData: UpdateCustomerDTO, @Req() req, @Res() res: Response) {

    this.customerService.updateCustomer([updateCustomerData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.send(new NotFoundException('No customer found', 'Failed to update customer'));
      }
    );

  }

}