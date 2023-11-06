import { Controller, Post, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDTO } from "../domain/block";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {}

    @Post()
    addTransaction(@Body() data: TransactionDTO): string {
        return this.service.addTransaction(data);
    }
}
