import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIdMiddleware } from './core/middlewares/request-id.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/auth/jwt.strategy';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { PrismaModule } from 'prisma/prisma.module';
import { RedisModule } from '@nestjs-modules/ioredis'
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiModule } from './api/api.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'bang-yog-goat-psi',
      signOptions: {
        expiresIn: '3h'
      }
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        options: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      })
    }),
    PrismaModule,
    ApiModule
  ],
  controllers: [],
  providers: [JwtStrategy, {
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*')
  }
}
