import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Country, State, City } from 'country-state-city';
import { addressSchema, addressData } from '../types/form';
import useInputFieldProps from '../hooks/useInputFieldProps';

type AddressFormProps = {
  addressSavedData: addressData | null;
  onSubmit: (data: addressData) => void;
};

export default function AddressForm({ addressSavedData, onSubmit }: AddressFormProps) {
  const cities = new Set(City.getAllCities().map((item) => item.name));
  const states = new Set(State.getAllStates().map((item) => item.name));
  const countries = new Set(Country.getAllCountries().map((item) => item.name));

  const { control, handleSubmit } = useForm<addressData>({
    resolver: zodResolver(addressSchema),
    mode: 'onTouched',
    defaultValues: addressSavedData || {
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      addressType: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        {...useInputFieldProps('streetAddress', control, { placeholder: 'Street Address' })}
      />
      <Controller {...useInputFieldProps('zipcode', control, { placeholder: 'Zip Code' })} />
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            options={Array.from(cities)}
            value={field.value || ''}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            options={Array.from(states)}
            value={field.value || ''}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State/Province"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            options={Array.from(countries)}
            value={field.value || ''}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />
      <Controller
        name="addressType"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl component="fieldset" error={!!fieldState.error}>
            <FormLabel component="legend">Address Type</FormLabel>
            <RadioGroup row {...field}>
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
              <FormControlLabel value="Work" control={<Radio />} label="Work" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
