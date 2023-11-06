import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";
import { InjectQueue } from "@nestjs/bullmq";

@Controller("transactions")
export class TransactionsController {
    constructor(@InjectQueue('transactions') private readonly transactionQueue: any) {}

    @Post('transactions')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {
        const job = await this.transactionFlowProducer.add({
            name: 'transactions-job',
            queueName: 'transactions',
            data: {},
            children: [
                {
                    name: 'transaction-mining-job',
                    data: data,
                    queueName: 'transactionMining',
                  },
                  {
                    name: 'transaction-mining-job',
                    data: data,
                    queueName: 'transactionMining',
                  },
                  {
                    name: 'transaction-mining-job',
                    data: data,
                    queueName: 'transactionMining',
                  },
                ],
          });

    }
}
