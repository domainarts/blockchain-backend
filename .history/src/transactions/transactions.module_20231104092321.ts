import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BullModule } from '@nestjs/bullmq';
import {TestProcessor} from './transactions.processor';
@Module({
  imports: [
      BullModule.forRoot({
       }),
          BullModule.registerFlowProducer({
          name: 'transactions',
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
