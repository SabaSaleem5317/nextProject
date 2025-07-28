import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller } from "react-hook-form";
import { formSchema, FormData } from "../types/form";
import { MenuItem } from "@mui/material";



type ProfileFormProps = {
  saveddata: FormData | null;
  onSubmit: (data: FormData) => void;
};
const jobOptions = [
  "Associate Software Engineer",
  "Sr. Software Engineer",
  "Principal Software Engineer",
  "Solutions Architect",
  "Product Manager",
];

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
      jobTitle: "",
    },
  });


 const createInputFieldProps= (
  fieldName: keyof FormData,
  props: {placeholder?: string; type?: string, label?:string,select?:boolean,
    children?: React.ReactNode} = {}
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
            {...createInputFieldProps("name", { placeholder: "Name" })}
          />
          <Controller
            {...createInputFieldProps("email", { placeholder: "Email", type: "email" })}
          />  
        
          <Controller
           {...createInputFieldProps("phoneNumber", { placeholder: "Phone Number", type: "tel" })}
          />  
          <Controller
            {...createInputFieldProps("webUrl", { placeholder: "Website URL", type: "url" })}
          />  
         <Controller
            {...createInputFieldProps("experience", { placeholder: "Experience (years)", type: "number" })}
         />
         <Controller 
         {...createInputFieldProps("dateofBirth",{placeholder:"Date of Birth",type:"date"})}
         />
          <Controller
        name="myRadioChoice"
        control={control}
        render={({ field }) => (
          <>
            <label>
              <input
                type="radio"
                value="Female"
                {...field} 
                checked={field.value === "choice1"} 
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Male"
                {...field}
                checked={field.value === "choice2"}
              />
              Male
            </label>
          </>
        )}
      />
         
         <Controller
           {...createInputFieldProps("jobTitle", {
              label: "Job Title",
              select: true,
              children: jobOptions.map((title) => (
                 <MenuItem key={title} value={title}>
                  {title}
                 </MenuItem>
                    )),
              })}
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

