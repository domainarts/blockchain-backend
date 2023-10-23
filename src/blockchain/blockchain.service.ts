import { Injectable } from "@nestjs/common";
import { MiningNodes } from "../domain/miningNodes";

@Injectable()
export class BlockchainService {
    constructor() {}

    getBlockchain(): any {
        return MiningNodes.getInstance().getNode(0).getBlockchain();
    }
}
