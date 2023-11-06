import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BullModule } from '@nestjs/bullmq';
import {TestProcessor} from './transactions.processor';
@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TestProcessor]
})
export class TransactionsModule {}
