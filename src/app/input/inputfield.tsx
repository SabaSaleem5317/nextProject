type InputFieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>; // optional
};


export default function InputField({
  name,
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  inputRef,
}: InputFieldProps) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border p-2 rounded"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
