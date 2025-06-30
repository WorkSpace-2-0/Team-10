"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import StepNavigation from "./StepNavigation";
import StepContent from "./StepContent";
import Progress from "./Progress";
import { useRouter } from "next/navigation";
import MoodlyLogo from "../ui/MoodlyLogo";

const SignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Нэрээ заавал оруулна уу"),
    email: Yup.string()
      .email("Имэйл хаяг буруу байна")
      .required("Имэйлээ оруулна уу"),
    password: Yup.string()
      .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
      .required("Нууц үгээ оруулна уу"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
      .required("Нууц үгээ давтан оруулна уу"),
    goingOut: Yup.array().min(1, "Ядаж 1-г сонгоно уу"),
    weekend: Yup.array().min(1, "Ядаж 1-г сонгоно уу"),
    hobby: Yup.array().min(1, "Ядаж 1-г сонгоно уу"),
  });

  return (
    <div className="w-full h-auto p-4 cursor-default flex flex-col gap-4 bg-white rounded-lg px-20">
      <div>
        <button
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <MoodlyLogo />
          <h1 className="text-[20px]">Moodly</h1>
        </button>
      </div>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          goingOut: [],
          weekend: [],
          hobby: [],
          step: 1,
          emailExists: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldValue }) => {
          if (submitted) return; // prevent multiple submits
          setSubmitted(true);

          try {
            setLoading(true);

            const userRes = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/auth/createUser`,
              {
                userName: values.username,
                email: values.email,
                password: values.password,
              }
            );

            const userId = userRes.data.userId || userRes.data.user?._id;
            const token = userRes.data.token;

            if (!userId || !token) {
              toast.error("User ID эсвэл token олдсонгүй!");
              return;
            }

            localStorage.setItem("token", token);

            await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userId}`,
              {
                goingOut: values.goingOut,
                weekend: values.weekend,
                hobby: values.hobby,
              }
            );

            toast.success("Амжилттай бүртгэгдлээ");
            setFieldValue("step", 6);
          } catch (error: any) {
            console.error("🛑 SignUp error:", error);
            toast.error(error?.response?.data?.message || "Бүртгэл амжилтгүй");
            setSubmitted(false);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form className="flex flex-col gap-4">
            <Progress values={values} />

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <StepContent
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
                {values.step < 6 && (
                  <StepNavigation
                    values={values}
                    setStep={(step: any) => setFieldValue("step", step)}
                    handleSubmit={handleSubmit}
                    loading={loading}
                  />
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
