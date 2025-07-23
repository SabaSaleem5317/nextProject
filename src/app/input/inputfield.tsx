import React from "react";

type InputFieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, placeholder, type = "text", error, value, onChange }, ref) => {
    return (
      <div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full border p-2 rounded"
          value={value}
          onChange={onChange}
          ref={ref}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;



