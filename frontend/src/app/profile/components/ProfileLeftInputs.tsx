import { ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Props {
  formData: FormData;
  handleChange: (
    field: keyof FormData
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const LeftForm = ({ formData, handleChange }: Props) => {
  return (
    <div className="space-y-5">
      {/* Name input */}
      <div>
        <label className="text-sm mb-1 block font-medium">
          Танийг хэн гэж дууддаг вэ?
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange("name")}
        />
      </div>

      {/* Email display */}
      <div className="w-full flex-col justify-start">
        <label className="text-sm mb-1 block font-medium">Таний gmail!</label>
        {formData.email}
      </div>

      {/* Password input */}
      <div>
        <label className="text-sm mb-1 block font-medium">Таны нууц үг</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={formData.password}
          onChange={handleChange("password")}
        />
      </div>
    </div>
  );
};

export default LeftForm;
