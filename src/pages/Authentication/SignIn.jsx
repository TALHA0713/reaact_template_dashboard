import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@material-tailwind/react";
function SignIn() {
  const token = sessionStorage.getItem("token");
  if (token) {
    console.error("No token found in session storage.");
    window.location.href = "/";
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = {
        ...values,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      setLoading(true);
      const response = await fetch(
        "http://localhost:3333/auth/sign-in",
        requestOptions
      );

      const responseBody = await response.json();
      setLoading(false);
      if (!response.ok) {
        if (responseBody.statusCode == 402) {
          toast.error("email not found", { autoClose: 2000 });
        } else if (responseBody.statusCode == 401) {
          toast.error("invalid Password", { autoClose: 2000 });
        }
        return;
        throw new Error("Network response was not ok");
      }

      const token = JSON.stringify(responseBody);
      sessionStorage.setItem("token", token);
      resetForm();
      window.location.href = "/";
      // console.log(data.message);
    } catch (error) {
      toast.error("Server Does not response Plz try again later", {
        autoClose: 2000,
      });
      setLoading(false);
      console.error("There was a problem with the POST request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <div className="w-full h-screen text-slate-900 flex">
      {/* Left Side */}
      <div className="w-1/2 bg-cyan relative">
        <div className="mt-10 flex items-center justify-center">
          <img src="/Task.png" alt="Task List" className="inline-block" />
          <h2 className="text-white font-bold leading-4 text-3xl inline-block">
            Task List Manager
          </h2>
        </div>
        <img
          src="/Illustration (1).png"
          alt="image"
          className="w-full h-[80%] object-contain max-w-full max-h-full"
        />
      </div>

      {/* Right Side */}
      <form
        className="w-1/2 h-full bg-red-700  grid place-content-center"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl font-bold">Sign In to your Account</h1>
          <p className="font-light mt-2 mb-8 text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              onBlur={handleBlur}
              className={
                "w-[400px] h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue pl-10" +
                (errors.email && touched.email ? " input-error" : "")
              }
            />
            {errors.email && touched.email && (
              <p className="error text-tred mt-2 text-sm">{errors.email}</p>
            )}
            <img
              src="/mail.svg"
              alt=""
              className="absolute top-0 left-3 mt-4"
            />
          </div>

          <div className="relative">
            <input
              type={type}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              onBlur={handleBlur}
              className={
                "w-[400px] h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue pl-10 pr-10" +
                (errors.password && touched.password ? " input-error" : "")
              }
            />
            {errors.password && touched.password && (
              <p className="error text-tred text-sm mt-2">{errors.password}</p>
            )}
            <span
              className="flex justify-around items-center"
              onClick={handleToggle}
            >
              <Icon
                className="absolute mt-3 top-0 right-8 cursor-pointer"
                icon={icon}
                size={25}
              />
            </span>
            <img
              src="/lock.svg"
              alt=""
              className="absolute top-0 left-3 mt-3"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="mr-1 size-5" />
            <p className="text-sm text-gray-600 max-w-[400px] font-light">
              Remember me
            </p>
            <a href="/auth/reset" className="ml-auto text-sm text-blue">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading} // Adjusted the disabled condition
            className="w-[400px] h-12 bg-cyan rounded-lg text-white text-xl font-bold flex justify-center items-center" // Added flex styles
          >
            {loading && (
              <span className="mr-4">
                <Spinner color="blue" />
              </span>
            )}
            <span>Sign In</span>
          </button>

          <p className="text-med text-gray-600 justify-center text-center">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-blue font-bold">
              Sign Up
            </a>
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" style={{ marginTop: "1rem" }} />
    </div>
  );
}

export default SignIn;
