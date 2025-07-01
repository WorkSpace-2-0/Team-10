"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
  goingOut: string[];
  weekend: string[];
  hobby: string[];
}

interface JwtPayload {
  userId: string;
}

export const useProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    goingOut: [],
    weekend: [],
    hobby: [],
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("JWT задлахад алдаа:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/getUserById?userId=${userId}`
        );

        const data = res.data;

        setOriginalName(data.userName || "");
        setFormData({
          name: data.userName || "",
          email: data.email || "",
          password: "",
          goingOut: data.goingOut || [],
          weekend: data.weekend || [],
          hobby: data.hobby || [],
        });
      } catch (error) {
        console.error("Хэрэглэгчийн мэдээлэл татаж чадсангүй:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange =
    (field: keyof Omit<FormData, "goingOut" | "weekend" | "hobby">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const toggleSelect = (
    field: keyof Pick<FormData, "goingOut" | "weekend" | "hobby">,
    value: string,
    max = 99
  ) => {
    const current = formData[field];
    const exists = current.includes(value);
    const updatedValues = exists
      ? current.filter((v) => v !== value)
      : current.length < max
      ? [...current, value]
      : current;

    setFormData({ ...formData, [field]: updatedValues });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    const updatePayload = {
      goingOut: formData.goingOut,
      weekend: formData.weekend,
      hobby: formData.hobby,
    };

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update/${userId}`,
        updatePayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Мэдээлэл амжилттай хадгалагдлаа!");
      }
    } catch (error: any) {
      console.error("Хадгалах үед алдаа гарлаа:", error);
      toast.error("Хадгалах үед алдаа гарлаа.");
    }
  };

  return {
    formData,
    handleChange,
    toggleSelect,
    handleSubmit,
  };
};
