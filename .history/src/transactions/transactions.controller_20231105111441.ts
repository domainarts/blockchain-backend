import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {}

    @Post('trans')
    async addTransaction(@Body() data: TransactionDTO): Promise<any> {
        return await this.service.addTransaction(data);
    }
}
