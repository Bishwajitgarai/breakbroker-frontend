import React, { Suspense } from "react";
import OtpConfirmationConetnet from "./verifyOtpContent";

export default function VerifyOtpContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpConfirmationConetnet />
    </Suspense>
  );
}
