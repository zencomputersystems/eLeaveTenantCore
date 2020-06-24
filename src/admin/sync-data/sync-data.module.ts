import { getModuleHttp } from "../../common/helper/basic-function";
import { SyncDataService } from "./sync-data.service";
import { Module } from "@nestjs/common";
import { SyncDataController } from "./sync-data.controller";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { CustomerDbService, SubscriptionDbService, UsereLeaveDbService, UserInfoDbService } from "../../common/db/table.db.service";
import { EmailNodemailerService } from "../../common/helper/email-nodemailer.service";

@Module({
  providers: [
    QueryParserService,
    SyncDataService,
    CustomerDbService,
    SubscriptionDbService,
    UsereLeaveDbService,
    UserInfoDbService,
    EmailNodemailerService
  ],
  controllers: [
    SyncDataController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class SyncDataModule { }