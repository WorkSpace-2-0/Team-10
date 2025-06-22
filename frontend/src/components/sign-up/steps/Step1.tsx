import { Field } from "formik";

type Step1Props = {
  errors: any;
  touched: any;
};

const Step1Username = ({ errors, touched }: Step1Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">Step 1: Username</h2>
      <Field
        name="username"
        type="text"
        placeholder="Enter username"
        className="border-2 rounded-lg p-2"
      />
      {errors.username && touched.username && (
        <div className="text-red-500 text-sm">{errors.username}</div>
      )}
    </div>
  );
};

export default Step1Username;
