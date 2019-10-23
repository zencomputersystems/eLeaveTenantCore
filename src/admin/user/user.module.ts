// import { Module, HttpModule } from '@nestjs/common';
// // import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { PassportModule } from '@nestjs/passport';
// import { DreamFactory } from '../../config/dreamfactory';
// import { QueryParserService } from '../../common/helper/query-parser.service';
// import { AuthModule } from '../../auth/auth.module';

// /**
//  * Module for user
//  *
//  * @export
//  * @class UserModule
//  */
// @Module({
//   controllers: [
//     // UserController
//   ],
//   providers: [
//     UserService,
//     QueryParserService
//   ],
//   imports: [
//     // AuthModule,
//     PassportModule.register({ session: false }),
//     // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
//   ]
// })
// export class UserModule { }
