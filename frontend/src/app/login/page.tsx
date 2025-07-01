"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Зөв имэйл хаяг оруулна уу")
      .required("Имэйл шаардлагатай"),
    password: Yup.string()
      .min(6, "Нууц үг дор хаяж 6 тэмдэгт байх ёстой")
      .required("Нууц үг шаардлагатай"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      const token = response.data.token;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      toast.success("Амжилттай нэвтэрлээ!");
      resetForm();

      router.push("/note");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-[1200px] h-[900px] rounded-full overflow-hidden relative">
        <div className="absolute inset-0">
          <Image src={"/images/Eclipse1.png"} width={1200} height={900} alt="" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 px-10">
          <div className="relative w-[309px] h-[49px]">
            <div className="bg-white text-black rounded-[10px] px-4 py-2 text-center border w-full h-full">
              <div className="text-center justify-start text-black text-lg font-normal leading-relaxed">
                Эргэн уулзахад таатай байна!
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-2px)] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-white z-10"></div>
          </div>
          <Image
            src="/images/logo.png"
            alt="Login"
            width={100}
            height={100}
            className="mb-2"
          />
          <div className="w-80 text-center justify-start text-neutral-500 text-sm font-normal ">
            Мэдээллээ оруулж нэвтэрнэ үү.
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-sm">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Имэйл хаяг"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                <div className="w-full max-w-sm">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Нууц үг"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                <div className="group w-[200px] max-w-sm">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-2 px-4 rounded-full shadow-md bg-[#94B7FA]  group-hover:from-blue-500 group-hover:to-blue-700 group-hover:bg-gradient-to-r transition-all duration-700"
                  >
                    {isSubmitting ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
                  </button>
                </div>
                or
                <div className="text-sm text-gray-600">
                  <a
                    href="/sign-up"
                    className="text-gray hover:text-blue-500 transition-colors duration-300"
                  >
                    Бүртгүүлэх
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
