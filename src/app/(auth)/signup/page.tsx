import React, { Suspense } from "react";
import SignupContnet from "./signUpContent";

export default function SignUPContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContnet />
    </Suspense>
  );
}
