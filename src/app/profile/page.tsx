"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import InputField from "../input/inputfield";
import Textfield from "../text/textfield";
import { formSchema, FormData } from "../types/form";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [savedData, setSavedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Saba",
      email: "sabasaleem509@gmail.com",
      phoneNumber: "",
      webUrl: "",
      experience: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    setSavedData(data);
    setEditMode(false);
    reset(data);
  };

  return (
    <div className="p-6 my-10 mx-auto max-w-xl border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editMode ? "View Profile" : "Edit Profile"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="name"
            placeholder="Name"
            type="text"
            error={errors.name?.message}
            value={watch("name")}
            onChange={register("name").onChange}
            inputRef={register("name").ref}
          />

          <InputField
            name="email"
            placeholder="Email"
            type="email"
            error={errors.email?.message}
            value={watch("email")}
            onChange={register("email").onChange}
            inputRef={register("email").ref}
          />

          <InputField
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            error={errors.phoneNumber?.message}
            value={watch("phoneNumber")}
            onChange={register("phoneNumber").onChange}
            inputRef={register("phoneNumber").ref}
          />

          <InputField
            name="webUrl"
            placeholder="Website URL (optional)"
            type="url"
            error={errors.webUrl?.message}
            value={watch("webUrl")}
            onChange={register("webUrl").onChange}
            inputRef={register("webUrl").ref}
          />

          <InputField
            name="experience"
            placeholder="Years of Experience"
            type="number"
            error={errors.experience?.message}
            value={watch("experience")}
            onChange={register("experience", { valueAsNumber: true }).onChange}
            inputRef={register("experience", { valueAsNumber: true }).ref}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </form>
      ) : savedData ? (
        <div className="space-y-2">
          <Textfield label="Name" value={savedData?.name} />
          <Textfield label="Email" value={savedData?.email} />
          <Textfield label="Phone Number" value={savedData?.phoneNumber} />
          <Textfield label="Website URL" value={savedData?.webUrl} />
          <Textfield label="Experience" value={savedData?.experience} />
        </div>
      ) : (
        <p className="text-gray-500">
          No profile data available. Please edit your profile.
        </p>
      )}
    </div>
  );
}
