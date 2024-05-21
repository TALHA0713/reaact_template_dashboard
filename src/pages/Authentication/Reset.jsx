import { useFormik } from "formik";
import { basicSchema } from "../../schemas/Login-Validation";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";

const onSubmit = async (actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function Reset() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  console.log(errors);

  return (
    <div className={"w-[100vw] h-[100vh] bg-white text-slate-900 flex"}>
      {/*==== Left Side ====*/}
      <div className="w-[50%]  bg-cyan relative">
        <div className="mt-10 flex items-center justify-center">
          <img src="/Task.png" alt="Task List" className="inline-block" />
          <h2 className="text-white font-bold leading-4 text-3xl inline-block">
            Task List Manager
          </h2>
        </div>
        <img
          src="/reset.png"
          alt="image"
          className="w-full h-[80%] object-contain max-w-full max-h-full"
        />
      </div>

      {/*==== Right Side ====*/}

      <form
        className="w-[50%] h-full bg-white grid place-content-center"
        onSubmit={handleSubmit}
      >
        <div className="max-w-screen-lg h-[100%] w-[30vw]">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="font-light mt-2 mb-8 text-gray-500 whitespace-normal text-sm">
            To set a new password please enter a new password below, Make sure
            it's secure, containing a combination of letters, number and special
            Chracter.
          </p>

          <div className="space-y-6">
            <div className="relative">
              <input
                type={type}
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className={
                  "w-[400px] h-12 px-4 border border-gray-3 rounded-lg focus:outline-none focus:border-blue pl-10 pr-10" +
                  (errors.password && touched.password ? "input-error" : "")
                }
              />
              {errors.password && touched.password && (
                <p className="error  text-tred text-sm mt-2">
                  {errors.password}
                </p>
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
            <div className="relative">
              <input
                type={type}
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className={
                  "w-[400px] h-12 px-4 border border-gray-3 rounded-lg focus:outline-none focus:border-blue pl-10 pr-10" +
                  (errors.password && touched.password ? "input-error" : "")
                }
              />
              {errors.password && touched.password && (
                <p className="error  text-tred text-sm mt-2">
                  {errors.password}
                </p>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[400px]  h-12 bg-cyan rounded-lg text-white text-xl font-bold"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Reset;
