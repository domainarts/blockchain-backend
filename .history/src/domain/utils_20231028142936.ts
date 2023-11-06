import { TransactionDTO } from "./block";

export type Hash = {
    nodeId: string;
    nonce: number;
    lastHash: string;
    time: number;
    transaction: TransactionDTO;
}

export class Utils {
    static generateHash(data: Hash): string {
        const value = `${data.nodeId}${data.nonce}${data.lastHash}${
            da.time
        }${JSON.stringify(this.transaction)}`;

        return sha256(value);
    }
}