import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormData } from '../types/form';
import { formSchemas } from '../types/form';
import ProfileForm from '../Forms/ProfileForm';
import AddressForm from '../Forms/AddressForm';
import JobForm from '../Forms/JobForm';

type ParentFormProps = {
  activeTab: number;
  savedData: FormData;
  onSubmit: (section: keyof FormData, data: unknown) => void;
  setActiveTab: (tabIndex: number) => void;
};

export default function ParentForm({
  activeTab,
  savedData,
  onSubmit,
  setActiveTab,
}: ParentFormProps) {
  const { control, handleSubmit, reset, getValues, trigger } = useForm<FormData>({
    defaultValues: savedData,
    shouldUnregister: false,
    resolver: zodResolver(formSchemas),
    mode: 'onTouched',
  });

  const tabKey: keyof FormData = activeTab === 0 ? 'personal' : activeTab === 1 ? 'address' : 'job';

  useEffect(() => {
    reset(savedData);
  }, [savedData, reset]);

  const handleValidSubmit = async () => {
    if (tabKey === 'address') {
      const personalValid = await trigger('personal');
      if (!personalValid) {
        setActiveTab(0);
        return;
      }
    }
    if (tabKey === 'job') {
      const personalValid = await trigger('personal');
      if (!personalValid) {
        setActiveTab(0);
        return;
      }
      const addressValid = await trigger('address');
      if (!addressValid) {
        setActiveTab(1);
        return;
      }
    }

    const formValues = getValues();
    onSubmit(tabKey, formValues[tabKey]);
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-4">
      {activeTab === 0 && <ProfileForm control={control} />}
      {activeTab === 1 && <AddressForm control={control} />}
      {activeTab === 2 && <JobForm control={control} />}

      <button
        type="submit"
        className="px-4 py-2 mt-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save
      </button>
    </form>
  );
}
