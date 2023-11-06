import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MiningNode, TransactionDTO } from 'src/domain';

@Processor('transaction-mining')
export class TransactionMiningProcessor extends WorkerHost {
    async process(job: Job<any, any, string>): Promise<any> {

      const transaction = job.data.data;
      transaction.date = Date.now();

      //const bla = await MiningNode.getInstance().addTransaction(job.data.data as TransactionDTO)

        console.log('job mining######################');
        //console.log(bla);
        console.log('job# mining#####################');

        return true;

    }
    

    @OnWorkerEvent('completed')
    onCompleted(i) {
        console.log('onCompleted######################');
        //console.log(i);
        console.log('onCompleted######################');


  }
}