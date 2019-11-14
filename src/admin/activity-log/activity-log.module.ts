import { Module } from '@nestjs/common';
import { getModuleHttp } from '../../common/helper/basic-function';
import { ActivityLogController } from './activity-log.controller';
import { ActivityLogDbService } from '../../common/db/table.db.service';
import { ActivityLogService } from './activity-log.service';
import { QueryParserService } from '../../common/helper/query-parser.service';

@Module({
  providers: [
    QueryParserService,
    ActivityLogService,
    ActivityLogDbService
  ],
  controllers: [
    ActivityLogController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class ActivityLogModule { }