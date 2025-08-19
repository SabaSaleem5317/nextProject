import { Control, Controller } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Country, State, City } from 'country-state-city';
import { FormData } from '../types/form';
import useInputFieldProps from '../hooks/useInputFieldProps';

interface AddressFormProps {
  control: Control<FormData>;
}

const cities = new Set(City.getAllCities().map((item) => item.name));
const states = new Set(State.getAllStates().map((item) => item.name));
const countries = new Set(Country.getAllCountries().map((item) => item.name));

export default function AddressForm({ control }: AddressFormProps) {
  return (
    <div>
      <Controller
        {...useInputFieldProps('address.streetAddress', control, { placeholder: 'Street Address' })}
      />
      <Controller
        {...useInputFieldProps('address.zipcode', control, { placeholder: 'Zip Code' })}
      />
      <Controller
        name="address.city"
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
        name="address.state"
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
        name="address.country"
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
        name="address.addressType"
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
    </div>
  );
}
