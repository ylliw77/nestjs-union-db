import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication Controller')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}


}
