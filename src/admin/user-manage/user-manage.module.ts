import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';
import { Module, HttpModule } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { QueryParserService } from '../../common/helper/query-parser.service';
import { DreamFactory } from '../../config/dreamfactory';
import { UserDbService } from '../../common/db/table.db.service';

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
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ]
})
export class UserManagerModule { }