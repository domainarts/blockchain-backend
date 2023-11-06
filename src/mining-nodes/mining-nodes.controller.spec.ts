import { Test, TestingModule } from '@nestjs/testing';
import { MiningNodesController } from './mining-nodes.controller';

describe('MiningNodesController', () => {
  let controller: MiningNodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiningNodesController],
    }).compile();

    controller = module.get<MiningNodesController>(MiningNodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
