import { Module } from "@nestjs/common";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { SubscriptionService } from './subscription.service';
import { SubscriptionDbService } from "../../common/db/table.db.service";
import { SubscriptionController } from "./subscription.controller";
import { getModuleHttp } from "../../common/helper/basic-function";
import { SubscriptionDetailService } from "./subscription-detail.service";

@Module({
  providers: [
    QueryParserService,
    SubscriptionService,
    SubscriptionDbService,
    SubscriptionDetailService
  ],
  controllers: [
    SubscriptionController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class SubscriptionModule { }