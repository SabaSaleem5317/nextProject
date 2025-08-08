import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { personalSchema, personalData } from '../types/form';
import useInputFieldProps from '../hooks/useInputFieldProps';

type ProfileFormProps = {
  personalSavedData: personalData | null;
  onSubmit: (data: personalData) => void;
};

export default function ProfileForm({ personalSavedData, onSubmit }: ProfileFormProps) {
  const { control, handleSubmit } = useForm<personalData>({
    resolver: zodResolver(personalSchema),
    mode: 'onTouched',
    defaultValues: personalSavedData || {
      name: '',
      email: '',
      phoneNumber: '',
      webUrl: '',
      dateofBirth: new Date(),
      gender: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller {...useInputFieldProps('name', control, { placeholder: 'Name' })} />
      <Controller
        {...useInputFieldProps('email', control, { placeholder: 'Email', type: 'email' })}
      />
      <Controller
        {...useInputFieldProps('phoneNumber', control, {
          placeholder: 'Phone Number',
          type: 'tel',
        })}
      />
      <Controller
        {...useInputFieldProps('webUrl', control, { placeholder: 'Website URL', type: 'url' })}
      />
      <Controller
        {...useInputFieldProps('dateofBirth', control, {
          placeholder: 'Date of Birth',
          type: 'date',
        })}
      />
      <Controller
        name="gender"
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
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save
      </button>
    </form>
  );
}
