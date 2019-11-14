import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch, Param, HttpService, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from "@nestjs/swagger";
import { SubscriptionService } from "./subscription.service";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateSubscriptionDTO } from "./dto/create-subscription.dto";
import { Response } from 'express';
import { UpdateSubscriptionDTO } from "./dto/update-subscription.dto";
import { SubscriptionDetailService } from "./subscription-detail.service";
import { CustomerInfoDTO, CompanyInfoDTO, CustomerHistoryDTO, NextBillingDateDTO, UsageDTO } from './dto/results-item.dto';
import { getResErr } from '../../common/helper/basic-function';

@Controller('api/admin/subscription')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly subscriptionDetailService: SubscriptionDetailService
  ) { }

  @Get(':item/:subs_id')
  @ApiOperation({ title: 'Get customer details by subscription id', description: 'Get customer details. \nPermission : all' })
  @ApiImplicitParam({ name: 'item', description: 'Item details', enum: ['customer_info', 'company_info', 'customer_history', 'next_billing_date', 'usage'], required: true })
  @ApiImplicitParam({ name: 'subs_id', description: 'Subscription guid', required: true })
  getCustomerDetails(@Param() param, @Res() res) {
    this.subscriptionDetailService.getData([param.subs_id]).subscribe(
      data => {
        let dataRes: CustomerInfoDTO | CompanyInfoDTO | CustomerHistoryDTO | NextBillingDateDTO | UsageDTO;
        dataRes = this.subscriptionDetailService.inputData([param.item, data]);
        res.send(dataRes);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No data', 'Failed to get data'));
      }
    );
  }

  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Get()
  @ApiOperation({ title: 'Get all subscription', description: 'Get all subscription in local db. \nPermission : superadmin, salesperson, support' })
  findAllSubscription(@Res() res: Response) {

    this.subscriptionService.getSubscription().subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No subscription found', 'Failed to retrieve subscription list'));
      }
    );

  }

  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Post()
  @ApiOperation({ title: 'Create subscription', description: 'Create subscription in local db. \nPermission : superadmin, salesperson, support' })
  createSubscription(@Body() subscriptionData: CreateSubscriptionDTO, @Req() req, @Res() res: Response) {

    // process create new subscription
    this.subscriptionService.createSubscription([subscriptionData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    );

  }

  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Patch()
  @ApiOperation({ title: 'Update subscription', description: 'Update a subscription in local db. \nPermission : superadmin, salesperson, support' })
  updateSubscription(@Body() updateSubscriptionData: UpdateSubscriptionDTO, @Req() req, @Res() res: Response) {

    this.subscriptionService.updateSubscription([updateSubscriptionData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No subscription found', 'Failed to update Subscription'));
      }
    );

  }

}