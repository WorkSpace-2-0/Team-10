"use client";

import { useProfileForm } from "./hooks/useProfileForm";
import ProfileLeftInputs from "./components/ProfileLeftInputs";
import ProfileRightSelections from "./components/ProfileRightSelections";
import Header from "../../components/Header";

const Profile = () => {
  const { formData, handleChange, toggleSelect, handleSubmit } =
    useProfileForm();

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="w-screen h-screen bg-neutral-100 flex justify-center pt-20 pb-12 px-6"
      >
        <div className="w-[1104px] bg-white p-8 rounded-xl space-y-6">
          <h1 className="text-2xl font-semibold">Таны мэдээлэл</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProfileLeftInputs
              formData={formData}
              handleChange={handleChange}
            />
            <ProfileRightSelections
              formData={formData}
              toggleSelect={toggleSelect}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="bg-gradient-to-b from-[#AAC9FF] to-[#6D9BFF] text-white px-10 py-2 rounded-xl"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
