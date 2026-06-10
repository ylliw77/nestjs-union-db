import { Test, TestingModule } from '@nestjs/testing';
import { AutoNumberingController } from './auto-numbering.controller';
import { AutoNumberingService } from './auto-numbering.service';

describe('AutoNumberingController', () => {
  let controller: AutoNumberingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoNumberingController],
      providers: [AutoNumberingService],
    }).compile();

    controller = module.get<AutoNumberingController>(AutoNumberingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
