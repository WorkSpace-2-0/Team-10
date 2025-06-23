import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import StepNavigation from "../../components/sign-up/StepNavigation";
import StepContent from "../../components/sign-up/StepContent";
import Progress from "../../components/sign-up/Progress";

// Get URL parameters
const getSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    step: searchParams.get('step'),
    userId: searchParams.get('userId'),
  };
};

const ProfileSetup = () => {
  const router = useRouter();
  const [step, setStep] = useState(3);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const params = getSearchParams();
    if (params.step) setStep(Number(params.step));
    if (params.userId) setUserId(params.userId);
  }, []);

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("User ID is required"),
    goingOut: Yup.string().required("Going out preference is required"),
    weekend: Yup.string().required("Weekend preference is required"),
    hobby: Yup.string().required("Hobby preference is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/createProfile/${values.userId}`,
        {
          goingOut: values.goingOut,
          weekend: values.weekend,
          hobby: values.hobby,
        }
      );

      toast.success("Profile setup complete!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Profile setup failed");
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`);
      } catch (error) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="w-full h-auto p-4 cursor-default flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Complete Profile Setup</h1>

      <Formik
        initialValues={{
          userId: userId,
          goingOut: "",
          weekend: "",
          hobby: "",
          step: step,
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
              loading={false}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSetup;
