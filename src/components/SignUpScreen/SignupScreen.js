import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import useFetch from "../../hooks/api/useFetch";
import { logError, logInfo } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import TextInputSignUpScreen from "../SignUpScreen/TextInputSignUpScreen";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import dayjs from "dayjs";

const SignUpScreen = () => {
  const { translations } = useLanguage();
  const { setStoredCredentials } = useContext(CredentialsContext);
  const [msg, setMsg] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading indicator

  const handleMessage = (msg) => setMsg(msg);

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      setStoredCredentials(user);
    } catch (error) {
      logError(error);
      handleMessage("Failed to save user credentials");
    }
  };

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

  const { performFetch, error } = useFetch("/auth/sign-up", onReceived);

  useEffect(() => {
    if (error) {
      handleMessage(error.message || "An unexpected error occurred.");
    }
  }, [error]);

  const handleSignup = (values) => {
    setMsg("");
    // Asegúrate de que la fecha esté en el formato adecuado antes de enviarla
    const formattedBirthdate = birthdate
      ? dayjs(birthdate).format("YYYY-MM-DD")
      : null;

    logInfo("sign up");

    setIsLoading(true); // Activar el loading indicator
    performFetch({
      method: "POST",
      data: { user: { ...values, birthdate: formattedBirthdate } },
    }).finally(() => {
      setIsLoading(false); // Desactivar el loading indicator, siempre se ejecuta
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <main className="flex-grow p-8 max-w-lg mx-auto">
        <h2 className="text-displayMedium md:text-displayLarge font-barlow text-tertiary1-darker mb-6 text-center">
          Sign Up
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
              !values.confirmPassword ||
              !birthdate
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInputSignUpScreen
                type="text"
                name="name"
                placeholder="Your Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<FaRegUser />}
              />

              <TextInputSignUpScreen
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdOutlineEmail />}
              />

              <TextInputSignUpScreen
                type="text"
                name="birthdate"
                placeholder="Select your birthdate"
                value={birthdate ? dayjs(birthdate) : null}
                onChange={(newValue) => setBirthdate(newValue)}
                isDate={true}
                showDatePicker={() =>
                  document.getElementById("datePicker").focus()
                }
              />

              <TextInputSignUpScreen
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                showPasswordToggle={true}
              />

              <TextInputSignUpScreen
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                showPasswordToggle={true}
              />

              <div className="mt-4">
                {msg && <p className="text-red-500 text-xs">{msg}</p>}
                <Button
                  text={translations["signUp.button"]}
                  onClick={handleSubmit}
                  variant="red"
                />
              </div>

              {/* Indicador de carga */}
              {isLoading && (
                <div className="flex justify-center items-center mt-4">
                  <span>Loading...</span>{" "}
                  {/* Aquí puedes poner un spinner si lo prefieres */}
                </div>
              )}
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default SignUpScreen;
