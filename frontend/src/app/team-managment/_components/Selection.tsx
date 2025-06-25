"use client";

import React from "react";

export function Selection() {
  const [fileOpen, setFileOpen] = React.useState(false);
  const [memberOpen, setMemberOpen] = React.useState(false);
  const [adminOpen, setAdminOpen] = React.useState(false);

  const closeAll = () => {
    setFileOpen(false);
    setMemberOpen(false);
    setAdminOpen(false);
  };

  return (
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
          }}
          className="rounded-3xl px-3 py-1 text-sm hover:bg-gray-100"
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMemberOpen((prev) => !prev);
            setFileOpen(false);
            setAdminOpen(false);
          }}
          className="rounded-3xl px-3 py-1 text-sm hover:bg-gray-100"
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
          }}
          className="rounded-3xl px-3 py-1 text-sm hover:bg-gray-100"
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
  );
}
