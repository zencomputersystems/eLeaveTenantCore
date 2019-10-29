import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';
import { Module, HttpModule } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { QueryParserService } from '../../common/helper/query-parser.service';
import { DreamFactory } from '../../config/dreamfactory';
import { UserDbService } from '../../common/db/table.db.service';
import { getModuleHttp } from '../../common/helper/basic-function';

@Module({
  providers: [
    QueryParserService,
    UserManageService,
    UserService,
    UserDbService
  ],
  controllers: [
    UserManageController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class UserManagerModule { }