export class Utils {
    static generate = (owner: any): string => {
        return sha256(`${JSON.stringify(owner)}`);
    }
}