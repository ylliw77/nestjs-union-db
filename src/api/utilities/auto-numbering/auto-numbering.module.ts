import { Module } from '@nestjs/common';
import { AutoNumberingService } from './auto-numbering.service';
import { AutoNumberingController } from './auto-numbering.controller';

@Module({
  controllers: [AutoNumberingController],
  providers: [AutoNumberingService],
})
export class AutoNumberingModule {}
