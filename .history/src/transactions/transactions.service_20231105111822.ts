import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";
import { InjectFlowProducer } from "@nestjs/bullmq";
import { FlowProducer } from 'bullmq';

@Injectable()
export class TransactionsService {
    constructor(@InjectFlowProducer('transactions') private transactionFlowProducer: FlowProducer) {}

    async addTransaction(transaction: TransactionDTO): Promise<any> {

        try {
               console.log(job)


              return "Transaction added to queue";
        }
        catch (e) {
            console.log(e);

            return e
        }
//        transaction.date = Date.now();
//        MiningNodes.getInstance().orchestrateTransaction(transaction);
    }
}
