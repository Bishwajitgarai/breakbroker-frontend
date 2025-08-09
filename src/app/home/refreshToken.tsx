"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { refreshAccessToken } from "@/app/lib/api";
import { refreshToken } from "@/features/user/userSlice";

export function TokenRefresher() {
  const dispatch = useDispatch<AppDispatch>();
  const refresh_token = useSelector((state: RootState) => state.user.refresh_token);

  useEffect(() => {
    console.log("Intialize")
    if (!refresh_token) return;

    // Function to refresh token and update state
    const refresh = async () => {
      try {
        const res = await refreshAccessToken(refresh_token);
        if (res.success && res.data) {
          dispatch(
            refreshToken({
              access_token: res.data.access_token,
              token_type: res.data.token_type,
            })
          );
        } else {
          console.error("Failed to refresh token:", res.message);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    };

    // Refresh immediately on mount
    refresh();

    // Setup interval every 5 minutes
    const intervalId = setInterval(() => {
      refresh();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, refresh_token]);

  return <></>;
}
