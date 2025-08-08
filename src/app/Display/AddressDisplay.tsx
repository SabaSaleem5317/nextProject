import TextDisplay from '../Components/TextDisplay';
import { addressData } from '../types/form';

export default function AddressDisplay({ data }: { data: addressData }) {
  return (
    <div className="space-y-2">
      <TextDisplay label="Street Address" value={data.streetAddress} />
      <TextDisplay label="State" value={data.state} />
      <TextDisplay label="City" value={data.city} />
      <TextDisplay label="Zip Code" value={data.zipcode} />
      <TextDisplay label="Country" value={data.country} />
      <TextDisplay label="Address Type" value={data.addressType} />
    </div>
  );
}
