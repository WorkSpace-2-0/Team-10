"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/Select";

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
    <Menubar className="w-fit bg-white mt-5 rounded-3xl" onClick={closeAll}>
      <MenubarMenu>
        <MenubarTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFileOpen((prev) => !prev);
            setMemberOpen(false);
            setAdminOpen(false);
          }}
          className="rounded-3xl"
        >
          Бүгд
        </MenubarTrigger>
        {fileOpen && (
          <MenubarContent
            onClick={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
          >
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMemberOpen((prev) => !prev);
            setFileOpen(false);
            setAdminOpen(false);
          }}
          className="rounded-3xl"
        >
          Гишүүн
        </MenubarTrigger>
        {memberOpen && (
          <MenubarContent
            onClick={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
          >
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setAdminOpen((prev) => !prev);
            setFileOpen(false);
            setMemberOpen(false);
          }}
          className="rounded-3xl"
        >
          Админ
        </MenubarTrigger>
        {adminOpen && (
          <MenubarContent
            onClick={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
          >
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}
