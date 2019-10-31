import { Module } from "@nestjs/common";
import { QueryParserService } from "../../common/helper/query-parser.service";
import { CustomerService } from "../../admin/customer/customer.service";
import { CustomerDbService } from "../../common/db/table.db.service";
import { CustomerController } from "./customer.controller";
import { getModuleHttp } from "../../common/helper/basic-function";

@Module({
  providers: [
    QueryParserService,
    CustomerService,
    CustomerDbService
  ],
  controllers: [
    CustomerController
  ],
  imports: [
    getModuleHttp()
  ]
})
export class CustomerModule { }