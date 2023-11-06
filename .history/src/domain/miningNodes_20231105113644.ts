import { MiningNode, MiningNodeDTO } from "./miningNode";
import { TransactionDTO } from "../domain/block";
import * as crypto from 'crypto';

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

    addNode(node: MiningNodeDTO): string {
        node.id = crypto.createHash('md5').update(`${this.nodes.length}`).digest("hex");
        this.nodes.push(MiningNode.getInstance(node.id, node.name, node.wallet));
        return node.id;
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

    getNodes(): MiningNode[] {
        return this.nodes;
    }

    orchestrateTransaction(transaction: TransactionDTO): void {
        this.nodes.forEach((node) => {
            node.addTransaction(transaction);
        });
    }

    toJSON(): MiningNodeDTO[] {
        return this.nodes.map((node: MiningNode) => node.toJSON());
    }

    getTransactionsByWalletId(id: string): TransactionDTO[] {
        return this.nodes[0]?.getTransactionsByWalletId(id);
    }

}
