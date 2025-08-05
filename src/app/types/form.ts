import * as z from "zod";
export const personalSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  webUrl: z.string().url("Invalid URL"),
  jobTitle: z.string().nonempty("Job title is required"),
  dateofBirth:z.coerce.date<Date>("date field required"),
  gender:z.string(),

});

export const addressSchema=z.object({
  streetAddress:z.string().nonempty("Address is required"),
  city:z.string().nonempty("City is required"),
  state:z.string().nonempty("State is required"),
  zipcode:z.string().length(5, "Zip code must be exactly 5 digits long."),
  country:z.string().nonempty("Country is required"),
  addressType:z.string(),

});

export const jobSchema=z.object({ 
  jobTitle: z.string().nonempty("Job title is required"),
  company:z.string().nonempty("Company name required"),
   experience: z.coerce.number<number>()
    .min(0, "Experience must be a positive number")
    .max(50, "Experience cannot exceed 50 years"),
  industry:z.string(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});


export type personalData = z.infer<typeof personalSchema>;
export type addressData=z.infer<typeof addressSchema>;
export type jobData=z.infer<typeof jobSchema>;
