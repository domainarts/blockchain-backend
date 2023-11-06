import { Block, TransactionDTO, BlockStatus, BlockDTO } from '../domain/block'
import { Blockchain } from './blockchaine'
import { MiningNodes } from './miningNodes'
import { MiningObservable, IObserver } from './miningObserver'
import { Queue } from './queue'
import { Utils } from './utils'

export type MiningNodeDTO = {
    id?: string
    name: string
    wallet: string
}

export interface IMiningNode extends IObserver {
    _transactionQueue: Queue
    id: string
    name: string
    blockchain: Blockchain
    currentBlock: Block
    miningObservable: MiningObservable
    wallet: string
    isMining: boolean
    addTransaction(transaction: TransactionDTO): void
    mine(): void
    terminateCurrentBlock(): void
    getBlockchain(): Blockchain
    toJSON(): MiningNodeDTO
}

export class MiningNode implements IMiningNode {
    _transactionQueue: Queue
    id: string
    name: string
    blockchain: Blockchain
    isMining: boolean = false
    currentBlock: Block
    miningObservable: MiningObservable
    wallet: string

    constructor(id: string, name: string, wallet: string) {
        this.id = id
        this.name = name
        this._transactionQueue = new Queue()
        this.blockchain = new Blockchain()
        this.miningObservable = MiningObservable.getInstance()
        this.miningObservable.addObserver(this)
        this.wallet = wallet

        console.log(`MiningNode: [${this.id}] ${this.name} started`)
    }

    addTransaction(transaction: TransactionDTO): void {
        //if(this._transactionQueue.length() <= 0) this.isMining = false 
        this._transactionQueue.add(transaction)
        this.mine()
    }

    async mine(): Promise<void> {
        const tarnsaction = this._transactionQueue.getLast()
        if (false === this.isMining && tarnsaction) {

            this.isMining = true
            const lastBlock = this.blockchain.getLastBlock()

            //console.log(`Node ${this.id} tarsnaction: `, tarnsaction);

            const blockId = tarnsaction.date

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
                )

                // mining
                await this.currentBlock.mine()

                console.log(
                    `MiningNode: [${this.id}] ${this.name} has MINED the Block.`,
                    this.currentBlock.blockId
                )

                // add block to blockchain
                this.miningObservable.notify(this.currentBlock.toJSON())
                this.isMining = false
            } catch (e) {

                console.log(
                    `MiningNode: [${this.id}] ${this.name} terminate block`,
                    this.currentBlock.blockId
                )
                this.isMining = false
                this.mine()
            }
        }
    }

    validateBlock(block: BlockDTO): BlockDTO {
        const lastBlock = this.blockchain.getLastBlock()

        if (block.lastHash === lastBlock.currentHash) {
            const hash = Utils.generateHash({
                nodeId: block.nodeId,
                nonce: block.nonce,
                lastHash: block.lastHash,
                time: block.time,
                transaction: block.transaction,
            })

            if (hash === block.currentHash) {
                console.log(
                    `MiningNode: [${this.id}] ${this.name} returns block is valid.`,
                    this.currentBlock.blockId
                )
                block.status = BlockStatus.VALID
                this.terminateCurrentBlock()
                return block
            }
        }

        console.log(
            `MiningNode: [${this.id}] ${this.name} returns block is falsy.`,
            this.currentBlock.blockId
        )

        block.status = BlockStatus.INVALID
        return block
    }

    addBlockToBlockchain(block: Block): Block {
        this.blockchain.addBlock(block)
        console.log(
            `MiningNode: [${this.id}] ${this.name} added the Block into the Blockchain.`,
            this.currentBlock.blockId
        )
        block.status = BlockStatus.INSERTED
        this._transactionQueue.removeLast()

        if (
            block.transaction.from !== this.blockchain.rewardsTransactionName &&
            block.nodeId === this.id
        ) {
            this.applyReward(block)
        }

        this.mine()

        if (block.nodeId === this.id) {
            block.status = BlockStatus.MINED
        }

        return block
    }


    applyReward(block: Block): void {
        if (block.nodeId === this.id) {
            const transaction = this.blockchain.getRewardTransaction(this.wallet)
            MiningNodes.getInstance().orchestrateTransaction(transaction)
        }
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
}
