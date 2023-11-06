import { Injectable } from '@nestjs/common';
import { MiningNodes, MiningNodeDTO } from 'src/domain';

@Injectable()
export class MiningNodesService {
    addNode(node: MiningNodeDTO): string {
        MiningNodes.getInstance().addNode(node);
        return "Node added to queue";
    }

    getNodes(): MiningNodeDTO[] {
        return MiningNodes.getInstance().toJSON();
    }

}
