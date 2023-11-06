import { Controller, Post, Body, Get } from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { Wallet } from "src/domain/wallet";
import { TransactionDTO } from "src/domain/block";

@Controller("wallets")
export class WalletsController {
    constructor(private readonly service: WalletsService) {}

    @Get()
    getWallets(): Wallet[] {
        return this.service.getWallets();
    }
}
