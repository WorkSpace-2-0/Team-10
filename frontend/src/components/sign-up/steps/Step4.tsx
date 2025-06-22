import { Field } from "formik";

type Step4Props = {
  errors: any;
  touched: any;
};

const Step4Weekend = ({ errors, touched }: Step4Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">Step 4: Profile - Weekend</h2>
      <div className="flex gap-4">
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field type="radio" name="weekend" value="option1" className="mr-2" />
          Option 1
        </label>
        <label className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <Field type="radio" name="weekend" value="option2" className="mr-2" />
          Option 2
        </label>
      </div>
      {errors.weekend && touched.weekend && (
        <div className="text-red-500 text-sm">{errors.weekend}</div>
      )}
    </div>
  );
};

export default Step4Weekend;
