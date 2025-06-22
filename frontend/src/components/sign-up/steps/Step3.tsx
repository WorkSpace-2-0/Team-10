import { Field } from "formik";

type Step3Props = {
  errors: any;
  touched: any;
};

const Step3GoingOut = ({ errors, touched }: Step3Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">Step 3: Profile - Going Out</h2>
      <div className="flex gap-4">
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field
            type="radio"
            name="goingOut"
            value="option1"
            className="mr-2"
          />
          Option 1
        </label>
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field
            type="radio"
            name="goingOut"
            value="option2"
            className="mr-2"
          />
          Option 2
        </label>
      </div>
      {errors.goingOut && touched.goingOut && (
        <div className="text-red-500 text-sm">{errors.goingOut}</div>
      )}
    </div>
  );
};

export default Step3GoingOut;
