import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller } from "react-hook-form";
import { formSchema, FormData } from "../types/form"


type ProfileFormProps = {
  saveddata: FormData | null;
  onSubmit: (data: FormData) => void;
};

export default function ProfileForm( { saveddata, onSubmit }: ProfileFormProps) {
 const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues:saveddata || {
      name: "",
      email: "",
      phoneNumber: "",
      webUrl: "",
      experience: 0,
    },
  });
 
 console.log('profile form');

 const inputValidation= (
  fieldName: keyof FormData,
  props: { placeholder?: string; type?: string } = {}
) => {
  return {
    name: fieldName,
    control,
    render: ({ field, fieldState }:any) => (
      <InputField
        {...field}
        {...props}
        errorMessage={fieldState.error?.message}
      />
    ),
  };
};
  
  return(
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            {...inputValidation("name", { placeholder: "Name" })}
          />
          <Controller
            {...inputValidation("email", { placeholder: "Email", type: "email" })}
          />  
        
          <Controller
           {...inputValidation("phoneNumber", { placeholder: "Phone Number", type: "tel" })}
          />  
          <Controller
            {...inputValidation("webUrl", { placeholder: "Website URL", type: "url" })}
          />  
         <Controller
            {...inputValidation("experience", { placeholder: "Experience (years)", type: "number" })}
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
