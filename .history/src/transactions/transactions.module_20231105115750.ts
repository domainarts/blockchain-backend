import { Module } from '@nestjs/common'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { BullModule } from '@nestjs/bullmq'
import { TransactionProcessor } from './transactions.processor'
import { TransactionMiningProcessor } from './transactions-mining.processor'

@Module({
    imports: [
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
    providers: [TransactionsService, TransactionProcessor, TransactionMiningProcessor],
})
export class TransactionsModule {}
