import { Module, HttpModule } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleDbService } from "../../common/db/table.db.service";
import { DreamFactory } from "../../config/dreamfactory";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { getModuleHttp } from "../../common/helper/basic-function";

@Module({
  providers: [
    QueryParserService,
    RoleService,
    RoleDbService
  ],
  controllers: [
    RoleController
  ],
  imports: [
    getModuleHttp()
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ]
})
export class RoleModule { }