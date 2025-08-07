type TextfieldProps = {
  label: string;
  value: string | number | undefined;
};
export default function Textfield({ label, value }: TextfieldProps) {
  return (
    <p>
      <strong>{label}:</strong> {value ?? 'N/A'}
    </p>
  );
}
