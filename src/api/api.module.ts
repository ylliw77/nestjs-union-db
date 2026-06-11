import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { MasterModule } from "./master/master.module";
import { UtilitiesModule } from "./utilities/utilities.module";
import { PrismaModule } from "prisma/prisma.module";
import { RedisModule } from "@nestjs-modules/ioredis";


@Module({
  imports: [AuthenticationModule, MasterModule, UtilitiesModule, PrismaModule, RedisModule]
})

export class ApiModule { }
