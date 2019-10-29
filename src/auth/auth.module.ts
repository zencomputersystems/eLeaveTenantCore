import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module, HttpModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./passport/jwt.strategy";
import { UserService } from "../admin/user/user.service";
import { DreamFactory } from "../config/dreamfactory";
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
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ]
})
export class AuthModule { }