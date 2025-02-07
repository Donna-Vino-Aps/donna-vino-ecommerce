import TextInputLoginScreen from "./TextInputLoginForm";
import { Formik, Form } from "formik";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // Import your icons here
import Button from "./Button";

const LoginForm = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <main className="flex-grow p-8 w-full">
        <h2
          className="text-displayMedium md:text-displayLarge font-barlow text-tertiary1-darker mb-6 text-center"
          aria-label="Log In"
        >
          Log In
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            // Handle login logic here (e.g., API request)
            logInfo("Form Submitted:", values);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <TextInputLoginScreen
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdOutlineEmail />}
                data-testid="login-input-email"
                aria-label="Email"
              />

              <TextInputLoginScreen
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                showPasswordToggle={true}
                data-testid="input-password"
                aria-label="Password"
              />

              <Button
                text={translations["signUp.button"]}
                onClick={handleSubmit}
                variant="red"
                data-testid="login-button"
                aria-label="Submit Log In"
              />
            </Form>
          )}
          ;
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
