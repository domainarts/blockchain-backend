import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";
import { InjectQueue } from "@nestjs/bullmq";

@Controller("transactions")
export class TransactionsController {
    constructor(@InjectQueue('transactions') private readonly transactionQueue: any) {}

    @Post('add')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {

        console.log(data)

        const job = await this.transactionQueue.add(
            'transaction-job', {
            name: 'transactions-job',
            queueName: 'transactions',
            data: data,
          });

          console.log(job)

    }
}

/**
 *             children: [
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

 */