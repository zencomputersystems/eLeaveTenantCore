import { Injectable } from "@nestjs/common";
import { RoleDbService } from '../../common/db/table.db.service';

/**
 * Service for role
 *
 * @export
 * @class RoleService
 */
@Injectable()
export class RoleService {
  /**
   *Creates an instance of RoleService.
   * @param {RoleDbService} roleDbService DB service for role
   * @memberof RoleService
   */
  constructor(private readonly roleDbService: RoleDbService) { }
  /**
   * Get role
   *
   * @returns
   * @memberof RoleService
   */
  public getRole() {
    return this.roleDbService.findByFilterV4([[], [], null, null, null, [], null]);
  }
}