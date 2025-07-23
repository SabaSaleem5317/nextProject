import React from "react";

type InputFieldProps = {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error,...props}, ref) => {
    return (
      <div>
        <input
          {...props}
          className="w-full border p-2 rounded"
          ref={ref}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;



