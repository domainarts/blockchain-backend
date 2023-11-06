import * from "./utils"

export type TransactionDTO = {
    date: number;
    from: string;
    to: string;
    amount: number;
};

export interface IBlock {
    blockId: string | number;
    nodeId: string;
    time: number;
    transaction: TransactionDTO;
    lastHash: string;
    nonce: number;
    hashPrefix: string;
    terminate: boolean;
    currentHash: string;
}

export enum BlockStatus {
    MINING = "MINING",
    MINED = "MINED",
    TERMINATED = "TERMINATED",
    VALID = "VALIDATED",
    INVALID = "INVALID",
    INSERTED = "INSERTED"
}

export interface BlockDTO {
    blockId: string | number;
    nodeId: string;
    time: number;
    transaction: TransactionDTO;
    lastHash: string;
    nonce: number;
    hashPrefix: string;
    terminate: boolean;
    currentHash: string;
    status: BlockStatus;
}

export class Block implements IBlock {
    blockId: string | number;
    nodeId: string;
    time: number;
    transaction: TransactionDTO;
    lastHash: string;
    nonce: number = 0;
    hashPrefix: string = "0";
    terminate: boolean;
    currentHash = "";
    status: BlockStatus = BlockStatus.MINING;

    constructor(
        time: number,
        lastHash: string,
        transaction: TransactionDTO,
        nodeId: string,
        blockId: string | number
    ) {
        this.nodeId = nodeId;
        this.time = time;
        this.transaction = transaction;
        this.lastHash = lastHash;
        this.terminate = false;
        this.blockId = blockId;
    }

    terminateMining() {
        this.terminate = true;
    }

    addLastHash(lastHash: string) {
        this.lastHash = lastHash;
    }

    createHash() {
    }

    /**
     * using an interval to simulate the mining process
     * because the mining process is a CPU intensive task and
     * all the node always runs on the same thread
     * TODO: deploy MiningNodes on diferent containers
     */
    mine() {
        this.currentHash = this.createHash();

        return new Promise((resolve, reject) => {
            const currInterval = setInterval(
                () => {
                    if (this.terminate) {
                        clearInterval(currInterval);
                        this.status = BlockStatus.TERMINATED;
                        reject();
                    } else if (this.currentHash.startsWith(this.hashPrefix)) {
                        clearInterval(currInterval);
                        this.status = BlockStatus.MINED;
                        resolve(this);
                    } else {
                        this.nonce++;
                        this.currentHash = this.createHash();
                        //reject();
                    }
                },
                Math.floor(Math.random() * 1000)
            );
        });
    }

    mineOld() {
        let hash = this.createHash();
        while (!hash.startsWith(this.hashPrefix)) {
            this.nonce++;
            hash = this.createHash();
        }
    }

    toJSON() {
        return {
            blockId: this.blockId,
            nodeId: this.nodeId,
            time: this.time,
            transaction: this.transaction,
            lastHash: this.lastHash,
            nonce: this.nonce,
            hashPrefix: this.hashPrefix,
            currentHash: this.currentHash
        } as BlockDTO;
    }
}
