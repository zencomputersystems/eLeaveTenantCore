import { Injectable, NotFoundException } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { StatisticDbService } from "../../common/db/table.db.service";
import { map, mergeMap } from "rxjs/operators";
import { DashboardResDTO } from './dto/results-dashboard.dto';

/**
 * Service for dashboard
 *
 * @export
 * @class DashboardService
 */
@Injectable()
export class DashboardService {
  /**
   *Creates an instance of DashboardService.
   * @param {StatisticDbService} statisticDbService DB service for dashboard statistic 
   * @memberof DashboardService
   */
  constructor(private readonly statisticDbService: StatisticDbService) { }
  /**
   * Get dashbiard data
   *
   * @param {[string]} [data]
   * @returns
   * @memberof DashboardService
   */
  public getDashboard([data]: [string]) {
    return this.statisticDbService.findByFilterV4([[], [], null, null, null, [], null]).pipe(mergeMap(res => {
      let results: Observable<any>;

      if (data) {
        results = of(this.assignData([res, data]));
      } else {
        results = of(new NotFoundException('Failed to get data'));
      }
      return results;
    }))
  }

  /**
   * Assign data
   *
   * @param {[any, string]} [data, period]
   * @returns
   * @memberof DashboardService
   */
  public assignData([data, period]: [any, string]) {
    let dataRes = new DashboardResDTO;
    data = data[0];

    dataRes.totalCustomer = data.CUST_TOTAL;
    dataRes.totalActiveCustomer = data.CUST_TOTAL - data.CUST_INACTIVE_TOTAL;
    dataRes.totalInactiveCustomer = data.CUST_INACTIVE_TOTAL;
    dataRes.totalCompany = data.COMP_TOTAL;
    dataRes.totalEmployee = data.EMP_TOTAL;
    if (period != 'all') {
      this.assignDiff([dataRes, data, period]);
    }
    return dataRes;
  }

  /**
   * Assign difference
   *
   * @param {[DashboardResDTO, any, string]} [dataRes, data, period]
   * @memberof DashboardService
   */
  public assignDiff([dataRes, data, period]: [DashboardResDTO, any, string]) {
    let keyCustomer = period == 'week' ? 'CUST_ONE_WEEK' : period == 'month' ? 'CUST_ONE_MONTH' : period == 'quarter' ? 'CUST_ONE_QUARTER' : 'CUST_TOTAL';

    let keyInactiveCustomer = period == 'week' ? 'CUST_INACTIVE_ONE_WEEK' : period == 'month' ? 'CUST_INACTIVE_ONE_MONTH' : period == 'quarter' ? 'CUST_INACTIVE_ONE_QUARTER' : 'CUST_INACTIVE_TOTAL';

    let keyCompany = period == 'week' ? 'COMP_ONE_WEEK' : period == 'month' ? 'COMP_ONE_MONTH' : period == 'quarter' ? 'COMP_ONE_QUARTER' : 'COMP_TOTAL';

    let keyEmployee = period == 'week' ? 'EMP_ONE_WEEK' : period == 'month' ? 'EMP_ONE_MONTH' : period == 'quarter' ? 'EMP_ONE_QUARTER' : 'EMP_TOTAL';

    dataRes.diffCustomer = data[keyCustomer];
    dataRes.diffActiveCustomer = data[keyCustomer] - data[keyInactiveCustomer];
    dataRes.diffInactiveCustomer = data[keyInactiveCustomer];
    dataRes.diffCompany = data[keyCompany];
    dataRes.diffEmployee = data[keyEmployee];
  }

}