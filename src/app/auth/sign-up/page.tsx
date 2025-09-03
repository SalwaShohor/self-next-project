import Signin from "@/components/Auth/Signin";
import Signup from "@/components/Auth/Signup";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Sign in",
// };

export default function SignUp() {
  return (
    <>
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full">
            <div className="w-full px-100 py-30">
              <Signup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
