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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Define Zod schema
const SignUpSchema = z
  .object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      )
      .nonempty("Password is required"),
    repeat_password: z.string().nonempty("Password is required"),
    role: z.string().nonempty("Role is required"),
  })
  .refine((data) => data.password === data.repeat_password, {
    path: ["repeat_password"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof SignUpSchema>;

// The SuccessModal component provided by the user
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SignUpForm() {
  const [data, setData] = useState<SignUpFormData>({
    full_name: "",
    email: "",
    password: "",
    repeat_password: "",
    role: "",
  });

  // const [errors, setErrors] = useState<
  //   Partial<Record<keyof SignUpFormData, string>>
  // >({});

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof data, string>>
  >({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm<SignUpFormData>({
  //   resolver: zodResolver(SignUpSchema),
  // });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // if (data.password !== data.repeat_password) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    // ✅ Zod validation first
    const parsed = SignUpSchema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof typeof data;
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return; // stop if validation fails
    }

    setErrors({}); // clear errors if validation passed

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
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your full name"
          name="full_name"
          handleChange={handleChange}
          value={data.full_name}
          icon={<User size={18} />}
        />
        {errors.full_name && (
          <p className="-mt-3 mb-3 text-sm text-red-500">{errors.full_name}</p>
        )}

        {/* Email */}
        <InputGroup
          type="email"
          label="Email"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your email"
          name="email"
          handleChange={handleChange}
          value={data.email}
          icon={<EmailIcon />}
        />
        {errors.email && (
          <p className="-mt-3 mb-3 text-sm text-red-500">{errors.email}</p>
        )}

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
        {errors.password && (
          <p className="-mt-3 mb-3 text-sm text-red-500">{errors.password}</p>
        )}

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
        {errors.repeat_password && (
          <p className="-mt-3 mb-3 text-sm text-red-500">
            {errors.repeat_password}
          </p>
        )}

        {/* Role */}
        <SelectGroup
          label="Role"
          name="role"
          value={data.role}
          className="mb-5 [&_input]:py-[15px]"
          onChange={handleChange}
          options={[
            { label: "Select your role", value: "" },
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        />
        {errors.role && (
          <p className="-mt-3 mb-3 text-sm text-red-500">{errors.role}</p>
        )}

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
