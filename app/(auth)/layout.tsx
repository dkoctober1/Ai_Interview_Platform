import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");

  return (
    <div className="bg-gradient-to-br from-[#26d0ce] to-[#1a2980] text-white">
      {/* <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}

      <div className="auth-layout">{children}</div>
    </div>
  );
};

export default AuthLayout;
