import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SecretUtilities } from 'src/core/auth/hash-password';

@Module({
  imports: [RedisModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, SecretUtilities],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
