import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BullModule } from '@nestjs/bullmq';
import {TestProcessor} from './transactions.processor';
@Module({
  imports: [
      BullModule.registerQueue({
          name: 'transactions',
          connection: {
            host: process.env.REDIS_HOST,
            port: 6379,
            password: 'test',
          },
      }),
      BullModule.registerFlowProducer({
          name: 'transactions',
          connection: {
            host: process.env.REDIS_HOST,
            port: 6379,
            password: 'test',
        },
     }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TestProcessor]
})
export class TransactionsModule {}
