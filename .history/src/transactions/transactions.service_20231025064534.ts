import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";

@Injectable()
export class TransactionsService {
    constructor() {}

    addTransaction(transaction: TransactionDTO): string {
        transaction.date = Date.now();
        MiningNodes.getInstance().orchestrateTransaction(transaction);
        return "Transaction added to queue";
    }
}
