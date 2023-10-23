import { Controller, Get } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";

@Controller("blockchain")
export class BlockchainController {
    constructor(private readonly service: BlockchainService) {}

    @Get()
    getBlockchain(): any {
        return this.service.getBlockchain();
    }
}
