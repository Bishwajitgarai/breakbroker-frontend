import React, { Suspense } from "react";
import OtpConfirmationContent from "./OtpContent";

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpConfirmationContent />
    </Suspense>
  );
}
