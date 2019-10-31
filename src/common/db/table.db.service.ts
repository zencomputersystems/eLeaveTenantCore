import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "../base/base-db.service";
import { QueryParserService } from "../helper/query-parser.service";

@Injectable()
export class RoleDbService extends BaseDBService {
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "t_view_role") }
}

@Injectable()
export class UserDbService extends BaseDBService {
  public tableDB = 'user_main_tenant';
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "user_main_tenant") }
}

@Injectable()
export class CustomerDbService extends BaseDBService {
  public tableDB = 'tenant_customer';
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "tenant_customer") }
}

@Injectable()
export class SubscriptionDbService extends BaseDBService {
  public tableDB = 'tenant_subscription';
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "tenant_subscription") }
}