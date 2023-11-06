import { Block, BlockDTO, BlockStatus } from "./block";

export interface IObserver {
    validateBlock(block: BlockDTO): BlockDTO;
    addBlockToBlockchain(block: BlockDTO): void;
    terminateCurrentBlock
}

export class MiningObservable {
    private observers: IObserver[] = [];

    private static _instance: MiningObservable = null;

    private constructor() {
        this.observers = [];
    }

    static getInstance() {
        if (MiningObservable._instance === null) {
            MiningObservable._instance = new MiningObservable();
        }
        return this._instance;
    }

    addObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(block: BlockDTO): void {
        if (block.status === BlockStatus.MINED) {
            const checkedBlocks: BlockDTO[] = this.observers.map(
                (observer: IObserver) => {
                    return observer.validateBlock(block);
                }
            );

            if (
                !!!checkedBlocks.find(
                    (block) => block.status !== BlockStatus.VALID
                )
            ) {
                block.status = BlockStatus.VALID;
                this.notify(block);
            }
        } else if (block.status === BlockStatus.VALID) {
            this.observers.forEach((observer) => {
                observer.addBlockToBlockchain(block);
            });
        } else {
            this.observers.forEach((observer) => {
                observer.terminateCurrentBlock();
            });
        }
    }
}
