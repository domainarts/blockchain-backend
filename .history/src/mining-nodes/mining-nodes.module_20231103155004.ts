import { Module } from "@nestjs/common";
import { MiningNodesController } from "./mining-nodes.controller";
import { MiningNodesService } from "./mining-nodes.service";

@Module({
    controllers: [MiningNodesController],
    providers: [MiningNodesService]
})
export class MiningNodesModule {
    constructor() {
        BullModule.registerQueue({
            name: 'audio',
          });

    }
}
