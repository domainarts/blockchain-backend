import { Block, TransactionDTO, BlockStatus } from "../domain/block";
import { Blockchain } from "./blockchaine";
import { MiningObservable, IObserver } from "./miningObserver";
import { Queue } from "./queue";
import * as sha256 from "sha256";
import { Utils } from "./utils";

export type MiningNodeDTO = {
    id?: string;
    name: string;
    wallet: string;
}

export interface IMiningNode extends IObserver {
    _transactionQueue: Queue;
    id: string;
    name: string;
    blockchain: Blockchain;
    isMining: boolean;
    currentBlock: Block;
    miningObservable: MiningObservable;
    wallet: string;
    toggle(): void;
    addTransaction(transaction: TransactionDTO): void;
    mine(): void;
    terminateCurrentBlock(): void;
    getBlockchain(): Blockchain;
    toJSON(): MiningNodeDTO;
}

export class MiningNode implements IMiningNode {
    _transactionQueue: Queue;
    id: string;
    name: string;
    blockchain: Blockchain;
    isMining: boolean;
    currentBlock: Block;
    miningObservable: MiningObservable;
    wallet: string;

    constructor(id: string, name: string, wallet: string) {
        this.id = id;
        this.name = name;
        this._transactionQueue = new Queue();
        this.blockchain = new Blockchain();
        this.miningObservable = MiningObservable.getInstance();
        this.miningObservable.addObserver(this);
        this.wallet = wallet;

        console.log(`MiningNode: [${this.id}] ${this.name} started`);
    }

    toggle() {
        this.isMining = !this.isMining;
        if (this.isMining) {
            this.mine();
        } else {
            this.terminateCurrentBlock();
        }
    }

    addTransaction(transaction: TransactionDTO): void {
        this._transactionQueue.add(transaction);
        this.mine();
    }

    async mine(): Promise<void> {
        const lastBlock = this.blockchain.getLastBlock();
        const tarnsaction = this._transactionQueue.getLast();

        if (tarnsaction) {
            //console.log(`Node ${this.id} tarsnaction: `, tarnsaction);

            const blockId = tarnsaction.date;

            this.currentBlock = new Block(
                Date.now(),
                lastBlock.currentHash,
                tarnsaction,
                this.id,
                blockId
            );

            try {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} start mining for block `,
                    this.currentBlock.blockId
                );
                
                // mining
                await this.currentBlock.mine();
                console.log(
                    `MiningNode: [${this.id}] ${this.name} has MINED the Block.`,
                    this.currentBlock.blockId
                );

                // add block to blockchain
                this.miningObservable.notify(this.currentBlock);
            } catch (e) {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} terminate block`,
                    this.currentBlock.blockId
                );
            }
        }
    }

    validateBlock(block: Block): Block {
        const lastBlock = this.blockchain.getLastBlock();

        if (block.lastHash === lastBlock.currentHash) {
            const hash = Utils.generateHash({
                nodeId: block.nodeId,
                nonce: block.nonce,
                lastHash: block.lastHash,
                time: block.time,
                transaction: block.transaction
            });
    
            if (hash === block.currentHash) {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} returns block is truthy.`,
                    this.currentBlock.blockId
                );
                block.status = BlockStatus.VALID;
                return block;
            }
        }
        console.log(
            `MiningNode: [${this.id}] ${this.name} returns block is falsy.`,
            this.currentBlock.blockId
        );

        block.status = BlockStatus.INVALID;
        return block;
    }

    addBlockToBlockchain(block: Block): Block {
        this.blockchain.addBlock(block);
        this._transactionQueue.removeLast();
        
        this.terminateCurrentBlock();
        this.mine();
        console.log(
            `MiningNode: [${this.id}] ${this.name} added the Block into the Blockchain.`,
            this.currentBlock.blockId
        );
        block.status = BlockStatus.INSERTED;

        if (block.nodeId === this.id) {
            block.status = BlockStatus.MINED;
        }

        return block;
    }

    applyReward(block: Block): Block {
        if(block.nodeId === this.id) {
            const transaction = {
                id: block.transaction.id,
                from: block.transaction.from,
                to: block.nodeId,
                amount: block.transaction.amount,
                date: block.transaction.date,
                isReward: true
        }
    
    }

    terminateCurrentBlock(): void {
        if (this.currentBlock) {
            this.currentBlock.terminateMining();
        }
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }

    toJSON(): MiningNodeDTO {
        return {
            id: this.id,
            name: this.name,
            wallet: this.wallet,
            isMining: this.isMining,
            transactionQueueLength: this._transactionQueue.length()
        } as MiningNodeDTO;
    }

    getTransactionsByWalletId(id: string): TransactionDTO[] {
        return this.blockchain.getTransactionsByWalletId(id);
    }

}
