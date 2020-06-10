import { Module } from "@nestjs/common";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { SubscriptionService } from './subscription.service';
import { SubscriptionDbService, UsereLeaveDbService, CustomerDbService } from "../../common/db/table.db.service";
import { SubscriptionController } from "./subscription.controller";
import { getModuleHttp } from "../../common/helper/basic-function";
import { SubscriptionDetailService } from "./subscription-detail.service";
import { EmailNodemailerService } from "../../common/helper/email-nodemailer.service";

@Module({
  providers: [
    QueryParserService,
    SubscriptionService,
    SubscriptionDbService,
    SubscriptionDetailService,
    UsereLeaveDbService,
    CustomerDbService,
    EmailNodemailerService
  ],
  controllers: [
    SubscriptionController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class SubscriptionModule { }