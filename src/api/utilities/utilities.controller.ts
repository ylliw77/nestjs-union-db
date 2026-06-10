import { Controller } from '@nestjs/common';
import { AutoNumberingService } from './auto-numbering/auto-numbering.service';
import { GroupService } from './group/group.service';
import { MenuService } from './menu/menu.service';
import { UsersService } from './users/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('utilities')
@ApiTags('Utilities Controller')
export class UtilitiesController {
  constructor(
    private readonly autoNumberringService: AutoNumberingService,
    private readonly groupService: GroupService,
    private readonly menuService: MenuService,
    private readonly usersService: UsersService
  ) { }
}
