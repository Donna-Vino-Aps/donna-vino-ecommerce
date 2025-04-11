"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch";

const ResetPasswordContent = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const token = searchParams.get("token");

  const onReceived = (response) => {
    const responseData = response.data || response;
    const { success, message } = responseData;
    if (success) {
      setMessage(message || translations["resetPassword.successMessage"]);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setPasswordError(message || translations["resetPassword.errorMessage"]);
    }
  };

  const { isLoading, error, performFetch } = useFetch(
    "/auth/update-user-data",
    "PUT",
    { token, newPassword, confirmPassword },
    {},
    onReceived,
  );

  useEffect(() => {
    if (!token) {
      setPasswordError(translations["resetPassword.invalidToken"]);
    }
  }, [token, translations]);

  const validatePasswords = () => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setPasswordError(translations["resetPassword.passwordMismatch"]);
      return false;
    }
    return true;
  };

  const handleConfirmPasswordBlur = () => {
    if (newPassword && confirmPassword) {
      validatePasswords();
    }
  };

  const handlePasswordChange = (e, setter) => {
    setter(e.target.value);
    if (passwordError) {
      setPasswordError(null);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setPasswordError(null);

    if (!validatePasswords()) {
      return;
    }

    performFetch({}, "/auth/update-user-data", {
      token,
      newPassword,
      confirmPassword,
    });
  };

  const getErrorMessage = () => {
    if (passwordError) return passwordError;
    if (error?.response?.data?.msg) return error.response.data.msg;
    if (error?.message) return error.message;
    return null;
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative bg-white p-10 rounded-2xl shadow-lg w-[500px] text-center">
        <h1 className="text-headlineLarge text-left mb-4">
          {translations["resetPassword.heading"]}
        </h1>
        <p className="text-left mb-4">
          {translations["resetPassword.paragraph"]}
        </p>

        {!token ? (
          <p className="text-red-600">
            {translations["resetPassword.invalidToken"]}
          </p>
        ) : (
          <form onSubmit={handleResetPassword} className="w-full">
            <p className="text-left">New Password</p>
            <input
              type="password"
              placeholder={translations["resetPassword.newPasswordPlaceholder"]}
              value={newPassword}
              onChange={(e) => handlePasswordChange(e, setNewPassword)}
              className="w-full p-2 mb-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <p className="text-left">Confirm Password</p>
            <input
              type="password"
              placeholder={
                translations["resetPassword.confirmPasswordPlaceholder"]
              }
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
              onBlur={handleConfirmPasswordBlur}
              className="w-full p-2 mb-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="w-full mt-2 mb-4">
              <Button
                text={
                  isLoading
                    ? translations["resetPassword.loading"]
                    : translations["resetPassword.button"]
                }
                variant="redWide"
                type="submit"
                disabled={isLoading}
                onClick={handleResetPassword}
              />
            </div>
          </form>
        )}

        {message && <p className="text-green-600">{message}</p>}
        {getErrorMessage() && (
          <p className="text-red-600">{getErrorMessage()}</p>
        )}
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
