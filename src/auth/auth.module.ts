import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./passport/jwt.strategy";
import { UserService } from "../admin/user/user.service";
import { QueryParserService } from "../common/helper/query-parser.service";
import { LocalStrategy } from "./passport/local.strategy";
import { UserDbService } from '../common/db/table.db.service';
import { getModuleHttp } from "../common/helper/basic-function";

@Module({
  providers: [
    QueryParserService,
    AuthService,
    UserService,
    UserDbService,
    LocalStrategy,
    // ActiveDirectoryStrategy,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({ session: false }),
    getModuleHttp()
  ]
})
export class AuthModule { }