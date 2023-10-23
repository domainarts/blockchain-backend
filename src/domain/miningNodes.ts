import { MiningNode } from "./miningNode";
import { TransactionDTO } from "../domain/block";

export class MiningNodes {
    private nodes: MiningNode[] = [];

    private static _instance: MiningNodes = null;

    private constructor() {}

    static getInstance() {
        if (MiningNodes._instance === null) {
            MiningNodes._instance = new MiningNodes();
        }
        return this._instance;
    }

    addNode(node: MiningNode): void {
        this.nodes.push(node);
    }

    removeNode(node: MiningNode): void {
        const index = this.nodes.indexOf(node);
        if (index !== -1) {
            this.nodes.splice(index, 1);
        }
    }

    getNode(key): MiningNode {
        return this.nodes[key];
    }

    orchestrateTransaction(transaction: TransactionDTO): void {
        this.nodes.forEach((node) => {
            node.addTransaction(transaction);
        });
    }
}
