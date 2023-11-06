import { Block, TransactionDTO } from "../domain/block";
import { Blockchain } from "./blockchaine";
import { BlockObservable, IBlockObserver } from "./blockObserver";
import { Queue } from "./queue";

export interface IMiningNode extends IBlockObserver {
    _transactionQueue: Queue;
    id: string;
    name: string;
    blockchain: Blockchain;
    isMining: boolean;
    currentBlock: Block;
    blockObservable: BlockObservable;
    toggle(): void;
    addTransaction(transaction: TransactionDTO): void;
    mine(): void;
    checkBlock(block: Block): boolean;
    terminateCurrentBlock(): void;
    getBlockchain(): Blockchain;
}

export class MiningNode implements IMiningNode {
    _transactionQueue: Queue;
    id: string;
    name: string;
    blockchain: Blockchain;
    isMining: boolean;
    currentBlock: Block;
    blockObservable: BlockObservable;

    constructor(id: string, name: string, genesisTransaction?: TransactionDTO) {
        this.id = id;
        this.name = name;
        this._transactionQueue = new Queue();
        this.blockchain = new Blockchain();
        if (genesisTransaction) {
            const genesisBlock = new Block(
                Date.now(),
                "0",
                genesisTransaction,
                this.id,
                0
            );
            this.blockchain.addBlock(genesisBlock);
        }
        this.blockObservable = BlockObservable.getInstance();
        this.blockObservable.addObserver(this);

        console.log(`Node ${this.id} constructor`);
        //console.dir(this.blockObservable, { depth: 10 });
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
        const tarnsaction = this._transactionQueue.get();

        if (tarnsaction) {
            console.log(`Node ${this.id} tarsnaction: `, tarnsaction);

            const blockId = Date.now();

            this.currentBlock = new Block(
                Date.now(),
                lastBlock.currentHash,
                tarnsaction,
                this.id,
                blockId
            );

            try {
                console.log(
                    `Node ${this.id} start mining on ${this.id} for block `,
                    this.currentBlock.blockId
                );
                await this.currentBlock.mine();
                console.log(
                    `Node ${this.id} hat den Block gefunden!`,
                    this.currentBlock.blockId
                );
                console.log(
                    `Node ${this.id} end mining on ${this.id} for block `,
                    this.currentBlock.blockId
                );
                this.blockObservable.notify(this.currentBlock);
            } catch (e) {
                console.log(
                    `Node ${this.id} hat den Block abgebrochen!`,
                    this.currentBlock.blockId
                );
            }
        }
    }

    getNotification(block: Block): void {
        console.log(
            `Node ${this.id} hat den Block in die Blockchain eingetragen! ${this.currentBlock.blockId}`
        );
        this.blockchain.addBlock(block);
        this.terminateCurrentBlock();
        this.mine();
    }

    terminateCurrentBlock(): void {
        console.log(
            `Node ${this.id} terminate block ${this.currentBlock.blockId}`
        );

        if (this.currentBlock) {
            this.currentBlock.terminateMining();
        }
    }

    checkBlock(block: Block): boolean {
        return true;
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }
}
