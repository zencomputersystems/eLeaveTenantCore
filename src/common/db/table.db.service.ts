import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "../base/base-db.service";
import { QueryParserService } from "../helper/query-parser.service";

/**
 * DB table : tenant view role : t_view_role
 *
 * @export
 * @class RoleDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class RoleDbService extends BaseDBService {
  /**
   *Creates an instance of RoleDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof RoleDbService
   */
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "t_view_role") }
}



/**
 * DB table : user main tenant : user_main_tenant
 *
 * @export
 * @class UserDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserDbService extends BaseDBService {
  /**
   * Declare table
   *
   * @memberof UserDbService
   */
  public tableDB = 'user_main_tenant';
  /**
   *Creates an instance of UserDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof UserDbService
   */
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "user_main_tenant") }
}



/**
 * DB table : tenant customer : tenant_customer
 *
 * @export
 * @class CustomerDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class CustomerDbService extends BaseDBService {
  /**
   *Creates an instance of CustomerDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof CustomerDbService
   */
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "tenant_customer") }
}



/**
 * DB table : tenant subscription : tenant_subscription
 *
 * @export
 * @class SubscriptionDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class SubscriptionDbService extends BaseDBService {
  /**
   *Creates an instance of SubscriptionDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof SubscriptionDbService
   */
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "tenant_subscription") }
}

/**
 * DB table : tenant history activity : tenant_activity_log
 *
 * @export
 * @class ActivityLogDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class ActivityLogDbService extends BaseDBService {
  /**
   *Creates an instance of ActivityLogDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof ActivityLogDbService
   */
  constructor(public readonly httpService: HttpService, public readonly queryService: QueryParserService) { super(httpService, queryService, "tenant_activity_log") }
}