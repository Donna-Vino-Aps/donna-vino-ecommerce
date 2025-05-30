"use client";

import SignUpScreen from "@/components/SignUpScreen/SignUpScreen";
import React from "react";
import MetaTags from "@/components/SEO/MetaTags";

const SignUp = () => {
  return (
    <div>
      <MetaTags
        title="Sign up Page"
        description="Page for users to sign up and be member of Donna Vino"
      />
      <SignUpScreen />;
    </div>
  );
};

export default SignUp;
