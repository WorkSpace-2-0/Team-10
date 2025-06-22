import { Field } from "formik";

type Step2Props = {
  errors: any;
  touched: any;
};

const Step2Account = ({ errors, touched }: Step2Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">Step 2: Account Details</h2>
      <Field
        name="email"
        type="email"
        placeholder="Email"
        className="border-2 rounded-lg p-2"
      />
      {errors.email && touched.email && (
        <div className="text-red-500 text-sm">{errors.email}</div>
      )}
      <Field
        name="password"
        type="password"
        placeholder="Password"
        className="border-2 rounded-lg p-2"
      />
      {errors.password && touched.password && (
        <div className="text-red-500 text-sm">{errors.password}</div>
      )}
      <Field
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        className="border-2 rounded-lg p-2"
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
      )}
    </div>
  );
};

export default Step2Account;
