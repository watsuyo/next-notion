"use client";
export const runtime = "edge";

import React from "react";
import { usePathname } from "next/navigation";
import NotionPageClient from "../../_components/NotionPageClient";

const NotionPage = () => {
  const path = usePathname();
  const id = path.replace(/^\/news\//, "");

  return (
    <div
      className="
        mx-auto
        max-w-4xl
      "
    >
      <NotionPageClient id={id} />;
    </div>
  );
};

export default NotionPage;
