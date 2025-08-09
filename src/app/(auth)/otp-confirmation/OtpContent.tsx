"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showSuccessToast, showErrorToast } from "@/utils/toastHelper";
import { Gender, LoginMethod, RegisterUser, sendRegisterOtp, verifyOtp } from "@/app/lib/api"; // adjust path to your api function

export default function OtpConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const method = searchParams.get("method") || "email";
  const first_name = searchParams.get("first_name") || "";
  const last_name = searchParams.get("last_name") || "";
  const gender = searchParams.get("gender") || "male";
  const contact = searchParams.get("contact") || "";
  const password = searchParams.get("password") || "";
  const next_view = searchParams.get("next_view") || "newlogin";

  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      showErrorToast("Please enter the OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await RegisterUser({
            first_name,
            last_name,
            gender: gender as Gender,
            email: method === "email" ? contact : null,
            phone: method === "phone" ? contact : null,
            login_method: method as LoginMethod,
            password: password,
            dob:null,
            otp,
            });


      if (res.success) {
        showSuccessToast(res.message);

        if (next_view === "reset_password") {
          router.push(`/reset-password?method=${method}&contact=${encodeURIComponent(contact)}`);
        } else if (next_view === "newlogin") {
            const params = new URLSearchParams({
                method,
                contact,
                password,
                }).toString();

                router.push(`/login?${params}`);
        } else {
          router.push("/");
        }
      } else {
        showErrorToast(res.message || "OTP verification failed");
      }
    } catch (error) {
      showErrorToast("Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      // Call resend API (e.g. sendRegisterOtp) if you have one
      const response=await sendRegisterOtp({ method: method as "email" | "phone", contact });
      if (response.success){
      showSuccessToast(response.message);

      }else{
        showErrorToast(response.message);

      }
    } catch {
      showErrorToast("Failed to resend OTP");
    }
    setResending(false);
  };

  const descriptionMap: Record<string, string> = {
    reset_password: "to reset your password",
    newlogin: "to verify your account",
  };
  const descriptionText = descriptionMap[next_view] || "to verify your account";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Verify Your Account</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the OTP sent {descriptionText} via {method === "email" ? "email address" : "phone number"}:
        </p>
        <p className="text-center text-gray-800 font-medium mb-8 break-words">{contact}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest text-black placeholder-black"
            required
            autoFocus
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resending}
            className={`text-sm font-medium ${
              resending ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"
            }`}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
