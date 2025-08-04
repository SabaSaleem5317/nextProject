"use client";
import InputField from "../Components/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller} from "react-hook-form";
import { jobSchema, jobData } from "../types/form";
import {TextField} from "@mui/material";
import { Autocomplete } from "@mui/material";

type JobFormProps = {
  jobSavedData: jobData | null;
  onSubmit: (data: jobData) => void;
};


export default function JobForm( { jobSavedData, onSubmit }: JobFormProps) {
const industries=["Information Technology","Business","Marketing","Health Care","Engineering"]

 const {
    control, 
    handleSubmit,
  } = useForm<jobData>({
    resolver: zodResolver(jobSchema),
    mode: "onTouched",
    defaultValues:jobSavedData || {
      jobTitle: "",
      company: "",
      experience: 0,
      industry:"",
    },
  });




 const createInputFieldProps= (
  fieldName: keyof jobData,
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
            {...createInputFieldProps("jobTitle", { placeholder: "Job Title" })}
          />
        <Controller
            {...createInputFieldProps("company", { placeholder: "Company Name"})}
          />  
    
         <Controller
            {...createInputFieldProps("experience", { placeholder: "Experience (years)", type: "number" })}
         />
      <Controller
        name="industry"
        control={control}
        render={({ field,fieldState}) => (
          <Autocomplete
            options={industries}
            value={field.value || ""}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Industry"
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />
          <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          </div>
        </form>
  )
}

