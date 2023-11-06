import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";
import { InjectQueue, Queu } from "@nestjs/bullmq";

@Controller("transactions")
export class TransactionsController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

    @Post('transactions')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {
        return await this.service.addTransaction(data);
    }
}
