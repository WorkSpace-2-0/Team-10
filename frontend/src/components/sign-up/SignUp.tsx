"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import StepNavigation from "./StepNavigation";
import StepContent from "./StepContent";
import Progress from "./Progress";

const SignUp = () => {
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    goingOut: Yup.string().required("Going out preference is required"),
    weekend: Yup.string().required("Weekend preference is required"),
    hobby: Yup.string().required("Hobby preference is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const userResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
        user: userResponse.data.userId,
        goingOut: values.goingOut,
        weekend: values.weekend,
        hobby: values.hobby,
      });

      setLoading(false);
      toast.success("Registration successful!");
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-auto p-4 cursor-default flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Sign Up</h1>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          goingOut: "",
          weekend: "",
          hobby: "",
          step: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Progress values={values} />
            <StepContent values={values} errors={errors} touched={touched} />
            <StepNavigation
              values={values}
              setStep={(newStep: number) => setFieldValue("step", newStep)}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
