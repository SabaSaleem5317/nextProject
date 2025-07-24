import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type InputFieldProps = TextFieldProps & {
  errorMessage?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <TextField
        variant="outlined"
        className="mt-4"
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        inputRef={ref} 
        {...props}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
