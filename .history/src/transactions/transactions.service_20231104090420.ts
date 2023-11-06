import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";
import { InjectFlowProducer, InjectQueue } from "@nestjs/bullmq";
import { FlowProducer } from 'bullmq';

@Injectable()
export class TransactionsService {
    constructor(@InjectFlowProducer('flow') private fooFlowProducer: FlowProducer) {}

    addTransaction(transaction: TransactionDTO): string {
        transaction.date = Date.now();
        MiningNodes.getInstance().orchestrateTransaction(transaction);
        return "Transaction added to queue";
    }
}
