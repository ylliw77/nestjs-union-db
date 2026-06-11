import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserLoginDto } from './dto/authentication.dto';

@ApiTags('Authentication Controller')
@Controller('authentication')
@UsePipes(ZodValidationPipe)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  login(
    @Body() loginDto: UserLoginDto
  ) {
    return this.authenticationService.loginDB(loginDto)
  }
}
