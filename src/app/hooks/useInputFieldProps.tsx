import { Control, UseControllerReturn } from "react-hook-form";
import InputField from "../Components/InputField";

export default function useInputFieldProps<T extends Record<string, unknown>>(
  fieldName: keyof T,
  props: { placeholder?: string; type?: string; label?: string; select?: boolean; children?: React.ReactNode } = {},
  control: Control<T>
) {
  return {
    name: fieldName,
    control,
    render: ({ field, fieldState }: UseControllerReturn<T>) => (
      <InputField
        {...field}
        {...props}
        errorMessage={fieldState.error?.message}
      />
    ),
  };
}