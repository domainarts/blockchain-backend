import * as Block from "./block";

export interface IBlockchain {
    chain: Block.Block[];
}

export class Blockchain implements IBlockchain {
    chain: Block.Block[] = [];

    constructor() {
        this.chain = [];
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
}
