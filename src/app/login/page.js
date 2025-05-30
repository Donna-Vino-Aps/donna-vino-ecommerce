"use client";

import LoginScreen from "@/components/LogIn/LogInScreen";
import React from "react";
import MetaTags from "@/components/SEO/MetaTags";

const LogIn = () => {
  return (
    <div>
      <MetaTags title="Login Page" description="Page for users to login" />
      <LoginScreen />
    </div>
  );
};

export default LogIn;
