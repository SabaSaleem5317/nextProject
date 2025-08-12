import { Control, Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { FormData } from '../types/form';
import useInputFieldProps from '../hooks/useInputFieldProps';

interface ProfileFormProps {
  onSubmit: () => void;
  control: Control<FormData>;
}

export default function ProfileForm({ onSubmit, control }: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Controller {...useInputFieldProps('personal.name', control, { placeholder: 'Name' })} />
      <Controller
        {...useInputFieldProps('personal.email', control, { placeholder: 'Email', type: 'email' })}
      />
      <Controller
        {...useInputFieldProps('personal.phoneNumber', control, {
          placeholder: 'Phone Number',
          type: 'tel',
        })}
      />
      <Controller
        {...useInputFieldProps('personal.webUrl', control, {
          placeholder: 'Website URL',
          type: 'url',
        })}
      />
      <Controller
        {...useInputFieldProps('personal.dateofBirth', control, {
          placeholder: 'Date of Birth',
          type: 'date',
        })}
      />
      <Controller
        name="personal.gender"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl component="fieldset" error={!!fieldState.error}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row {...field}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
          </FormControl>
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
