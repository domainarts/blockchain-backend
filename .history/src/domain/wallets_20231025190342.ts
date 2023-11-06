import { Owner, Wallet } from "./wallet";

export class Wallets {
    private wallets: Wallet[] = [];

    private static _instance: Wallets = null;

    private constructor() {}

    static getInstance() {
        if (Wallets._instance === null) {
            Wallets._instance = new Wallets();
        }
        return this._instance;
    }

    getWallets = (): Wallet[] => {
        return this.wallets;
    }

    addWallet(owner: Owner): Wallet {
        const wallet = new Wallet(owner);
        this.wallets.push(wallet);
        return wallet;
    }

    removeWallet(wallet: Wallet): void {
        const index = this.wallets.indexOf(wallet);
        if (index !== -1) {
            this.wallets.splice(index, 1);
        }
    }

    getWallet(key: string | number): Wallet {
        return this.wallets[key];
    }

}
