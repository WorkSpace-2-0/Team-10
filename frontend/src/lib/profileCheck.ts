import axios from "axios";

export const checkUserProfile = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/me`);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const redirectToProfileSetup = (router: any) => {
  router.push("/profile-setup?step=3");
};
