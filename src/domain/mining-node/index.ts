import { Block, TransactionDTO } from "../block"
import { Blockchain } from "../blockchaine"

export type MiningNodeDTO = {
    id?: string
    name: string
    wallet: string
}

export interface IMiningNode {
    _transactionQueue: any
    id: string
    name: string
    blockchain: Blockchain
    currentBlock: Block
    wallet: string
    isMining: boolean
    addTransaction(transaction: TransactionDTO): void
    mine(): void
    terminateCurrentBlock(): void
    getBlockchain(): Blockchain
    toJSON(): MiningNodeDTO
}
