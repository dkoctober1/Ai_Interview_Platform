import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="bg-gradient-to-br from-[#1a2980] to-[#26d0ce] text-white h-full w-full">
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="root-layout ">
        <nav>
          <Link href="/" className="flex items-center gap-2">
            {/* <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} /> */}
            <h2 className="text-primary-100"></h2>
          </Link>
        </nav>

        {children}
      </div>
    </div>
  );
};

export default Layout;
