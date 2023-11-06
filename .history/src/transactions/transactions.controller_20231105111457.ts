import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";

@Controller("transactions")
export class TransactionsController {
    constructor(@InjectQueue('audio') private readonly audioQueue: QueuePro) {}

    @Post('transactions')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {
        return await this.service.addTransaction(data);
    }
}
