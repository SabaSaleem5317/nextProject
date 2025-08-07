'use client';

import { useEffect,useState } from "react";
import ProfileDisplay from "../Components/ProfileDisplay";
import ProfileForm from "../Components/ProfileForm";
import {FormData } from "../types/form";
import { saveToStorage, getFromStorage } from '../../utility/storage';
export default function ProfilePage() {
const [editMode, setEditMode] = useState(false);
const [savedData, setSavedData] = useState<FormData | null>(null)

useEffect(() => {
const stored = getFromStorage("profileData");
  if (stored) {
    setSavedData(stored);
  }
}, []);
  const onSubmit = (data: FormData) => {
    setSavedData(data);
    saveToStorage("profileData", data);
    setEditMode(false);
  };

  return (
    <div className="p-6 my-10 mx-auto max-w-xl border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editMode ? 'View Profile' : 'Edit Profile'}
        </button>
      </div>

      {editMode ? (
        <ProfileForm saveddata={savedData} onSubmit={onSubmit} />
      ) : (
        savedData && <ProfileDisplay data={savedData} />
      )}
      {!editMode && !savedData && (
        <p className="text-gray-500">No profile data available. Please edit your profile.</p>
      )}
    </div>
  );
}
