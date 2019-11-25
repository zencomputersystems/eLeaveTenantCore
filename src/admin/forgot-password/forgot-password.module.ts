import { ForgotPasswordController } from "./forgot-password.controller";
import { getModuleHttp } from "../../common/helper/basic-function";
import { Module } from "@nestjs/common";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { ForgotPasswordService } from "./forgot-password.service";
import { UserDbService } from "../../common/db/table.db.service";

@Module({
  providers: [
    QueryParserService,
    ForgotPasswordService,
    UserDbService
  ],
  controllers: [
    ForgotPasswordController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class ForgotPasswordModule { }