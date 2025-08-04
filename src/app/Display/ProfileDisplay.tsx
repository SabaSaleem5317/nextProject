import TextDisplay from "../Components/TextDisplay";
import { personalData } from "../types/form";

export default function ProfileDisplay({ data }: { data: personalData }) {
  return (
    <div className="space-y-2">
      <TextDisplay label="Name" value={data.name} />
      <TextDisplay label="Email" value={data.email} />
      <TextDisplay label="Phone Number" value={data.phoneNumber} />
      <TextDisplay label="Website URL" value={data.webUrl} />
      <TextDisplay label="Job Title" value={data.jobTitle} />
     <TextDisplay label="Date of Birth" value={data.dateofBirth}/>
     <TextDisplay label="Gender" value={data.gender}/>
    </div>
  );
}