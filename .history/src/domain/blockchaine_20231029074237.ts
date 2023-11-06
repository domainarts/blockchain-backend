import { Block, TransactionDTO } from "./block";

export interface IBlockchain {
    rewardsTransactionName: string;
    rewardAmount: number;
    chain: Block[];
}

export class Blockchain implements IBlockchain {
    rewardsTransactionName: string = "REWARDS";
    rewardAmount : 0.05;
    chain: Block[] = [];

    constructor() {
        this.chain = [];

        if (this.chain.length <= 0) {
            this.createGenesisBlock();
        }
    }

    addBlock(block: Block) {
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

    getTransactionsByWalletId(id: string): TransactionDTO[] {
        return this.chain.reduce((acc: TransactionDTO[], curr: Block) => {
            if (curr.transaction.from === id || curr.transaction.to === id) {
              acc.push(curr.transaction);
            }
            return acc;
          }, []);
    }

    getRewardTransaction(to: string): TransactionDTO {
        return {
            from: this.rewardsTransactionName,
            to: to,


    createGenesisBlock(): void {
        const genesisBlock = new Block(
            Date.now(),
            "0",
            {
                from: "genesis",
                to: "genesis",
                amount: 0,
                date: Date.now()
            },
            "0",
            0
        );
        this.addBlock(genesisBlock);
    }
}
