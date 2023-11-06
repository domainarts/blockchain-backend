import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";
import { InjectFlowProducer } from "@nestjs/bullmq";
import { FlowProducer } from 'bullmq';

@Injectable()
export class TransactionsService {
    constructor(@InjectFlowProducer('flow') private fooFlowProducer: FlowProducer) {}

    async addTransaction(transaction: TransactionDTO): string {

        
        const job = await this.fooFlowProducer.add({
            name: 'transactions-job',
            queueName: 'transactions',
            data: {},
            children: [
              {
                name,
                data: { idx: 0, foo: 'bar' },
                queueName: 'childrenQueueName',
              },
            ],
          });

        transaction.date = Date.now();
        MiningNodes.getInstance().orchestrateTransaction(transaction);
        return "Transaction added to queue";
    }
}
