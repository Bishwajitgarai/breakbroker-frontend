"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { sendRegisterOtp } from "@/app/lib/api";
import { showSuccessToast, showErrorToast } from "@/utils/toastHelper";
import { validatePassword } from "@/utils/util";

export default function SignupContnet() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query params
  const methodParam = (searchParams.get("method") as "email" | "phone") || "email";
  const contactParam = searchParams.get("contact") ? decodeURIComponent(searchParams.get("contact")!) : "";
  const passwordParam = searchParams.get("password") || "";

  const [signupMethod, setSignupMethod] = useState<"email" | "phone">(methodParam);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: methodParam === "email" ? contactParam : "",
    phone: methodParam === "phone" ? contactParam : "",
    password: passwordParam,
    gender:"male"
  });
  const [showPassword, setShowPassword] = useState(false);

  // Prefill form on param change
  useEffect(() => {
    setSignupMethod(methodParam);
    setFormData((prev) => ({
      ...prev,
      email: methodParam === "email" ? contactParam : "",
      phone: methodParam === "phone" ? contactParam : "",
      password: passwordParam,
    }));
  }, [methodParam, contactParam, passwordParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name) {
      showErrorToast("Please enter your full name");
      return;
    }
    if (signupMethod === "email" && !formData.email) {
      showErrorToast("Please enter your email");
      return;
    }
    if (signupMethod === "phone" && !formData.phone) {
      showErrorToast("Please enter your phone number");
      return;
    }
    if (!formData.password) {
      showErrorToast("Please create a password");
      return;
    }
    const pwdError = validatePassword(formData.password);
        if (pwdError) {
          showErrorToast(pwdError);
          return;
        }
    
    const contact = signupMethod === "email" ? formData.email : formData.phone;

    try {
      const response = await sendRegisterOtp({
        method: signupMethod,
        contact,
      });

      if (response.success) {
        showSuccessToast("OTP sent successfully");
        router.push(`/otp-confirmation?first_name=${formData.first_name}&last_name=${formData.last_name}&gender=${formData.gender}&method=${signupMethod}&contact=${encodeURIComponent(contact)}&password=${formData.password}`);
      } else {
        showErrorToast(response.message || "Failed to send OTP");
      }
    } catch (err: any) {
      showErrorToast(err.message || "Failed to send OTP");
    }
  };

  const handleGoToLogin = () => {
    const method = signupMethod;
    const contact = method === "email" ? formData.email : formData.phone;
    const password = formData.password;

    const params = new URLSearchParams({
      method,
      contact,
      password,
    }).toString();

    router.push(`/login?${params}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-700">Create Your BreakBroker Account</h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Sign up to start finding rental properties without the broker.
        </p>

        {/* Toggle Buttons */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setSignupMethod("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition select-none ${
              signupMethod === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Mail size={16} />
            Email
          </button>
          <button
            type="button"
            onClick={() => setSignupMethod("phone")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition select-none ${
              signupMethod === "phone"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Phone size={16} />
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First and Last Name in one row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Email or Phone Input */}
          {signupMethod === "email" ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 mt-6 flex items-center text-gray-500"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a onClick={handleGoToLogin} href="#" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
