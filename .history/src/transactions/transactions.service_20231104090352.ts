import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";
import { InjectQueue } from "@nestjs/bullmq";
import { FlowProducer } from 'bullmq';
@Injectable()
export class TransactionsService {
    constructor(@InjectQueue('audio') private audioQueue: Queue) {}

    addTransaction(transaction: TransactionDTO): string {
        transaction.date = Date.now();
        MiningNodes.getInstance().orchestrateTransaction(transaction);
        return "Transaction added to queue";
    }
}
