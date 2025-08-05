"use client";

import { useEffect,useState } from "react";
import ProfileDisplay from "../Display/ProfileDisplay";
import AddressDisplay from "../Display/AddressDisplay";
import JobDisplay from "../Display/JobDisplay";
import ProfileForm from "../Forms/ProfileForm";
import AddressForm from "../Forms/AddressForm";
import {personalData ,addressData, jobData} from "../types/form";
import { saveToStorage, getFromStorage } from '../../utility/storage';
import JobForm from "../Forms/JobForm";
import Tabs from "../Components/tabs";

export default function ProfilePage() {
const [editMode, setEditMode] = useState(false);
const [personalSavedData, setpersonalSavedData] = useState<personalData | null>(null);
const [addressSavedData,setaddressSavedData]=useState<addressData | null>(null)
const [jobSavedData,setjobSavedData]=useState<jobData | null>(null)
const tabs=["Personal Details","Address Details","Job Details"];
const [activeTab,setactiveTab]=useState(0);



useEffect(() => {
const personalDatastored = getFromStorage("profileData");
const addressStored = getFromStorage("addressData");
const jobStored = getFromStorage("jobData");
if (personalDatastored) {
    setpersonalSavedData(personalDatastored);
  }
if (addressStored) {
    setaddressSavedData(addressStored);
  }
if (jobStored) {
    setjobSavedData(jobStored);
  }
}, []);

 
  const handlePersonalDataSubmit = (data: personalData) => {
    setpersonalSavedData(data);
    saveToStorage("profileData", data);
    setEditMode(false);
  };
    const handleAddressDataSubmit = (data: addressData) => {
    setaddressSavedData(data);
    saveToStorage("addressData", data);
    setEditMode(false);
  };
   
   const handleJobDataSubmit=(data:jobData)=>{
    setjobSavedData(data);
    saveToStorage("jobData", data);
    setEditMode(false);
   }

  const handleTabClick=(i:number)=>{
   setactiveTab(i);
  }

  return (
    <div>
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabs={tabs} />
    
    <div className="p-6 my-10 mx-auto max-w-xl border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{tabs[activeTab]}</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editMode ? "View Profile" : "Edit Profile"}
        </button>
      </div>
      {activeTab === 0 && (
        editMode ? (
          <ProfileForm personalSavedData={personalSavedData} onSubmit={handlePersonalDataSubmit} />
        ) : personalSavedData ? (
          <ProfileDisplay data={personalSavedData} />
        ) : (
          <p className="text-gray-500">
            No data available. Please edit your profile.
          </p>
        )
      )}
     {activeTab === 1 && (
        editMode ? (
          <AddressForm addressSavedData={addressSavedData} onSubmit={handleAddressDataSubmit} />
        ) : addressSavedData ? (
          <AddressDisplay data={addressSavedData} />
        ) : (
          <p className="text-gray-500">
            No profile data available. Please edit your profile.
          </p>
        )
      )}

     {activeTab === 2 && (
        editMode ? (
          <JobForm jobSavedData={jobSavedData} onSubmit={handleJobDataSubmit} />
        ) : jobSavedData ? (
          <JobDisplay data={jobSavedData} />
        ) : (
          <p className="text-gray-500">
            No data available. Please edit your profile.
          </p>
        )
      )}
   

    </div>
     </div>
  );
}
