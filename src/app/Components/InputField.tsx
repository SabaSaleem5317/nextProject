import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputFieldProps = TextFieldProps & {
  errorMessage?: string;
};
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ errorMessage, value, children, ...props }, ref) => {
    const formattedValue =
      props.type === 'date'
        ? (() => {
            if (value instanceof Date) {
              return value.toISOString().split('T')[0];
            } else if (typeof value === 'string') {
              return value;
            } else {
              return '';
            }
          })()
        : (value ?? '');
    return (
      <div className="mb-4">
        <TextField
          variant="outlined"
          fullWidth
          error={!!errorMessage}
          helperText={errorMessage}
          inputRef={ref}
          value={formattedValue}
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
