import React from "react";

const StepNavigation = ({ values, setStep, handleSubmit, loading }: any) => {
  const handleNext = () => {
    if (values.step < 5) {
      setStep(values.step + 1);
    }
  };

  const handleBack = () => {
    if (values.step > 1) {
      setStep(values.step - 1);
    }
  };

  return (
    <div className="mt-6 flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        <span className="text-gray-700">← Back</span>
      </button>

      {values.step < 5 ? (
        <button
          type="button"
          onClick={handleNext}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <span className="text-gray-700">Next →</span>
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        ></button>
      )}
    </div>
  );
};

export default StepNavigation;
