export class Queue {
    private items: any[] = [];

    constructor(items: any[] = []) {
        this.items = items;
    }

    // Methode, um ein Element am Ende der Queue hinzuzufügen
    add(item: any): void {
        this.items.push(item);
    }

    // Methode, um das Element am Anfang der Queue zu entfernen und zurückzugeben
    get(): any {
        return this.items[0];
    }

    // Methode, um das Element am Anfang der Queue zu betrachten, ohne es zu entfernen
    show(index: number = 0): any {
        return this.items[index];
    }

    // Methode, um festzustellen, ob die Queue leer ist
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Methode, um die Anzahl der Elemente in der Queue zu erhalten
    size(): number {
        return this.items.length;
    }

    removeLast(): void {
        this.items.pop();
    }

    length(): number {
        return this.items.length;
    }
}
