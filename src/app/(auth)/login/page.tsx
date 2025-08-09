import React, { Suspense } from "react";
import LoginContent from "./LogiinContent";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
