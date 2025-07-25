import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type InputFieldProps = TextFieldProps & {
  errorMessage?: string;
};

export default  function InputField({ errorMessage, ...props }: InputFieldProps) 
{
    return (
      <div className="mb-4">
      <TextField
        variant="outlined"
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        {...props}
      />
      </div>
    );
  }
