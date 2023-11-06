import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MiningNode } from 'src/domain';

@Processor('transactions')
export class TestProcessor extends WorkerHost {
    async process(job: Job<any, any, string>): Promise<any> {

      MiningNode.getInstance().addTransaction([])

        console.log('job######################');
        console.log(job);
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