import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/authentication.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { SecretUtilities } from 'src/core/auth/hash-password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private secretService: SecretUtilities,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  private generateTree(menus: any[], parentKey: string, idKey: string, parentId: string | null = null) {
    return menus
      .filter(menu => menu[parentKey] === parentId)
      .map(menu => ({
        ...menu,
        children: this.generateTree(menus, parentKey, idKey, menu[idKey])
      }));
  }

  async loginDB(loginDto: UserLoginDto) {
    const { username, password } = loginDto

    let validUser = await this.prisma.userAuth.findFirst({
      where: {
        username: username,
        deleted_at: null
      }
    })

    if (!validUser) {
      throw new UnauthorizedException('Invalid username/password')
    }

    if (validUser.is_active === 0) {
      throw new UnauthorizedException('User inactive')
    }

    let decryptPasswordBody = this.secretService.decryptPwd(password)

    const comparePassword = await bcrypt.compare(decryptPasswordBody, validUser.password)

    if (!comparePassword) {
      throw new UnauthorizedException('Invalid username/password')
    }

    const isGroup = await this.prisma.groups.findFirst({
      where: {
        id: validUser.group_id,
        deleted_at: null
      },
      select: {
        role_permissions: true,
        is_superadmin: true
      }
    })

    let list_menu = [];
    if (isGroup && isGroup.is_superadmin === 'N') {
      const findAllMenuByGroup = await this.prisma.menusGroupAccess.findMany({
        where: {
          group_id: validUser.group_id,
          deleted_at: null,
          permissions: 'Y',
          Menus: {
            is_active: 'Y'
          }
        },
        include: { Menus: true },
      });

      const menu_permission = findAllMenuByGroup.map((m) => ({
        menu_id: m.Menus.id,
        menu_name: m.Menus.menu_name,
        menu_path: m.Menus.path,
        menu_icon: m.Menus.icon,
        menu_order_no: m.Menus.order_no,
        menu_parent: m.Menus.parent_menu,
      }));

      list_menu = this.generateTree(menu_permission, 'menu_parent', 'menu_id');
    } else {
      const menus = await this.prisma.menus.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          MenuAccess: true,
        },
      });

      const menu_permision = menus.map((menu) => {
        return {
          menu_id: menu.id,
          menu_name: menu.menu_name,
          menu_path: menu.path,
          menu_icon: menu.icon,
          menu_order_no: menu.order_no,
          menu_parent: menu.parent_menu,
        };
      });

      list_menu = this.generateTree(menu_permision, 'menu_parent', 'menu_id');

    }

    let permissions = isGroup?.role_permissions.


  }


}
