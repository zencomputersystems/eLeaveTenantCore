import { Controller, UseGuards, Post, Body, Req, Res, ConflictException, Get, NotFoundException, Patch } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SubscriptionService } from "./subscription.service";
import { RolesGuard } from "../../guard/role.guard";
import { Roles } from "../../guard/main.decorator";
import { CreateSubscriptionDTO } from "./dto/create-subscription.dto";
import { Response } from 'express';
import { UpdateSubscriptionDTO } from "./dto/update-subscription.dto";

@Controller('api/admin/subscription')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }
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
        res.send(new ConflictException('Failed to create subscription', 'Data not created'));
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
        res.send(new NotFoundException('No subscription found', 'Failed to retrieve subscription list'));
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
        res.send(new NotFoundException('No subscription found', 'Failed to update Subscription'));
      }
    );

  }

}