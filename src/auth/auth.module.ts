import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module, HttpModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ActiveDirectoryStrategy } from "./passport/ad.strategy";
import { JwtStrategy } from "./passport/jwt.strategy";
import { UserService } from "../admin/user/user.service";
import { DreamFactory } from "../config/dreamfactory";
import { QueryParserService } from "../common/helper/query-parser.service";
import { LocalStrategy } from "./passport/local.strategy";

@Module({
  providers: [
    QueryParserService,
    AuthService,
    UserService,
    LocalStrategy,
    ActiveDirectoryStrategy,
    JwtStrategy
  ],
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ]
})
export class AuthModule { }