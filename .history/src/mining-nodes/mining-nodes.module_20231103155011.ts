import { Module } from "@nestjs/common";
import { MiningNodesController } from "./mining-nodes.controller";
import { MiningNodesService } from "./mining-nodes.service";
import { BullModule } from "@nestjs/bullmq";

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
