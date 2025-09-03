"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import SelectGroup from "../FormElements/SelectGroup";
import { RegistationSuccessModal } from "../popup/RegistrationSuccessModal"; //
import axios from "axios";
import {
  browserSupportsWebAuthn,
  startRegistration,
} from "@simplewebauthn/browser";

// The SuccessModal component provided by the user
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SignUpForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [data, setData] = useState({
    full_name: "",
    email: "",
    password: "",
    repeat_password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleRegister = async (e?: React.FormEvent) => {
  //   if (e) e.preventDefault();

  //   if (data.password !== data.repeat_password) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     // 1. Get registration options
  //     const { data: options } =
  //       await axios.post<PublicKeyCredentialCreationOptions>(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-options`,
  //         {
  //           full_name: data.full_name,
  //           email: data.email,
  //           role: data.role,
  //           password: data.password,
  //         },
  //         { headers: { "Content-Type": "application/json" } },
  //       );

  //     // Convert challenge and user.id to ArrayBuffer
  //     options.challenge = Uint8Array.from(
  //       atob(options.challenge as unknown as string),
  //       (c) => c.charCodeAt(0),
  //     ).buffer;

  //     options.user.id = Uint8Array.from(
  //       atob(options.user.id as unknown as string),
  //       (c) => c.charCodeAt(0),
  //     ).buffer;

  //     if (options.excludeCredentials) {
  //       options.excludeCredentials = options.excludeCredentials.map((cred) => ({
  //         ...cred,
  //         id: Uint8Array.from(atob(cred.id as unknown as string), (c) =>
  //           c.charCodeAt(0),
  //         ).buffer,
  //       }));
  //     }

  //     // 2. Ask browser to create credentials
  //     const credential = (await navigator.credentials.create({
  //       publicKey: options,
  //     })) as PublicKeyCredential;

  //     const attestationResponse =
  //       credential.response as AuthenticatorAttestationResponse;

  //     const clientDataJSON = btoa(
  //       String.fromCharCode(
  //         ...new Uint8Array(attestationResponse.clientDataJSON),
  //       ),
  //     );
  //     const attestationObject = btoa(
  //       String.fromCharCode(
  //         ...new Uint8Array(attestationResponse.attestationObject),
  //       ),
  //     );

  //     // 3. Send credential + form data to backend for verification
  //     const verifyRes = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-verify`,
  //       {
  //         user: {
  //           full_name: data.full_name,
  //           email: data.email,
  //           role: data.role,
  //           password: data.password,
  //         },
  //         credential: {
  //           id: credential.id,
  //           rawId: btoa(
  //             String.fromCharCode(...new Uint8Array(credential.rawId)),
  //           ),
  //           type: credential.type,
  //           response: {
  //             clientDataJSON,
  //             attestationObject,
  //           },
  //         },
  //       },
  //       { headers: { "Content-Type": "application/json" } },
  //     );

  //     if (verifyRes.status === 200) {
  //       console.log("✅ Registration success");
  //       handleOpenModal(); // <-- don't forget to call the function
  //     } else {
  //       console.error("❌ Registration failed");
  //     }
  //   } catch (err) {
  //     console.error("⚠️ Registration error:", err);
  //   }
  // };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (data.password !== data.repeat_password) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Get registration options from backend
      const { data: options } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-options`,
        {
          full_name: data.full_name,
          email: data.email,
          role: data.role,
          password: data.password,
        },
      );

      if (!browserSupportsWebAuthn()) {
        alert("Your browser does not support WebAuthn");
        return;
      }

      // 2️⃣ Get attestation response (already JSON-ready)
      const attResp = await startRegistration(options);

      console.log("📤 attResp being sent:", attResp);

      // 3️⃣ Send response to backend
      const verifyRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-verify`,
        {
          email: data.email,
          ...attResp, // 🔥 spread instead of nesting under attestationResponse
        },
        { headers: { "Content-Type": "application/json" } },
      );

      if (verifyRes.status === 200) {
        console.log("✅ Registration success");
        handleOpenModal();
      }
    } catch (err) {
      console.error("⚠️ Registration error:", err);
      alert("Registration failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        {/* Full Name */}
        <InputGroup
          type="text"
          label="Full Name"
          className="mb-4 [&_input]:py-[15px]"
          placeholder="Enter your full name"
          name="full_name"
          handleChange={handleChange}
          value={data.full_name}
          icon={<User size={18} />}
        />

        {/* Email */}
        <InputGroup
          type="email"
          label="Email"
          className="mb-4 [&_input]:py-[15px]"
          placeholder="Enter your email"
          name="email"
          handleChange={handleChange}
          value={data.email}
          icon={<EmailIcon />}
        />

        {/* Password */}
        <InputGroup
          type="password"
          label="Password"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your password"
          name="password"
          handleChange={handleChange}
          value={data.password}
          icon={<PasswordIcon />}
        />

        {/* Repeat Password */}
        <InputGroup
          type="password"
          label="Repeat Password"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Repeat your password"
          name="repeat_password"
          handleChange={handleChange}
          value={data.repeat_password}
          icon={<PasswordIcon />}
        />

        {/* Role */}
        <SelectGroup
          label="Role"
          name="role"
          value={data.role}
          onChange={handleChange}
          options={[
            { label: "Select your role", value: "" },
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        />

        <div className="mb-4.5 pt-20">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            Sign Up
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
            )}
          </button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </form>

      {/* ✅ Show popup on success */}
      <RegistationSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Registration Success" // The requested message
      />
    </>
  );
}
