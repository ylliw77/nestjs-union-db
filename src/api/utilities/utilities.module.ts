import { Module } from '@nestjs/common';
import { AutoNumberingModule } from './auto-numbering/auto-numbering.module';
import { GroupModule } from './group/group.module';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AutoNumberingModule, GroupModule, MenuModule, UsersModule],
})
export class UtilitiesModule { }
