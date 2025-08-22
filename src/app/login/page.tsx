"use client";

import React from "react";
import { Mail, Key, Globe, Sun, Moon, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import DomainInitializer from "@/components/DomainInitializer";
import { useTheme } from "../../context/ThemeContext";
import { signIn } from "next-auth/react";
import { useToast } from "../../lib/useToast";

const Login: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { showErrorToast , showSuccessToast } = useToast();

  const LoginSchema = Yup.object().shape({
    Domain: Yup.string().required("Domain is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    Domain: "wizcoder",
    email: "wiz@example.com",
    password: "Wiz@123",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      domain: values.Domain,
    });

    if (result?.error) {
      showErrorToast(`Sign-in failed: ${result.error}`);
    } else {
      showSuccessToast('Login successful! Let’s get started.');
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex relative">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 cursor-pointer rounded-full hover:bg-muted transition-colors"
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br  from-[#7F5AF0] via-[#8E2DE2] to-[#FF6FD8] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="relative w-full z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
            <Shield />
          </div>
          <h1 className="text-4xl font-bold mb-4">Secure Access</h1>
          <p className="text-xl max-w-md">
            Your trusted platform for secure authentication and seamless user
            experience.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7F5AF0] via-[#8E2DE2] to-[#FF6FD8] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Sign in</h2>
              <p className="mt-2 text-muted-foreground">
                Access your secure account
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-6">
                  <DomainInitializer />

                  <InputField
                    label="Domain"
                    name="Domain"
                    type="text"
                    placeholder="Enter your Domain"
                    icon={Globe}
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail}
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    icon={Key}
                    showPasswordToggle
                  />

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-[#7F5AF0] via-[#8E2DE2] to-[#FF6FD8] text-white font-semibold py-3 px-4 rounded-xl hover:scale-[1.01] transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E94057]"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
