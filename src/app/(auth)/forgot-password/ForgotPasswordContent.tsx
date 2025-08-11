"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { sendForgetPasswordOtp } from "@/app/lib/api";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelper";

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query parameters
  const methodParam = (searchParams.get("method") as "email" | "phone") || "email";
  const contactParam = searchParams.get("contact") || "";

  const [method, setMethod] = useState<"email" | "phone">(methodParam);
  const [value, setValue] = useState(contactParam);
  const [loading, setLoading] = useState(false);

  // Sync state with query params if they change
  useEffect(() => {
    setMethod(methodParam);
    setValue(contactParam);
  }, [methodParam, contactParam]);

  // Validation functions
  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Only digits, exactly 10 digits
    return /^\d{10}$/.test(phone);
  };
  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();


    const params = new URLSearchParams({
    }).toString();

    router.push(`/signup?${params}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (method === "email") {
      if (!validateEmail(value)) {
        showErrorToast("Please enter a valid email address.");
        return;
      }
    } else {
      if (!validatePhone(value)) {
        showErrorToast("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await sendForgetPasswordOtp({
        contact: value,
        method,
      });

      if (!res.success) {
        showErrorToast(res.message || "Failed to send OTP. Please try again.");
        return;
      }

      showSuccessToast("OTP sent successfully!");

      const next_view = "reset_password";
      router.push(
        `/verify-otp?method=${method}&contact=${encodeURIComponent(value)}&next_view=${next_view}`
      );
    } catch (error) {
      showErrorToast("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Forgot Password
        </h1>

        {/* Toggle Buttons */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setMethod("email");
              setValue("");
            }}

            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition select-none ${
              method === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Mail size={16} />
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod("phone");
              setValue("");
            }}

            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition select-none ${
              method === "phone"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Phone size={16} />
            Phone
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor={method === "email" ? "email" : "phone"}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {method === "email" ? "Email Address" : "Phone Number"}
            </label>
            <input
              id={method === "email" ? "email" : "phone"}
              type={method === "email" ? "email" : "tel"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={method === "email" ? "Enter your email" : "Enter your phone number"}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
              required
              autoComplete="off"
              aria-required="true"
              maxLength={method === "phone" ? 10 : undefined}
              inputMode={method === "phone" ? "numeric" : undefined}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="#"
            onClick={handleSignUp}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
