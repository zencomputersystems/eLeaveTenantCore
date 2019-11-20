import { Controller, UseGuards, Post, Body, Req, Res, HttpStatus, Get, Param, NotFoundException, Patch } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from "@nestjs/swagger";
import { ActivityLogService } from "./activity-log.service";
import { CreateActivityLogDTO } from './dto/create-activity-log.dto';
import { Response } from 'express';
import { getResErr } from '../../common/helper/basic-function';
import { UpdateActivityLogDTO } from "./dto/update-activity-log.dto";

/**
 * Controller for activity log
 *
 * @export
 * @class ActivityLogController
 */
@Controller('api/admin/activity-log')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ActivityLogController {
  /**
   *Creates an instance of ActivityLogController.
   * @param {ActivityLogService} activityLogService Service for activity log
   * @memberof ActivityLogController
   */
  constructor(private readonly activityLogService: ActivityLogService) { }

  /**
   * Find all activity log
   *
   * @param {string} id
   * @param {Response} res
   * @memberof ActivityLogController
   */
  @Get(':id')
  @ApiOperation({ title: 'Get all activity log by subscription guid', description: 'Get all activity log in local db. \nPermission : all' })
  @ApiImplicitParam({ name: 'id', description: 'Subscription guid to get activity log', required: true })
  findAllActivityLog(@Param('id') id: string, @Res() res: Response) {

    this.activityLogService.getActivityLog([id]).subscribe(
      data => {
        res.send(data);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No activity log found', 'Failed to retrieve activity log list'));
      }
    );

  }

  /**
   * Create activity log
   *
   * @param {CreateActivityLogDTO} activityLogData
   * @param {*} req
   * @param {Response} res
   * @memberof ActivityLogController
   */
  @Post()
  @ApiOperation({ title: 'Create activity log', description: 'Create activity log in local db. \nPermission : all' })
  createActivatyLog(@Body() activityLogData: CreateActivityLogDTO, @Req() req, @Res() res: Response) {

    // process create activity log
    this.activityLogService.createActivityLog([activityLogData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.CONFLICT).send(getResErr(err));
      }
    );

  }

  /**
   * Update activity log
   *
   * @param {UpdateActivityLogDTO} updateActivityLogData
   * @param {*} req
   * @param {Response} res
   * @memberof ActivityLogController
   */
  @Patch()
  @ApiOperation({ title: 'Update user', description: 'Update a user in local db. \nPermission : all' })
  updateActivityLog(@Body() updateActivityLogData: UpdateActivityLogDTO, @Req() req, @Res() res: Response) {

    this.activityLogService.updateActivityLog([updateActivityLogData, req.user]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        res.status(HttpStatus.BAD_REQUEST).send(new NotFoundException('No activity log found', 'Failed to update activity log'));
      }
    );

  }
}