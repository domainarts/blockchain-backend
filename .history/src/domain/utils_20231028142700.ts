export class Utils {
    static generateHash = (owner: any): string => {
        return sha256(`${JSON.stringify(owner)}`);
    }
}