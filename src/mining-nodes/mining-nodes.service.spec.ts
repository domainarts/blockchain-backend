import { Test, TestingModule } from '@nestjs/testing';
import { MiningNodesService } from './mining-nodes.service';

describe('MiningNodesService', () => {
  let service: MiningNodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiningNodesService],
    }).compile();

    service = module.get<MiningNodesService>(MiningNodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
