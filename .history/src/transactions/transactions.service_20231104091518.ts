import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../domain/block";
import { MiningNodes } from "../domain/miningNodes";
import { InjectFlowProducer } from "@nestjs/bullmq";
import { FlowProducer } from 'bullmq';

@Injectable()
export class TransactionsService {
    constructor(@InjectFlowProducer('transaction') private FlowProducer: FlowProducer) {}

    async addTransaction(transaction: TransactionDTO): Promise<any> {

        try {
            await this.fooFlowProducer.add({
                name: 'transactions-job',
                queueName: 'transactions',
                data: {},
                children: [
                  {
                    name: 'transaction-mining-job',
                    data: { idx: 0, foo: 'bar' },
                    queueName: 'transactionMining',
                  },
                ],
              });
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
