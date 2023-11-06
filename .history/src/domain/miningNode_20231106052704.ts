import { Block, TransactionDTO } from "../domain/block";
import { Blockchain } from "./blockchaine";
import { BlockObservable, IBlockObserver } from "./mObserver";
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
            )

            try {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} start mining for block `,
                    this.currentBlock.blockId
                );
                await this.currentBlock.mine();
                console.log(
                    `MiningNode: [${this.id}] ${this.name} has MINED the Block.`,
                    this.currentBlock.blockId
                );
                console.log(
                    `MiningNode: [${this.id}] ${this.name} terminate block`,
                    this.currentBlock.blockId
                );
                this.blockObservable.notify(this.currentBlock);
            } catch (e) {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} returns block is VALID.`,
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
        if (this.currentBlock) {
            this.currentBlock.terminateMining()
        }
        //this.isMining = false
    }

    getBlockchain(): Blockchain {
        return this.blockchain
    }

    toJSON(): MiningNodeDTO {
        return {
            id: this.id,
            name: this.name,
            wallet: this.wallet,
            transactionQueueLength: this._transactionQueue.length(),
        } as MiningNodeDTO
    }

    getTransactionsByWalletId(id: string): TransactionDTO[] {
        return this.blockchain.getTransactionsByWalletId(id)
    }

    toJSON(): MiningNodeDTO {
        return {
            id: this.id,
            name: this.name,
            wallet: this.wallet,
            transactionQueueLength: this._transactionQueue.length()
        } as MiningNodeDTO;
    }

    getTransactionsByWalletId(id: string): TransactionDTO[] {
        return this.blockchain.getTransactionsByWalletId(id);
    }
}
