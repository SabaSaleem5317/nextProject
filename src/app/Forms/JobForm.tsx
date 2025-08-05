import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller} from "react-hook-form";
import { jobSchema, jobData } from "../types/form";
import {TextField} from "@mui/material";
import { Autocomplete } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import useInputFieldProps from "../hooks/useInputFieldProps";

type JobFormProps = {
  jobSavedData: jobData | null;
  onSubmit: (data: jobData) => void;
};


export default function JobForm( { jobSavedData, onSubmit }: JobFormProps) {
const industries=["Information Technology","Business","Marketing","Health Care","Engineering"]
const skills=["JavaScript", "Python", "React", "Node.js"];


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
      skills : [''],
    },
  });


  return(
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
            {...useInputFieldProps("jobTitle", { placeholder: "Job Title" },control)}
          />
        <Controller
            {...useInputFieldProps("company", { placeholder: "Company Name"},control)}
          />  
    
         <Controller
            {...useInputFieldProps("experience", { placeholder: "Experience (years)", type: "number" },control)}
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
      <Controller
        name="skills"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            multiple
            options={skills}
            value={field.value || []}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills"
                helperText={fieldState.error?.message}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option}>
                <Checkbox checked={selected} key={`checkbox-${option}`} />
                {option}
              </li>
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

