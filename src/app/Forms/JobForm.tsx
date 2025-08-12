import { Controller, Control } from 'react-hook-form';
import { TextField, Autocomplete, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import useInputFieldProps from '../hooks/useInputFieldProps';
import { FormData } from '../types/form';

interface JobFormProps {
  onSubmit: () => void;
  control: Control<FormData>;
}

const jobOptions = [
  'Associate Software Engineer',
  'Sr. Software Engineer',
  'Principal Software Engineer',
  'Solutions Architect',
  'Product Manager',
];
const industries = [
  'Information Technology',
  'Business',
  'Marketing',
  'Health Care',
  'Engineering',
];
const skills = ['JavaScript', 'Python', 'React', 'Node.js'];

export default function JobForm({ onSubmit, control }: JobFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Controller
        {...useInputFieldProps('job.jobTitle', control, {
          label: 'Job Title',
          select: true,
          children: jobOptions.map((title) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          )),
        })}
      />
      <Controller {...useInputFieldProps('job.company', control, { placeholder: 'Company' })} />

      <Controller
        {...useInputFieldProps('job.experience', control, {
          placeholder: 'Experience (years)',
          type: 'number',
        })}
      />
      <Controller
        name="job.industry"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            options={industries}
            value={field.value || ''}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField {...params} label="Industry" helperText={fieldState.error?.message} />
            )}
          />
        )}
      />
      <Controller
        name="job.skills"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            multiple
            options={skills}
            value={field.value || []}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField {...params} label="Skills" helperText={fieldState.error?.message} />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option}>
                <Checkbox checked={selected} key={option} />
                {option}
              </li>
            )}
          />
        )}
      />
      <div>
        <button
          type="submit"
          className="px-4 py-2 mt-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
