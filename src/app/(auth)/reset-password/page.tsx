import React, { Suspense } from "react";
import ResetPasswordConetent from "./resetPasswordContent";

export default function ResetPasswordContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordConetent />
    </Suspense>
  );
}
