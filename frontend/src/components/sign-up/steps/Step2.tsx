import { Field, useFormikContext } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type Step2Props = {
  errors: any;
  touched: any;
};

const Step2Account = ({ errors, touched }: Step2Props) => {
  const { values, setFieldError , setFieldValue } = useFormikContext<any>();
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);

  

  useEffect(() => {
    const checkEmail = async () => {
      if (!values.email || !values.email.includes("@")) return;
  
      setChecking(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-email?email=${values.email}`
        );
        if (res.data.exists) {
          setFieldError("email", "Энэ имэйл бүртгэлтэй байна");
          setFieldValue("emailExists", true); // ✅ true
        } else {
          setFieldValue("emailExists", false); // ✅ false
        }
      } catch (err) {
        console.error("Email шалгах алдаа:", err);
      } finally {
        setChecking(false);
        setChecked(true);
      }
    };
  
    checkEmail();
  }, [values.email, setFieldError, setFieldValue]);

  return (
    <div className="relative flex items-center justify-center h-[600px]">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/images/Eclipse1.png"
          width={765}
          height={573}
          alt="Background"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mb-2"
        />

        <div className="bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-800 text-center max-w-[250px]">
          Танилцахад таатай байна! <br /> Хоёулаа одоо профайлаа үүсгэе.
        </div>

        {/* Email */}
        <Field
          name="email"
          type="email"
          placeholder="Имэйл хаяг"
          className="w-[240px] h-[40px] px-4 py-2 rounded-full bg-white border border-gray-300 text-center text-gray-700 shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {values.step === 2 && values.emailExists && (
          <div className="text-red-500 text-sm mt-2">
            Энэ имэйл аль хэдийн бүртгэлтэй байна.
          </div>
        )}
        {errors.email && touched.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}

        {/* Password */}
        <Field
          name="password"
          type="password"
          placeholder="Нууц үг"
          className="w-[240px] h-[40px] px-4 py-2 rounded-full bg-white border border-gray-300 text-center text-gray-700 shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}

        {/* Confirm Password */}
        <Field
          name="confirmPassword"
          type="password"
          placeholder="Нууц үгээ давтах"
          className="w-[240px] h-[40px] px-4 py-2 rounded-full bg-white border border-gray-300 text-center text-gray-700 shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Account;
