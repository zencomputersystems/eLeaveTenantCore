import { Controller, UseGuards, Get, Res, Param, BadRequestException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from "@nestjs/swagger";
import { Response } from 'express';
import { DashboardService } from './dashboard.service';

/**
 * Controller for dashboard
 *
 * @export
 * @class DashboardController
 */
@Controller('api/admin/dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {

  /**
   *Creates an instance of DashboardController.
   * @param {DashboardService} dashboardService
   * @memberof DashboardController
   */
  constructor(private readonly dashboardService: DashboardService) { }

  /**
   * Get dashboard data
   *
   * @param {*} period
   * @param {Response} res
   * @memberof DashboardController
   */
  @Get(':period')
  @ApiOperation({ title: 'Retrieve dashboard data' })
  @ApiImplicitParam({ name: 'period', description: 'Dashboard period type', enum: ['all', 'week', 'month', 'quarter'] })
  getDashboard(@Param('period') period, @Res() res: Response) {
    this.dashboardService.getDashboard([period]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.send(new BadRequestException('Invalid filter', 'Please input valid filter'));
      }
    );
  }

}