"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useJwt } from "react-jwt";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [token] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    const checkTokenAndRoute = () => {
      if (!token || isExpired) {
        if (pathname !== "/login" && pathname !== "/sign-up") {
          router.push("/login");
        }

      }

      if ((pathname === "/login" || pathname === "/sign-up") && decodedToken) {
        router.push("/");
      }
    };
    checkTokenAndRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isExpired, decodedToken]);

  return <>{children}</>;
};

export default AuthProvider;
