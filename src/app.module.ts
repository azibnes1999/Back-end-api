import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionController } from './subscription/subscription.controller';

@Module({
  imports: [],
  controllers: [AppController, SubscriptionController],
  providers: [AppService, SubscriptionService],
})
export class AppModule {}
