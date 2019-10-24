import { Module, HttpModule } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleDbService } from "../../common/db/role.db.service";
import { DreamFactory } from "../../config/dreamfactory";
import { QueryParserService } from "../../common/helper/query-parser.service";

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
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ]
})
export class RoleModule { }