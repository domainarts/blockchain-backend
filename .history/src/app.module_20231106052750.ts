/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransactionsModule } from './transactions/transactions.module'
import { WalletsModule } from './wallets/wallets.module'
//import { MiningNodesModule } from './mining-nodes/mining-nodes.module';
import { BullModule } from '@nestjs/bullmq'

@Module({
    imports: [
        BullModule.forRootAsync({
            useFactory: async () => ({
                connection: {
                host: process.env.REDIS_HOST,
                port: 6379,
                password: 'test',
            }})
        }),
        BlockchainModule,
        TransactionsModule,
        WalletsModule,
        //MiningNodesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor() {
        // init BlockObservable (Singelton)
        BlockObservable.getInstance();

        // init MiningNodes (Singelton)
        const mns = MiningNodes.getInstance();

        // init mining nodes with genesis block
        const genesisTransaction = {
            id: "genesis",
            from: "genesis",
            to: "genesis",
            amount: 100
        };

        mns.addNode(new MiningNode("1", "Node 1", genesisTransaction));
        mns.addNode(new MiningNode("2", "Node 2", genesisTransaction));
        mns.addNode(new MiningNode("3", "Node 3", genesisTransaction));

        console.log("AppModule constructor");
    }
}
