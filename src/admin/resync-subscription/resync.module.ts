import { Module } from "@nestjs/common";
import { ResyncSubscriptionController } from './resync.controller';
import { ResyncSubscriptionService } from "./resync.service";
import { getModuleHttp } from '../../common/helper/basic-function';
import { CustomerDbService, SubscriptionDbService } from "../../common/db/table.db.service";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { SubscriptionService } from "../subscription/subscription.service";

@Module({
  providers: [
    ResyncSubscriptionService,
    SubscriptionDbService,
    QueryParserService,
    CustomerDbService
  ],
  controllers: [ResyncSubscriptionController],
  imports: [getModuleHttp()]
})
export class ResyncSubscriptionModule { }