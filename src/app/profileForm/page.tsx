import InputField from "../input/inputfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, FormData } from "../types/form";



export default function ProfileForm( { onSubmit }: { onSubmit: (data: FormData) => void }) {

 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Saba",
      email: "sabasaleem509@gmail.com",
      phoneNumber: "",
      webUrl: "",
      experience: 0,
    },
  });

  const nameField = register("name");
  const emailField = register("email");
  const phoneField = register("phoneNumber");
  const webUrlField = register("webUrl");
  const experienceField = register("experience", { valueAsNumber: true });


  return(
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="name"
            placeholder="Name"
            type="text"
            error={errors.name?.message}
            onChange={nameField.onChange}
            ref={nameField.ref}
          />

          <InputField
            name="email"
            placeholder="Email"
            type="email"
            error={errors.email?.message}
            onChange={emailField.onChange}
            ref={emailField.ref}
          />

          <InputField
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            error={errors.phoneNumber?.message}
            onChange={phoneField.onChange}
            ref={phoneField.ref}
          />

          <InputField
            name="webUrl"
            placeholder="Website URL (optional)"
            type="url"
            error={errors.webUrl?.message}
            onChange={webUrlField.onChange}
            ref={webUrlField.ref}
          />

          <InputField
            name="experience"
            placeholder="Years of Experience"
            type="number"
            error={errors.experience?.message}
            onChange={experienceField.onChange}
            ref={experienceField.ref}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </form>
  )
}
