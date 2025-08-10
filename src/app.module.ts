/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { TransactionsModule } from './transactions/transactions.module';

@Module({
    imports: [BlockchainModule, TransactionsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {}
}
