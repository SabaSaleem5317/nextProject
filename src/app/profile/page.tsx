'use client';

import { useEffect, useState } from 'react';
import ParentForm from '../ParentForm/page';
import ProfileDisplay from '../Display/ProfileDisplay';
import AddressDisplay from '../Display/AddressDisplay';
import JobDisplay from '../Display/JobDisplay';
import Tabs from '../Components/Tabs';
import { saveToStorage, getFromStorage } from '../../utility/storage';
import type { FormData } from '../types/form';

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
  const [savedData, setSavedData] = useState<FormData>(defaultFormValues);
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    const stored = getFromStorage('Form Data') as FormData | null;
    if (stored) {
      setSavedData(stored);
      setHasUserData(true);
    }
  }, []);

  const handleSave = (tab: keyof FormData, tabData: unknown) => {
    const updated = { ...savedData, [tab]: tabData };
    setSavedData(updated);
    saveToStorage('Form Data', updated);
    setHasUserData(true);
    setEditMode(false);
  };

  return (
    <div>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} tabs={tabs} />

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

        {editMode ? (
          <ParentForm
            activeTab={activeTab}
            savedData={savedData}
            onSubmit={handleSave}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === 0 ? (
          hasUserData ? (
            <ProfileDisplay data={savedData.personal} />
          ) : (
            <p className="text-gray-500">No data available. Please edit your profile.</p>
          )
        ) : activeTab === 1 ? (
          hasUserData ? (
            <AddressDisplay data={savedData.address} />
          ) : (
            <p className="text-gray-500">No data available. Please edit your profile.</p>
          )
        ) : activeTab === 2 ? (
          hasUserData ? (
            <JobDisplay data={savedData.job} />
          ) : (
            <p className="text-gray-500">No data available. Please edit your profile.</p>
          )
        ) : null}
      </div>
    </div>
  );
}
