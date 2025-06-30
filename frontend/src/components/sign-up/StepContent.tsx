import React from "react";
import Step1Username from "./steps/Step1";
import Step2Account from "./steps/Step2";
import Step3GoingOut from "./steps/Step3";
import Step4Weekend from "./steps/Step4";
import Step5Hobby from "./steps/Step5";
import SuccessScreen from "./steps/Step6";

const StepContent = ({ values, errors, touched, setFieldValue }: any) => {
  console.log("Formik values:", values);
  switch (values.step) {
    case 1:
      return <Step1Username errors={errors} touched={touched} />;
    case 2:
      return <Step2Account errors={errors} touched={touched} />;
    case 3:
      return (
        <Step3GoingOut
          errors={errors}
          touched={touched}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    case 4:
      return (
        <Step4Weekend
          errors={errors}
          touched={touched}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    case 5:
      return (
        <Step5Hobby
          errors={errors}
          touched={touched}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    case 6:
      return <SuccessScreen />;
  }
};

export default StepContent;
