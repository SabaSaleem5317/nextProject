import Textfield from "./TextField";
import { FormData } from "../types/form";

export default function ProfileDisplay({ data }: { data: FormData }) {
  return (
    <div className="space-y-2">
      <Textfield label="Name" value={data.name} />
      <Textfield label="Email" value={data.email} />
      <Textfield label="Phone Number" value={data.phoneNumber} />
      <Textfield label="Website URL" value={data.webUrl} />
      <Textfield label="Experience" value={data.experience} />
    </div>
  );
}