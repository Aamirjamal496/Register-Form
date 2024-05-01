import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/SignUP"
import Login from "./components/Login";
const App = () => {
 
  return (
    <>
      <div className=" flex items-center gap-4 my-8 text-white font-bold">
        <Link to="/login" className=" p-3 bg-blue-900 rounded">
          Login
        </Link>
        <Link to="/SignUp" className="p-3 bg-red-800 rounded">
          Signup
        </Link>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
