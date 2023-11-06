export class Queue {
    private items: any[] = [];

    constructor(items: any[] = []) {
        this.items = items;
    }

    // Methode, um ein Element am Ende der Queue hinzuzufügen
    add(item: any): void {
        this.items.push(item);
    }

    getLast(): any {
        return this.items[this.items.length - 1];
    }

    removeLast(): void {
        this.items.pop();
    }

    get isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    get length(): number {
        return this.items.length;
    }
}
