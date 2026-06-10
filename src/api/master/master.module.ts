import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/companies.controller';
import { BranchesController } from './branches/branches.controller';
import { DepartmentsController } from './departments/departments.controller';
import { PositionsController } from './positions/positions.controller';
import { EmployeesController } from './employees/employees.controller';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';
import { CompaniesService } from './companies/companies.service';
import { BranchesService } from './branches/branches.service';
import { DepartmentsService } from './departments/departments.service';
import { PositionsService } from './positions/positions.service';
import { EmployeesService } from './employees/employees.service';

@Module({
  controllers: [CompaniesController, BranchesController, DepartmentsController, PositionsController, EmployeesController],
  providers: [CompaniesService, BranchesService, DepartmentsService, PositionsService, EmployeesService],
  imports: [CompaniesModule, BranchesModule, DepartmentsModule, PositionsModule, EmployeesModule],
})
export class MasterModule { }
