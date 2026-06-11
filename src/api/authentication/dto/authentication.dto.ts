import { createZodDto } from "nestjs-zod";
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export class UserLoginDto extends createZodDto(loginSchema) { }

