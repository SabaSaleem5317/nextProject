
type TextDisplayProps = {
  label: string;
  value: string | number | undefined | Date;
};
export default function TextDisplay({ label, value }: TextDisplayProps) {
   const displayValue = value instanceof Date ? value.toLocaleDateString() : value ?? "N/A";
   console.log(displayValue)

  return (
    <p>
      <strong>{label}:</strong> {displayValue}
    </p>
  );
}

