export class Utils {
    static generateId = (owner: any): string => {
        return sha256(`${JSON.stringify(owner)}`);
    }
}