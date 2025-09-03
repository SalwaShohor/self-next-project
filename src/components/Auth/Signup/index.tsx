import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import SignUpForm from "../SignUpForm";

export default function Signup() {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" /> */}

      {/* <div className="my-6 flex items-center justify-center"> */}
      {/* <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span> */}
      {/* <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark"> */}
      {/* <span className="text-[40px] font-black">Register</span> */}
      {/* </div> */}
      {/* <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span> */}
      {/* </div> */}

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Register
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SignUpForm />
      </div>

      {/* <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div> */}
    </>
  );
}
