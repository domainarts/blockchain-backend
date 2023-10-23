import { Block } from "../domain/block";

export interface IBlockObserver {
    getNotification(block: Block): void;
}

export class BlockObservable {
    private observers: IBlockObserver[] = [];

    private static _instance: BlockObservable = null;

    private constructor() {
        this.observers = [];
    }

    static getInstance() {
        if (BlockObservable._instance === null) {
            BlockObservable._instance = new BlockObservable();
        }
        return this._instance;
    }

    addObserver(observer: IBlockObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: IBlockObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(block: Block): void {
        this.observers.forEach((observer) => {
            observer.getNotification(block);
        });
    }
}
