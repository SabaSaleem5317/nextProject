import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller} from "react-hook-form";
import { personalSchema ,personalData } from "../types/form";
import { MenuItem } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from "@mui/material/FormHelperText";
import useInputFieldProps from "../hooks/useInputFieldProps";


type ProfileFormProps = {
  personalSavedData: personalData | null;
  onSubmit: (data: personalData) => void;
};
const jobOptions = [
  "Associate Software Engineer",
  "Sr. Software Engineer",
  "Principal Software Engineer",
  "Solutions Architect",
  "Product Manager",
];

export default function ProfileForm( { personalSavedData, onSubmit }: ProfileFormProps) {
 const {
    control, 
    handleSubmit,
  } = useForm<personalData>({
    resolver: zodResolver(personalSchema),
    mode: "onTouched",
    defaultValues:personalSavedData || {
      name: "",
      email: "",
      phoneNumber: "",
      webUrl: "",
      dateofBirth:new Date(),
      gender:"",
    },
  });
  
  return(
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            {...useInputFieldProps("name", { placeholder: "Name" }, control)}
          />
          <Controller
            {...useInputFieldProps("email", { placeholder: "Email", type: "email" },control)}
          />  
          <Controller
           {...useInputFieldProps("phoneNumber", { placeholder: "Phone Number", type: "tel" }, control)}
          />  
          <Controller
            {...useInputFieldProps("webUrl", { placeholder: "Website URL", type: "url" },control)}
          />  
         <Controller 
         {...useInputFieldProps("dateofBirth",{placeholder:"Date of Birth",type:"date"},control)}
         />
          <Controller
              name="gender"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl component="fieldset" error={!!fieldState.error}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
                )}
            />
         <Controller
           {...useInputFieldProps("jobTitle", {
              label: "Job Title",
              select: true,
              children: jobOptions.map((title) => (
                 <MenuItem key={title} value={title}>
                  {title}
                 </MenuItem>
                    )),
              }, control)}
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

