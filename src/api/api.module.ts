import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { MasterModule } from "./master/master.module";
import { UtilitiesModule } from "./utilities/utilities.module";


@Module({
  imports: [AuthenticationModule, MasterModule, UtilitiesModule]
})

export class ApiModule { }
