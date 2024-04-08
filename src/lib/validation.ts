import { z } from "zod"

export const contactSchema = z.object({
  firstName: z.string().min(1, {
    message: "FirstName must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "LastName must be at least 1 character.",
  }),
  gender: z.enum(["male", "female", "non-binary", "other"]),
  email: z.string().email().min(10),
  message: z.string().min(10).max(150, {
    message: "Exceed limitation, leave contact and we will reply ASAP",
  }),
})

export const articleSchema = z.object({
  title: z.string().min(5).max(50),
  author: z.object({
    name: z.string().min(2),
    url: z.string().url(),
  }),
  coverPhoto: z.object({
    src: z.string().url().optional(),
    aspectRatio: z.coerce.number().optional(),
  }),
  tags: z
    .string()
    .regex(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/, "please using comma to split tag and no space between them")
    .optional(),
  hidden: z.boolean().default(false),
})
