/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';
//import { MiningNodesModule } from './mining-nodes/mining-nodes.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
              host: process.env.REDIS_HOST,
              port: 6379,
              password: ""
            },
          }),       BlockchainModule, 
        TransactionsModule, 
        WalletsModule, 
        MiningNodesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {


    }
}
