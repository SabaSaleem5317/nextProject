'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProfileDisplay from '../Display/ProfileDisplay';
import AddressDisplay from '../Display/AddressDisplay';
import JobDisplay from '../Display/JobDisplay';
import ProfileForm from '../Forms/ProfileForm';
import AddressForm from '../Forms/AddressForm';
import JobForm from '../Forms/JobForm';
import { FormData, formSchemas } from '../types/form';
import { saveToStorage, getFromStorage } from '../../utility/storage';
import Tabs from '../Components/Tabs';

type Nullable<T> = { [K in keyof T]: T[K] | null };

const tabs = ['Personal Details', 'Address Details', 'Job Details'];
const defaultFormValues: FormData = {
  personal: {
    name: '',
    email: '',
    phoneNumber: '',
    webUrl: '',
    dateofBirth: new Date(),
    gender: '',
  },
  address: {
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    addressType: '',
  },
  job: {
    jobTitle: '',
    company: '',
    experience: 0,
    industry: '',
    skills: [],
  },
};
export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [savedData, setSavedData] = useState<Nullable<FormData>>({
    personal: null,
    address: null,
    job: null,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchemas),
    mode: 'onTouched',
    defaultValues: {
      personal: savedData?.personal || defaultFormValues.personal,
      address: savedData?.address || defaultFormValues.address,
      job: savedData?.job || defaultFormValues.job,
    },
  });

  const handleSavedData = () => {
    const personalStored = getFromStorage('profileData');
    const addressStored = getFromStorage('addressData');
    const jobStored = getFromStorage('jobData');

    const personalData = personalStored
      ? {
          ...personalStored,
          dateofBirth: personalStored.dateofBirth
            ? new Date(personalStored.dateofBirth)
            : new Date(),
        }
      : defaultFormValues.personal;

    const addressData = addressStored || defaultFormValues.address;

    const jobData = jobStored || defaultFormValues;

    setSavedData({
      personal: personalStored
        ? { ...personalStored, dateofBirth: personalData.dateofBirth }
        : null,
      address: addressStored || null,
      job: jobStored || null,
    });
    form.reset({
      personal: personalData,
      address: addressData,
      job: jobData,
    });
  };

  useEffect(() => {
    handleSavedData();
  }, [form]);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
  };
  const handlePersonalData = (data: FormData) => {
    const { personal } = data;
    setSavedData((prev) => ({
      ...prev,
      personal,
    }));
    setEditMode(false);
    saveToStorage('profileData', personal);
  };

  const handleAddressData = (data: FormData) => {
    const { address } = data;
    setSavedData((prev) => ({
      ...prev,
      address,
    }));
    setEditMode(false);
    saveToStorage('addressData', address);
  };

  const handleJobData = (data: FormData) => {
    const { job } = data;
    setSavedData((prev) => ({
      ...prev,
      job,
    }));
    setEditMode(false);
    saveToStorage('jobData', job);
  };
  return (
    <div>
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabs={tabs} />

      <div className="p-6 my-10 mx-auto max-w-xl border-2 border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{tabs[activeTab]}</h1>
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editMode ? 'View Profile' : 'Edit Profile'}
          </button>
        </div>
        {activeTab === 0 &&
          (editMode ? (
            <ProfileForm onSubmit={form.handleSubmit(handlePersonalData)} control={form.control} />
          ) : savedData.personal ? (
            <ProfileDisplay data={savedData.personal} />
          ) : (
            <p className="text-gray-500">No data available. Please edit your profile.</p>
          ))}
        {activeTab === 1 &&
          (editMode ? (
            <AddressForm onSubmit={form.handleSubmit(handleAddressData)} control={form.control} />
          ) : savedData.address ? (
            <AddressDisplay data={savedData.address} />
          ) : (
            <p className="text-gray-500">No profile data available. Please edit your profile.</p>
          ))}

        {activeTab === 2 &&
          (editMode ? (
            <JobForm onSubmit={form.handleSubmit(handleJobData)} control={form.control} />
          ) : savedData.job ? (
            <JobDisplay data={savedData.job} />
          ) : (
            <p className="text-gray-500">No data available. Please edit your profile.</p>
          ))}
      </div>
    </div>
  );
}
