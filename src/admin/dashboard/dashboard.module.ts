import { Module } from "@nestjs/common";
import { getModuleHttp } from "../../common/helper/basic-function";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { StatisticDbService } from "../../common/db/table.db.service";
import { QueryParserService } from '../../common/helper/query-parser.service';

@Module({
  providers: [
    QueryParserService,
    DashboardService,
    StatisticDbService
  ],
  controllers: [
    DashboardController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class DashboardModule { }