import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserManagerModule } from './admin/user-manage/user-manage.module';
import { RoleModule } from './admin/role/role.module';
import { CustomerModule } from './admin/customer/customer.module';
import { SubscriptionModule } from './admin/subscription/subscription.module';

@Module({
  imports: [
    AuthModule,
    UserManagerModule,
    RoleModule,
    CustomerModule,
    SubscriptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
