import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('transactions')
export class TestProcessor extends WorkerHost {
    async process(job: Job<any, any, string>): Promise<any> {

        console.log('job######################');
        console.log(job);
        console.log('job######################');

        return true;

    }

    @OnWorkerEvent('completed')
    onCompleted(i) {
        console.log('job######################');
        console.log();
        console.log('job######################');


  }
}