import { Controller, Post, Body, Get } from "@nestjs/common";
import { MiningNodesService } from "./mining-nodes.service";
import { MiningNode, MiningNodeDTO } from "src/domain/miningNode";

@Controller("mining-nodes")
export class MiningNodesController {
    constructor(private readonly service: MiningNodesService) {}

    @Get()
    getNodes(): MiningNodeDTO[] {
        return this.service.getNodes();
    }

    @Post()
    addNode(@Body() data: MiningNodeDTO): string {
        return this.service.addNode(data);
    }
}
