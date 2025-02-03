import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import useFetch from "../../hooks/api/useFetch";
import { useDispatch } from "react-redux";
import { setActiveScreen } from "../../actions/counterActions";
import { useRouter } from "next/router";

const SignupScreen = () => {
  const [msg, setMsg] = useState("");
  const { setStoredCredentials } = useContext(CredentialsContext);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleMessage = (msg) => setMsg(msg);

  const onReceived = (response) => {
    const { success, msg, user } = response;
    if (success) {
      saveLoginCredentials(user);
      dispatch(setActiveScreen("LinkVerificationScreen"));
      router.push("/link-verification");
    } else {
      handleMessage(msg);
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/sign-up",
    onReceived,
  );

  useEffect(() => {
    if (error) {
      handleMessage(error.message || "An unexpected error occurred.");
    }
  }, [error]);

  const handleSignup = (values) => {
    setMsg("");
    performFetch({ method: "POST", data: { user: values } });
  };

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      setStoredCredentials(user);
    } catch (error) {
      console.error(error);
      handleMessage("Failed to save user credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Sign Up
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              !values.name ||
              !values.email ||
              !values.password ||
              !values.confirmPassword
            ) {
              handleMessage("Please fill all the fields");
              setSubmitting(false);
            } else if (values.password !== values.confirmPassword) {
              handleMessage("Passwords do not match");
              setSubmitting(false);
            } else {
              setSubmitting(true);
              handleSignup(values);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="w-full p-2 border rounded-lg mb-4"
              />

              <input
                type="email"
                placeholder="your.email@example.com"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full p-2 border rounded-lg mb-4"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full p-2 border rounded-lg mb-4"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className="w-full p-2 border rounded-lg mb-4"
              />

              <div className="mt-4">
                {msg && <p className="text-red-500 text-xs">{msg}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </Formik>
        {isLoading && <p className="text-center">Loading...</p>}
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
};

export default SignupScreen;
