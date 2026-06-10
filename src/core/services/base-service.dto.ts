import { createZodDto } from "nestjs-zod";
import { z } from 'zod';

const paginationSchema = z.object({
  search: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).optional().default(10)
})

export class PaginationQueryDto extends createZodDto(paginationSchema) { }
