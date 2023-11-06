import {Utils} from "./utils"

export type TransactionDTO = {
    date: number;
    from: string;
    to: string;
    amount: number;
};

export enum BlockStatus {
    MINING = "MINING",
    MINED = "MINED",
    TERMINATED = "TERMINATED",
    VALID = "VALIDATED",
    INVALID = "INVALID",
    INSERTED = "INSERTED"
}

export type BlockDTO = {
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
    reward: number;
}

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
    status: BlockStatus;
    reward: number;
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
    reward: number = 0.05;

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
        return Utils.generateHash({
            nodeId: this.nodeId,
            nonce: this.nonce,
            lastHash: this.lastHash,
            time: this.time,
            transaction: this.transaction
        });
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
            nodeId: string;
            time: number;
            transaction: TransactionDTO;
            lastHash: string;
            nonce: number;
            hashPrefix: string;
            terminate: boolean;
            currentHash: string;
            status: BlockStatus;
            reward: number;
                } as BlockDTO;
    }
}
