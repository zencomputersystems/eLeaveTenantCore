import { Controller, Param, Post, Req, Res } from "@nestjs/common";
import { ApiImplicitParam, ApiOperation } from "@nestjs/swagger";
import { ResyncSubscriptionService } from "./resync.service";

@Controller('resync-subscription')
export class ResyncSubscriptionController {
  constructor(private readonly resyncSubscriptionService: ResyncSubscriptionService) { }
  @Post(':customer_id')
  @ApiOperation({ title: 'Resync Subscription' })
  @ApiImplicitParam({ name: 'customer_id', description: 'Customer id' })
  async resyncSubscription(@Param() param, @Res() res) {
    let data = 'my data';
    (await this.resyncSubscriptionService.resyncSubscription([param.customer_id])).subscribe(
      data => { res.send(data); },
      err => { res.send(err); }
    )
  }

  @Post()
  @ApiOperation({ title: 'Resync Subscription Hook' })
  @ApiImplicitParam({ name: 'customer_id', description: 'Customer id' })
  async resyncSubscriptionHook(@Req() req, @Res() res) {
    const payloadData = req.body;
    const customerId = payloadData.customer_id;
    console.log(customerId);
    (await this.resyncSubscriptionService.resyncSubscription([customerId])).subscribe(
      data => { res.send(data); },
      err => { res.send(err); }
    )
  }


}