import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(4, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  webUrl: z.string().url('Invalid URL'),
  experience: z.coerce
    .number<number>()
    .min(0, 'Experience must be a positive number')
    .max(50, 'Experience cannot exceed 50 years'),
  jobTitle: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
