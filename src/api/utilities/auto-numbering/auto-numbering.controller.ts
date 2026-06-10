import { Controller } from '@nestjs/common';
import { AutoNumberingService } from './auto-numbering.service';

@Controller('auto-numbering')
export class AutoNumberingController {
  constructor(private readonly autoNumberingService: AutoNumberingService) {}
}
