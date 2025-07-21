"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  webUrl: z.string().url("Invalid URL"),
  experience: z.coerce.number()
    .min(0, "Experience must be a positive number")
    .max(50, "Experience cannot exceed 50 years"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [savedData, setSavedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
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
    console.log("data saved:", data);
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
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("phoneNumber")}
              placeholder="Phone Number (optional)"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <input
              {...register("webUrl")}
              placeholder="Website URL"
              className="w-full border p-2 rounded"
            />
            {errors.webUrl && <p className="text-red-500 text-sm">{errors.webUrl.message}</p>}
          </div>

          <div>
            <input
              type="number"
              {...register("experience")}
              placeholder="Years of Experience"
              className="w-full border p-2 rounded"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </form>
      ) : savedData ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {savedData.name}</p>
          <p><strong>Email:</strong> {savedData.email}</p>
          <p><strong>Phone Number:</strong> {savedData.phoneNumber || "N/A"}</p>
          <p><strong>Website:</strong> {savedData.webUrl}</p>
          <p><strong>Experience:</strong> {savedData.experience} years</p>
        </div>
      ) : (
        <p className="text-gray-500">No profile data available. Please edit your profile.</p>
      )}
    </div>
  );
}
