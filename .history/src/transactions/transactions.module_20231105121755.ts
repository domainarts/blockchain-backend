import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BullModule } from '@nestjs/bullmq';
import {TransactionProcessor} from './transactions.processor';
import {TransactionMiningProcessor} from './transactions-mining.processor';

@Module({
  imports: [
      BullModule.registerQueue({
          name: 'transactions',
      }),
      BullModule.registerFlowProducer({
          name: 'transactions',
          queue
     }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionProcessor, TransactionMiningProcessor]
})
export class TransactionsModule {}
