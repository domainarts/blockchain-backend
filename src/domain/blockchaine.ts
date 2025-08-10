import * as Block from "./block";

export interface IBlockchain {
    chain: Block.Block[];
    addBlock(block: Block.Block): void;
    isValid(): boolean;
    getLastBlock(): Block.Block;
    toJSON(): Block.BlockDTO[];
    rewardsTransactionName: string;
    rewardAmount: number;
    nodeId: string;
    getRewardTransaction(wallet: string): Block.TransactionDTO;
}

export class Blockchain implements IBlockchain {
    chain: Block.Block[] = [];
    rewardsTransactionName: string = "REWARD";
    rewardAmount: number = 0.5;
    nodeId: string;
    _genesisBlock: {
        time: number;
        lastHash: string;
        transaction: Block.TransactionDTO;
        nodeId: string;
    }
    
    constructor(nodeId: string) {
        this.chain = [];
        this.nodeId = nodeId;
    }

    addBlock(block: Block.Block) {
        this.chain.push(block);
    }

    isValid() {
        const invalidBlock = this.chain.find((currBlock, i) => {
            const prevBlock = this.chain[i - 1];
            return prevBlock && prevBlock.currentHash != currBlock.lastHash;
        });
        if (invalidBlock) {
            return true;
        } else {
            return false;
        }
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    toJSON() {
        return this.chain.map((block) => block.toJSON());
    }

    getRewardTransaction(wallet: string): Block.TransactionDTO {
        return {
            id: `${Date.now()}`,
            date: Date.now(),
            from: this.rewardsTransactionName,
            to: wallet,
            amount: this.rewardAmount
        };
    }

    getTransactionsByWalletId(walletId: string): Block.TransactionDTO[] {
        return this.chain
            .map((block) => block.transaction)
            .filter(
                (transaction) =>
                    transaction.from === walletId || transaction.to === walletId
            );
    }
}
