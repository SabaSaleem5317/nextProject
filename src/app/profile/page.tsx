"use client";
import { useForm, UseFormRegister } from "react-hook-form";
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

type InputFieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  register?: UseFormRegister<FormData>;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  name,
  placeholder,
  type = "text",
  error,
  register,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full border p-2 rounded"
        {...(register ? register(name as keyof FormData) : { name, value, onChange })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

type TextfieldProps = {
  savedData: FormData;
  label: string;
  name: keyof FormData;
};
function Textfield({ savedData, label, name }: TextfieldProps) {
  return (
    <p>
      <strong>{label}:</strong> {savedData[name] ?? "N/A"}
    </p>
  );
}


export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [bio, setBio] = useState("");

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
            register={register}
            name="name"
            placeholder="Name"
            error={errors.name?.message}
          />
          <InputField
            register={register}
            name="email"
            placeholder="Email"
            type="email"
            error={errors.email?.message}
          />
          <InputField
            register={register}
            name="phoneNumber"
            placeholder="Phone Number (optional)"
            type="tel"
            error={errors.phoneNumber?.message}
          />
          <InputField
            register={register}
            name="webUrl"
            placeholder="Website URL"
            type="url"
            error={errors.webUrl?.message}
          />
          <InputField
            register={register}
            name="experience"
            placeholder="Years of Experience"
            type="number"
            error={errors.experience?.message}
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
          <Textfield savedData={savedData} label="Name" name="name" />
          <Textfield savedData={savedData} label="Email" name="email" />
          <Textfield savedData={savedData} label="Phone Number" name="phoneNumber" />
          <Textfield savedData={savedData} label="Website URL" name="webUrl" />
          <Textfield savedData={savedData} label="Experience" name="experience" />
          <InputField                    //to verify its use without react-hook-form
            name="bio"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}  
          />
        </div>
      ) : (
        <p className="text-gray-500">
          No profile data available. Please edit your profile.
        </p>
      )}
    </div>
  );
}
