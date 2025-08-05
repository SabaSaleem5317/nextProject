import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputFieldProps = TextFieldProps & {
  errorMessage?: string;
};
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ errorMessage = '', children, ...props }, ref) => {
    return (
      <div className="mb-4">
        <TextField
          variant="outlined"
          fullWidth
          error={!!errorMessage}
          helperText={errorMessage}
          inputRef={ref}
          {...props}
        >
          {props.select && children}
        </TextField>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
