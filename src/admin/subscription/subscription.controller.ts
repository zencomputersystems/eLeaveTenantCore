import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch, Param, HttpService, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from "@nestjs/swagger";
import { SubscriptionService } from "./subscription.service";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateSubscriptionDTO } from './dto/create-subscription.dto';
import { Response } from 'express';
import { UpdateSubscriptionDTO } from "./dto/update-subscription.dto";
import { SubscriptionDetailService } from "./subscription-detail.service";
import { CustomerInfoDTO, CompanyInfoDTO, CustomerHistoryDTO, NextBillingDateDTO, UsageDTO } from './dto/results-item.dto';
import { getResErr } from '../../common/helper/basic-function';
import { SubscriptionDbService } from '../../common/db/table.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { hostURLSubscription } from '../../constant/commonUsed';
import { Resource } from '../../common/model/resource.model';
import { CustomerModel } from '../../common/model/customer.model';
import { v1 } from 'uuid';

/**
 * Controller for subscription
 *
 * @export
 * @class SubscriptionController
 */
@Controller('api/admin/subscription')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
export class SubscriptionController {
  /**
   *Creates an instance of SubscriptionController.
   * @param {SubscriptionService} subscriptionService Service for subscription
   * @param {SubscriptionDetailService} subscriptionDetailService DB Service for subscription
   * @memberof SubscriptionController
   */
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly subscriptionDetailService: SubscriptionDetailService
  ) { }

  @Post('testsync')
  @ApiOperation({ title: 'Test sync' })
  testSync(@Res() res) {
    let resource = new Resource(new Array());
    let data = new CustomerModel;
    data.CUSTOMER_GUID = v1();
    resource.resource.push(data);

    this.subscriptionService.customerDbService.createByModel([resource, [], [], []]).subscribe(
      data => { res.send(data.data.resource); },
      err => { res.send(err); }
    );
  }

  /**
   * Get customer details
   *
   * @param {*} param
   * @param {*} res
   * @memberof SubscriptionController
   */
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

  /**
   * Find all subscription
   *
   * @param {Response} res
   * @memberof SubscriptionController
   */
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

  /**
   * Create subscription
   *
   * @param {CreateSubscriptionDTO} subscriptionData
   * @param {*} req
   * @param {Response} res
   * @memberof SubscriptionController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Post()
  @ApiOperation({ title: 'Create subscription', description: 'Create subscription in local db. \nPermission : superadmin, salesperson, support' })
  createSubscription(@Body() subscriptionData: CreateSubscriptionDTO, @Req() req, @Res() res: Response) {

    this.subscriptionService.createSubscription([subscriptionData, req.user]).pipe(
      map(res => {
        this.subscriptionService.createSubscriptionWoocommerce([subscriptionData]);
        return res;
      }), map(res => {
        this.subscriptionService.createUsereLeave([subscriptionData, res.data.resource]);
        return res;
      }), map(res => {
        this.subscriptionService.createDefaultProfile([subscriptionData, res.data.resource]);
        return res;
      })
    ).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    )

    // // process create new subscription
    // this.subscriptionService.createSubscription([subscriptionData, req.user]).subscribe(
    //   data => {
    //     this.subscriptionService.createSubscriptionWoocommerce([subscriptionData]);
    //     this.subscriptionService.createUsereLeave([subscriptionData, data.data.resource]);
    //     this.subscriptionService.createDefaultProfile([subscriptionData, data.data.resource]);
    //     res.send(data.data.resource);
    //   }, err => {
    //     res.status(HttpStatus.CONFLICT).send(getResErr(err));
    //   }
    // );

  }

  /**
   * Update subscription
   *
   * @param {UpdateSubscriptionDTO} updateSubscriptionData
   * @param {*} req
   * @param {Response} res
   * @memberof SubscriptionController
   */
  @UseGuards(RolesGuard)
  @Roles('superadmin', 'salesperson', 'support')
  @Patch()
  @ApiOperation({ title: 'Update subscription', description: 'Update a subscription in local db. \nPermission : superadmin, salesperson, support' })
  updateSubscription(@Body() updateSubscriptionData: UpdateSubscriptionDTO, @Req() req, @Res() res: Response) {

    this.subscriptionService.updateSubscription([updateSubscriptionData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('Invalid filters', 'Failed to update Subscription'));
      }
    );

  }

  // @Get('coupon')
  // @ApiOperation({ title: 'Get coupon' })
  // getCoupon(@Res() res) {
  //   let method = hostURLSubscription + '/coupons';
  //   this.subscriptionService.subscriptionDbService.httpService.get(method)
  //     .subscribe(
  //       data => {
  //         console.log(data.data);
  //         res.send(data.data);
  //       }, err => {
  //         console.log(err);
  //         res.send(err);
  //       })
  // }

  // @Get('customer')
  // @ApiOperation({ title: 'Get customer' })
  // getCustomer(@Res() res) {
  //   let method = hostURLSubscription + '/customers';
  //   this.subscriptionService.subscriptionDbService.httpService.get(method)
  //     .subscribe(
  //       data => {
  //         console.log(data.data);
  //         res.send(data.data);
  //       }, err => {
  //         console.log(err);
  //         res.send(err);
  //       })
  // }

}