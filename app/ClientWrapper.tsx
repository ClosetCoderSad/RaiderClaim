// app/ClientWrapper.tsx
"use client";

import { useEffect } from "react";
//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return <>{children}</>;
}
