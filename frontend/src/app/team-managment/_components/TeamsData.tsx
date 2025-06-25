"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

type User = {
  userName: string;
  email: string;
  role: string;
};

export const TeamsData = () => {
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/GetAllUser`);
      setData(response.data);
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="justify-start text-black ml-2 mt-4">Нийт: 7</div>
     
      <div className="flex justify-between flex-col mt-5 w-full border border-gray-200 rounded-2xl">
        <div className="self-stretch pl-7 pr-6 py-3 bg-white inline-flex justify-between items-center rounded-t-2xl">
          <div className="w-72 justify-start text-neutral-500 ">Нэр</div>
          <div className="w-48 justify-start text-neutral-500 ">Имэйл хаяг</div>
          <div className="w-32 h-10 inline-flex flex-col justify-center items-start gap-2.5">
            <div className="justify-start  text-neutral-500 ">Төлөв</div>
          </div>
        </div>

        {data &&
          data.slice(0, 7).map((users) => (
            <div key={users.email} className="self-stretch pl-7 pr-6 py-3 odd:bg-white even:bg-gray-50 inline-flex justify-between items-center last:rounded-b-2xl">
              <div className="inline-flex justify-between w-full">
                <div key={users.userName} className="w-72 justify-start">{users.userName}</div>
                <div key={users.email} className="w-48 justify-start">{users.email}</div>
                <div className="w-32 h-10 justify-center gap-2.5">
                  <div className="items-center gap-2 inline-flex">
                    {users.role === "USER" && (
                      <div className="w-2 h-2 relative bg-[#91D379] rounded-full"></div>
                    )}
                    {users.role === "ADMIN" && (
                      <div className="w-2 h-2 relative bg-[#84ACFA] rounded-full"></div>
                    )}
                    <div key={users.role} className="">{users.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
