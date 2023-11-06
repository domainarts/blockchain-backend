import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MiningNode, TransactionDTO } from 'src/domain';

@Processor('transactions')
export class TransactionProcessor extends WorkerHost {
    async process(job: Job<any, any, string>): Promise<any> {

      const bla = await MiningNode.getInstance().addTransaction(job.data.data as TransactionDTO)

        console.log('job######################');
        //console.log(bla);
        console.log('job######################');

        return true;

    }

    @OnWorkerEvent('completed')
    onCompleted(i) {
        console.log('onCompleted######################');
        console.log(i);
        console.log('onCompleted######################');


  }
}