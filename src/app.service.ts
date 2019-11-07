import { Injectable } from '@nestjs/common';

/**
 * App service
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * Get Hello
   *
   * @returns {string}
   * @memberof AppService
   */
  getHello(): string {
    return 'Hello World!';
  }
}
