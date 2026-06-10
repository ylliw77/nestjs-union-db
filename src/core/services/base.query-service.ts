import { Prisma } from "generated/prisma/client";
import { PaginationQueryDto } from "./base-service.dto";

export class GenerateQuery<T> {
  constructor(
    private readonly dto: PaginationQueryDto & MappedQuery<T>,
    private readonly searchField: keyof T | (keyof T)[] | string[],
    private readonly whitelist: (keyof T)[]
  ) { }

  private buildNestedSearch(path: string, searchConfig: any) {
    const keys = path.split('.');
    const result = {};
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        current[key] = searchConfig;
      } else {
        current[key] = {};
        current = current[key];
      }
    }
    return result;
  }

  toPrisma() {
    const { page, limit, search } = this.dto;

    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const where: any = {};

    this.whitelist.forEach((key) => {
      const value = this.dto[key as string];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          where[key as string] = { in: value };
        } else {
          where[key as string] = value;
        }
      }
    });

    if (search && this.searchField) {
      const searchConfig = {
        contains: search,
        mode: 'insensitive' as const,
      };

      const fields = Array.isArray(this.searchField) ? this.searchField : [this.searchField];

      const searchConditions = fields.map((field) =>
        this.buildNestedSearch(field as string, searchConfig)
      );

      if (searchConditions.length > 1) {
        where['OR'] = searchConditions;
      } else {
        Object.assign(where, searchConditions[0]);
      }
    }

    return {
      take,
      skip,
      where: where as Prisma.Args<any, 'findMany'>['where']
    };
  }
}
