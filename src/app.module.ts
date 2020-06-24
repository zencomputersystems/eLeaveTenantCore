import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserManagerModule } from './admin/user-manage/user-manage.module';
import { RoleModule } from './admin/role/role.module';
import { CustomerModule } from './admin/customer/customer.module';
import { SubscriptionModule } from './admin/subscription/subscription.module';
import { ActivityLogModule } from './admin/activity-log/activity-log.module';
import { ForgotPasswordModule } from './admin/forgot-password/forgot-password.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { SyncDataModule } from './admin/sync-data/sync-data.module';

@Module({
  imports: [
    SyncDataModule,
    AuthModule,
    ForgotPasswordModule,
    RoleModule,
    UserManagerModule,
    CustomerModule,
    SubscriptionModule,
    ActivityLogModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
