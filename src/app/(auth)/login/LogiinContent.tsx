"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Phone, Eye, EyeOff } from "lucide-react";
import { Userlogin } from "@/app/lib/api";
import { showSuccessToast, showErrorToast } from "@/utils/toastHelper";
import { validatePassword } from "@/utils/util";
import { login } from "@/features/user/userSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  // Read query params
  const methodParam = (searchParams.get("method") as "email" | "phone") || "email";
  const contactParam = searchParams.get("contact") || "";
  const passwordParam = searchParams.get("password") || "";

  // State for login method and form data
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">(methodParam);
  const [formData, setFormData] = useState({
    email: methodParam === "email" ? contactParam : "",
    phone: methodParam === "phone" ? contactParam : "",
    password: passwordParam,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Update form state if params change (optional)
  useEffect(() => {
    setLoginMethod(methodParam);
    setFormData({
      email: methodParam === "email" ? contactParam : "",
      phone: methodParam === "phone" ? contactParam : "",
      password: passwordParam,
    });
  }, [methodParam, contactParam, passwordParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contact = loginMethod === "email" ? formData.email : formData.phone;
    if (loginMethod === "email" && !formData.email) {
      showErrorToast("Please enter your email");
      return;
    }

    if (loginMethod === "phone" && !formData.phone) {
      showErrorToast("Please enter your phone number");
      return;
    }
    if (!formData.password) {
      showErrorToast("Please enter your password");
      return;
    }
    const pwdError = validatePassword(formData.password);
    if (pwdError) {
      showErrorToast(pwdError);
      return;
    }
    const payload = {
      login_method: loginMethod,
      contact,
      password: formData.password,
    };

    const res = await Userlogin(payload);

    if (res.success) {
      // TODO: Save tokens to localStorage or context/state
      dispatch(
        login({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          token_type: res.data.token_type,
        })
      ); 
      router.push("/home");
    } else {
      showErrorToast(res.message || "Login failed");
    }
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();

    const method = loginMethod;
    const password = formData.password;
    const contact = loginMethod === "email" ? formData.email : formData.phone;

    const params = new URLSearchParams({
      method,
      password,
      contact,
    }).toString();

    router.push(`/signup?${params}`);
  };
  const handleForgetPassword = (e: React.MouseEvent) => {
    e.preventDefault();

    const method = loginMethod;
    const contact = loginMethod === "email" ? formData.email : formData.phone;

    const params = new URLSearchParams({
      method,
      contact,
    }).toString();

    router.push(`/forgot-password?${params}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center text-blue-700">BreakBroker</h1>
        <p className="text-center text-gray-500 mt-2">
          Sign in to find rental properties without the broker.
        </p>

        {/* Toggle Buttons */}
        <div className="flex mt-6 border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition ${
              loginMethod === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Mail size={16} /> Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition ${
              loginMethod === "phone"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Phone size={16} /> Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6" noValidate>
          {loginMethod === "email" ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
                required
                autoComplete="email"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
                required
                autoComplete="tel"
              />
            </div>
          )}

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
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
              autoComplete="current-password"
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
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
