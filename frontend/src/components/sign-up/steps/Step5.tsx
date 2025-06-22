import { Field } from "formik";

type Step5Props = {
  errors: any;
  touched: any;
};

const Step5Hobby = ({ errors, touched }: Step5Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">Step 5: Profile - Hobby</h2>
      <div className="flex gap-4">
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field type="radio" name="hobby" value="option1" className="mr-2" />
          Option 1
        </label>
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field type="radio" name="hobby" value="option2" className="mr-2" />
          Option 2
        </label>
      </div>
      {errors.hobby && touched.hobby && (
        <div className="text-red-500 text-sm">{errors.hobby}</div>
      )}
    </div>
  );
};

export default Step5Hobby;
