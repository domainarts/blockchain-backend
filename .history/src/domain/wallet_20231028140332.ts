import * as sha256 from "sha256";
import { MiningNodes } from "./miningNodes";

export type Owner = {
    firstName: string;
    lastName: string;
    email: string;
};

export class Wallet {
    private id: string;
    private owner: Owner;
    private created: number = Date.now();
    private totalAmount: number = 0;
    private transactions: any[] = [];

    constructor(owner: Owner) {
        if (!owner || !owner.email) {
            throw new Error("Owner is required");
        }
        this.owner = owner;
        this.id = this.generateId(owner);
        this.transactions = this.getTransactions();
        
        return this;
    }

    private generateId(owner: Owner): string {
        return sha256(`${JSON.stringify(owner)}`);
    }

    getId(): string {
        return this.id;
    }

    getTotalAmount(): number {
        return this.getTransactions().reduce((acc, curr) => {
            if (this.getId() === ) return acc + curr.amount
        }, 0);
    }

    getTransactions(): any[] {
        return MiningNodes.getInstance().getTransactionsByWalletId(this.id);
    }

    toJSON(): any {
        return {
            id: this.id,
            owner: this.owner,
            created: this.created,
            totalAmount: this.getTotalAmount(),
            transactions: this.getTransactions(),
        };
    }

}
