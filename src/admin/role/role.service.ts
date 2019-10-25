import { Injectable } from "@nestjs/common";
import { RoleDbService } from '../../common/db/table.db.service';

@Injectable()
export class RoleService {
  constructor(private readonly roleDbService: RoleDbService) { }
  public getRole() {
    return this.roleDbService.findByFilterV4([[], [], null, null]);
  }
}