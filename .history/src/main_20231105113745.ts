import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MiningObservable } from "./domain/miningObserver";
import { MiningNodes } from "./domain/miningNodes";
import { Wallets } from "./domain/wallets";

async function bootstrap() {
    console.log('Bootstrap started');

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    // init BlockObservable (Singelton)
    //MiningObservable.getInstance();

    // init MiningNodes (Singelton)
    //const mns = MiningNodes.getInstance();
    //const wallets = Wallets.getInstance();

    // init wallets
    //const wallet1 = wallets.addWallet({firstName: "Sascha", lastName: "Hauf", email: "sascha@domainarts.de"});
    //const wallet2 = wallets.addWallet({firstName: "Jesko", lastName: "Hauf", email: "jesko@domainarts.de"});
    //const wallet3 = wallets.addWallet({firstName: "Peter", lastName: "Hauf", email: "peter@domainarts.de"});
    
    //mns.addNode({name: "Node 1", wallet: wallet1.getId()});
    //mns.addNode({name: "Node 2", wallet: wallet2.getId()});
    //mns.addNode({name: "Node 3", wallet: wallet3.getId()});
    

    MiningNode.getInstace({name: "Node 1", wallet: wallet1.getId()})

    console.log(process.env.REDIS_HOST)

    console.log('Bootstrap done');
}
bootstrap();
