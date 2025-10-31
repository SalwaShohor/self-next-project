"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  startAuthentication,
  PublicKeyCredentialRequestOptionsJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/browser";

export default function SigninWithPassword() {
  // A helper function to convert ArrayBuffer to Base64url string
  const bufferToBase64url = (buf: ArrayBuffer): string => {
    const bytes = new Uint8Array(buf);
    return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };
  const router = useRouter();
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //

  const handleLogin = async (/*e: React.FormEvent*/) => {
    // e.preventDefault();
    // setLoading(true);

    try {
      // Step 1: Verify email + password first
      const passwordCheck = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/prelogin`,
        { email: data.email, password: data.password },
      );

      if (!passwordCheck.data?.ok) {
        alert("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Step 2: Get WebAuthn options (only if password is correct)
      const { data: options }: { data: PublicKeyCredentialRequestOptionsJSON } =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login-options`,
          { params: { email: data.email } },
        );

      // Step 3: Let the authenticator create the response
      const credentialResponse = await startAuthentication({
        optionsJSON: options,
      });

      // Step 4: Send WebAuthn response to backend
      const verifyRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login-verify`,
        { email: data.email, credential: credentialResponse },
      );

      if (verifyRes.data?.verified) {
        const token = verifyRes.data.token;

        // ✅ Log token in console for debugging
        console.log("🪪 JWT Token:", token);

        // Store JWT in localStorage
        localStorage.setItem("token", token);

        router.replace("/");
      }
    } catch (webauthnError) {
      console.error(
        "⚠️ WebAuthn login failed, attempting password login:",
        webauthnError,
      );
    }
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePreLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🧩 Step 1: Verify email & password first
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/prelogin`,
        { email: data.email, password: data.password },
      );

      // Check response
      if (res.data?.ok) {
        console.log("✅ Password verified! Proceeding to WebAuthn...");
        // 🧩 Step 2: Call WebAuthn next
        await handleLogin();
      } else {
        alert("❌ Invalid email or password.");
      }
    } catch (err) {
      console.error("Prelogin error:", err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
