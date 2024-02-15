import { z } from "zod"

export const contactSchema = z.object({
  firstName: z.string().min(1, {
    message: "FirstName must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "LastName must be at least 1 character.",
  }),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  email: z.string().email().min(10),
  message: z.string().min(10).max(150, {
    message: "Exceed limitation, leave contact and we will reply ASAP",
  }),
})
