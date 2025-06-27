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
  const [fileOpen, setFileOpen] = React.useState(false);
  const [memberOpen, setMemberOpen] = React.useState(false);
  const [adminOpen, setAdminOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = useState<"ALL" | "USER" | "ADMIN">(
    "ALL"
  );

  const closeAll = () => {
    setFileOpen(false);
    setMemberOpen(false);
    setAdminOpen(false);
  };
  const [data, setData] = useState<User[]>([]);

  const filteredData =
    selectedRole === "ALL"
      ? data
      : data.filter((user) => user.role === selectedRole);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/auth/GetAllUser`);
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
      <div
        className="flex gap-1 bg-white mt-5 px-2 py-1 rounded-3xl w-fit"
        onClick={closeAll}
      >
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFileOpen((prev) => !prev);
              setMemberOpen(false);
              setAdminOpen(false);
              setSelectedRole("ALL");
            }}
            className={`rounded-3xl px-3 py-1 text-sm  ${
              selectedRole === "ALL"
                ? "bg-gray-100"
                : ""
            }`}
          >
            Бүгд
          </button>
          {fileOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            />
          )}
        </div>
        <div className="relative">
          {fileOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMemberOpen((prev) => !prev);
              setFileOpen(false);
              setAdminOpen(false);
              setSelectedRole("USER");
            }}
             className={`rounded-3xl px-3 py-1 text-sm  ${
              selectedRole === "USER"
                ? "bg-gray-100"
                : ""
            }`}
          >
            Гишүүн
          </button>
          {memberOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAdminOpen((prev) => !prev);
              setFileOpen(false);
              setMemberOpen(false);
              setSelectedRole("ADMIN");
            }}
            className={`rounded-3xl px-3 py-1 text-sm ${
              selectedRole === "ADMIN"
                ? "bg-gray-100"
                : ""
            }`}
          >
            Админ
          </button>
          {adminOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
      <div className="justify-start text-black ml-2 mt-4">
        Нийт: {filteredData.length}
      </div>

      <div className="flex justify-between flex-col mt-5 w-full border border-gray-200 rounded-2xl">
        <div className="self-stretch pl-7 pr-6 py-3 bg-white inline-flex justify-between items-center rounded-t-2xl">
          <div className="w-72 justify-start text-neutral-500 ">Нэр</div>
          <div className="w-48 justify-start text-neutral-500 ">Имэйл хаяг</div>
          <div className="w-32 h-10 inline-flex flex-col justify-center items-start gap-2.5">
            <div className="justify-start  text-neutral-500 ">Төлөв</div>
          </div>
        </div>

        {filteredData &&
          filteredData.slice(0, 7).map((users) => (
            <div
              key={users.email}
              className="self-stretch pl-7 pr-6 py-3 odd:bg-white even:bg-gray-50 inline-flex justify-between items-center last:rounded-b-2xl"
            >
              <div className="inline-flex justify-between w-full">
                <div key={users.userName} className="w-72 justify-start">
                  {users.userName}
                </div>
                <div key={users.email} className="w-48 justify-start">
                  {users.email}
                </div>
                <div className="w-32 h-10 justify-center gap-2.5">
                  <div className="items-center gap-2 inline-flex">
                    {users.role === "USER" && (
                      <div className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 relative bg-[#91D379] rounded-full "></div>
                        <div>Гишүүн</div>
                      </div>
                    )}
                    {users.role === "ADMIN" && (
                      <div className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 relative bg-[#84ACFA] rounded-full"></div>
                        <div>Админ</div>
                      </div>
                    )}
                    {/* <div key={users.role} className="">
                      {users.role}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
