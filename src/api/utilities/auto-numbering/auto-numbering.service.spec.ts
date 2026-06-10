import { Test, TestingModule } from '@nestjs/testing';
import { AutoNumberingService } from './auto-numbering.service';

describe('AutoNumberingService', () => {
  let service: AutoNumberingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoNumberingService],
    }).compile();

    service = module.get<AutoNumberingService>(AutoNumberingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
