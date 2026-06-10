import { Controller } from '@nestjs/common';
import { CompaniesService } from './companies/companies.service';
import { BranchesService } from './branches/branches.service';
import { DepartmentsService } from './departments/departments.service';
import { PositionsService } from './positions/positions.service';
import { EmployeesService } from './employees/employees.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('master')
@ApiTags('Master Controller')
export class MasterController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly branchesService: BranchesService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService,
    private readonly employeesService: EmployeesService
  ) { }
}
