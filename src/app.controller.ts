import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App controller
 *
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  /**
   *Creates an instance of AppController.
   * @param {AppService} appService
   * @memberof AppController
   */
  constructor(private readonly appService: AppService) { }

  /**
   * Get hello
   *
   * @returns {string}
   * @memberof AppController
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
