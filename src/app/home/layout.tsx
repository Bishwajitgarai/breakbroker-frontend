"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LogOut, User, RefreshCcw } from "lucide-react";
import { TokenRefresher } from "./refreshToken";
import { logout } from "@/features/user/userSlice";
import { AppDispatch } from "@/store/store";
import { getByreverseGeocode } from "../lib/api";
import { setLocation } from "@/features/user/userLocationSlice";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  
  const getLocationAndCity = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setCity(null);
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const resposne = await getByreverseGeocode(lat, long);
          dispatch(
            setLocation({
              ...resposne?.data,
              lat: lat,
              long: long,
            })
          );

          const city_n=resposne?.data?.city_name;
          setCity(city_n);
          setLocationError(null);
        } catch (err) {
          setLocationError("Failed to fetch city data.");
          setCity(null);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationError(error.message);
        setCity(null);
        setLocationLoading(false);
      }
    );
  };

  useEffect(() => {
    getLocationAndCity();
  }, []);

  return (
    <>
      <TokenRefresher />
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        {/* Left: Logo and Location */}
        <div className="flex items-center space-x-4 select-none cursor-default">
          <div className="text-2xl font-bold text-blue-700">BreakBroker</div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm font-medium">
            <span>
              {locationLoading ? (
                "Detecting location..."
              ) : locationError ? (
                <>
                  <span className="text-red-500">Location Error</span>
                  <button
                    onClick={getLocationAndCity}
                    className="ml-2 p-1 rounded hover:bg-gray-200"
                    title="Retry Location"
                    aria-label="Retry Location"
                  >
                    <RefreshCcw size={16} />
                  </button>
                </>
              ) : city ? (
                <>Current city: <strong>{city}</strong></>
              ) : (
                "Location not available"
              )}
            </span>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Account Icon */}
          <button
            type="button"
            aria-label="Account"
            title="Account"
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={() => router.push("/profile")}
          >
            <User size={24} />
          </button>

          {/* Logout Icon */}
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 transition"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white ">
        {children}
      </main>
    </>
  );
}
