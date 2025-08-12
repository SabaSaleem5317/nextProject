import TextDisplay from '../Components/TextDisplay';
import { jobData } from '../types/form';

export default function JobDisplay({ data }: { data: jobData }) {
  return (
    <div className="space-y-2">
      <TextDisplay label="Job Title" value={data.jobTitle} />
      <TextDisplay label="Company" value={data.company} />
      <TextDisplay label="Experience" value={data.experience} />
      <TextDisplay label="Industry" value={data.industry} />
      <TextDisplay
        label="Skills"
        value={
          data.skills && data.skills.length > 0 ? data.skills.join(', ') : 'No skills provided'
        }
      />
    </div>
  );
}
