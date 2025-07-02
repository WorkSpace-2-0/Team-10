"use client";

import React from "react";

export const TeamsDataSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-3 bg-gray-100 mt-5 px-2 py-1 rounded-3xl w-fit h-9">
        <div className="rounded-3xl px-3 py-1 text-sm bg-white w-14 h-7"></div>
        <div className="rounded-3xl px-3 py-1 text-sm bg-white w-14 h-7"></div>
        <div className="rounded-3xl px-3 py-1 text-sm bg-white w-14 h-7"></div>
      </div>

      <div className="ml-2 mt-5 w-16 h-5 bg-gray-200 rounded"></div>

      <div className="flex flex-col mt-5 w-full border-gray-200 rounded-2xl">
        <div className="pl-7 pr-6 py-3 bg-white h-16 flex justify-between rounded-t-2xl">
          <div className="w-72 h-9 bg-gray-200 rounded"></div>
          <div className="w-48 h-9 bg-gray-200 rounded"></div>
          <div className="w-32 h-9 bg-gray-200 rounded"></div>
        </div>

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="pl-7 pr-6 py-3 flex justify-between items-center odd:bg-white even:bg-gray-50"
          >
            <div className="flex w-full justify-between items-center">
              <div className="w-72 h-10 bg-gray-200 rounded"></div>
              <div className="w-48 h-10 bg-gray-200 rounded"></div>
              <div className="w-32 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
