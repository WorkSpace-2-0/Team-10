import React, { use } from "react";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";

const StepNavigation = ({ values, setStep, handleSubmit, loading }: any) => {
  const { validateForm, setTouched } = useFormikContext<any>();
  const router = useRouter();

  const handleNext = async () => {
    const errors = await validateForm();

    const fieldsPerStep: Record<number, string[]> = {
      1: ["username"],
      2: ["email", "password", "confirmPassword"],
      3: ["goingOut"],
      4: ["weekend"],
      5: ["hobby"],
    };

    const fields = fieldsPerStep[values.step] || [];

    setTouched(Object.fromEntries(fields.map((field) => [field, true])), true);

    const hasStepErrors = fields.some((field) => errors[field]);

    if (values.step === 2 && values.emailExists) {
      return; 
    }

    if (!hasStepErrors) {
      setStep(values.step + 1);
    }
  };

  const handleBack = () => {
    if (values.step > 1) {
      setStep(values.step - 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mt-6 flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        <span className="text-gray-700">← Буцах</span>
      </button>

      {values.step < 5 ? (
        <button
          type="button"
          onClick={handleNext}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <div className="text-neutral-900 text-sm font-medium">
            Үргэлжлүүлэх
          </div>
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-lg transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Илгээх
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
