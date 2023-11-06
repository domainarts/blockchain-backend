export class Utils {
    static generateHash = (owner: any): string => {
        return sha256(        const value = `${this.nodeId}${this.nonce}${this.lastHash}${
            this.time
        }${JSON.stringify(this.transaction)}`;
);
    }
}