"use client";
import React, { PropsWithChildren } from "react";
import Header from "./header/header";

const MainLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <main className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 mt-[64px]">{props.children}</div>
    </main>
  );
};

export default MainLayout;
