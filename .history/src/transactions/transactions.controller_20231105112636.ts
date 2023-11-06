import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";
import { InjectQueue } from "@nestjs/bullmq";

@Controller("transactions")
export class TransactionsController {
    constructor(@InjectQueue('transactions') private readonly transactionQueue: any) {}

    @Post('add')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {
        const job = await this.transactionQueue.add({
            name: 'transactions-job',
            queueName: 'transactions',
            data,
          });

          console.log(job)

    }
}
