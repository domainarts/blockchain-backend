
export type Hash = {
    
}

export class Utils {
    static generateHash(owner: any): string {
        const value = `${this.nodeId}${this.nonce}${this.lastHash}${
            this.time
        }${JSON.stringify(this.transaction)}`;

        return sha256(value);
    }
}