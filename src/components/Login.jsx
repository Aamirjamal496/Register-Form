import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // event.preventDefault();
    const res = await axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await schema.validate({ email, password });
    // try {
    //   if (email === "amirjamal496@gmail.com" && password === "Amir@123") {
    //     toast("Login Successful!", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "color",
    //     });
    //   } else {
    //     toast("Incorrect Email/Password", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "color",
    //     });
    //   }
    // } catch (error) {
    //   toast.error(error.message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "color",
    //   });
    // }
  };

  return (
    <div className="flex flex-col  h-[40rem] items-center m-auto mt-14 border-1 border-white bg-blue-100 rounded-md shadow-2xl ">
      <div className="content-center mb-6 mt-28">
        <h1 className="text-center font-bold text-[40px]">Login</h1>
        <p className="">Please enter your Login and Your Password</p>
      </div>
      <div className="mt-7 text-zinc-600">
        <input
          className="border-solid border-[1px] border-white block mb-3 rounded-md px-4 py-2 w-96"
          type="text"
          value={email}
          id="Email"
          placeholder="Username or Email"
          onChange={handleEmailChange}
        />
        <input
          className="border-white border-solid border-[1px] rounded-md w-96 px-4 py-64 mb-3"
          type="password"
          value={password}
          id="Pass"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button
        className="border-white border-solid border-2 py-2 px-24 rounded-lg mt-7  bg-blue-600 text-center"
        onClick={handleLogin}
      >
        Login
      </button>
      <ToastContainer />
      <div className="justify-between mt-3 ">
        <Link to="/login" className="mr-28 underline">
          Login
        </Link>
        <Link to="/SignUp" className="ml-10 underline">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
