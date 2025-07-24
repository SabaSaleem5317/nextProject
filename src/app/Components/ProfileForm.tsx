import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, FormData } from "../types/form"

type ProfileFormProps = {
  saveddata: FormData | null;
  onSubmit: (data: FormData) => void;
};

export default function ProfileForm( { saveddata, onSubmit }: ProfileFormProps) {
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues:saveddata || {
      name: "",
      email: "",
      phoneNumber: "",
      webUrl: "",
      experience: 0,
    },
  });

  
  return(
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            placeholder="Name"
            type="text"
            errorMessage={errors.name?.message}
            {...register("name")}
          />

          <InputField
            placeholder="Email"
            type="email"
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <InputField
            placeholder="Phone Number"
            type="tel"
            errorMessage={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />

          <InputField
            placeholder="Website URL"
            type="url"
            errorMessage={errors.webUrl?.message}
            {...register("webUrl")}
           
          />

          <InputField
            placeholder="Years of Experience"
            type="number"
            errorMessage={errors.experience?.message}
            {...register("experience", { valueAsNumber: true })}
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
