/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { BlockObservable } from "./domain/blockObserver";
import { MiningNodes } from "./domain/miningNodes";
import { MiningNode } from "./domain/miningNode";
import { TransactionsModule } from './transactions/transactions.module';

@Module({
    imports: [BlockchainModule, TransactionsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {
        console.log("AppModule constructor");
    }
}
