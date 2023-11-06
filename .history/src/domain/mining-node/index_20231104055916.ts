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
