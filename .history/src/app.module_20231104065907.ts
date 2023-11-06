/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';
import { MiningNodesModule } from './mining-nodes/mining-nodes.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        BullModule.registerFlowProducer({
            connection: {
                host: 'localhost',
                port: 6379,
            },
            name: 'transactions',
            //queueName: 'transactions',
            children: []
        }),
        BullModule.registerQueue({
            name: 'transactions',
        }),
        BlockchainModule, 
        TransactionsModule, 
        WalletsModule, 
        MiningNodesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {}
}
