"use client";
import React from "react";
import Profile from "@/components/Profile/Profile";
import SEO from "@/components/SEO/SEO";
import { useLanguage } from "@/context/LanguageContext";

const UserProfile = () => {
  const { translations } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col items-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <SEO
        title={translations["profile.title"]}
        description={translations["profile.description"]}
      />
      <Profile />
    </div>
  );
};

export default UserProfile;
