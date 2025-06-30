import { Field } from "formik";
import Image from "next/image";
import Header from "src/components/Header";

type Step1Props = {
  errors: any;
  touched: any;
};

const Step1Username = ({ errors, touched }: Step1Props) => {
  return (
    <div className="relative flex items-center justify-center h-[600px]">
      {/* Background Eclipse Image */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/images/Eclipse1.png"
          width={765}
          height={573}
          alt=""
          className="object-contain"
        />
      </div>

      {/* Content inside the ellipse */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Login"
          width={100}
          height={100}
          className="mb-2"
        />

        {/* Question */}
        <div className="bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-800">
          Танийг хэн гэж дууддаг вэ?
        </div>

        {/* Input */}
        <Field
          name="username"
          type="text"
          placeholder="Таны нэр"
          className="w-[240px] h-[40px] px-4 py-2 rounded-full bg-white border border-gray-300 text-center text-gray-700 shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {touched.username && errors.username && (
          <div className="text-red-500 text-sm mt-1">{errors.username}</div>
        )}
      </div>
    </div>
  );
};

export default Step1Username;
