import { Injectable } from "@nestjs/common";
import { Wallets } from "../domain/wallets";
import { Wallet } from "../domain/wallet";

@Injectable()
export class WalletsService {

    getWallets(): Wallet[] {
        return Wallets.getInstance().toJSON();
    }
}
