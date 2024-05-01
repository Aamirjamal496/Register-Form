import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";

const SignUP = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [option, setOption] = useState("");

const schema = yup.object().shape({
    first: yup.string().required("First name is required"),
    last: yup.string().required("Last name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    company: yup.string().required("Company name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    subject: yup.string().required("Subject is required"),
    option: yup.string().required("Person status is required"),
  })

    const handleRegister = async () => {
    try {

        if (password !== confirmPass) {
            throw new Error("Confirm password didn't match with password");
        }

      await schema.validate({
        first,
        last,
        password,
        // confirmPass,
        company,
        email,
        phone,
        subject,
        option,
      });
      toast("Registered successfully");
    } catch (error) {
      toast.error(error.message);
    }
}

    const handleSubmit = async (event) => {
      event.preventDefault();
      // Your form submission logic here
      const data = {
        first: first,
        last: last,
        company: company,
        phone: phone,
        email: email,
        password: password,
        // confirmPass:confirmPass,
        subject: subject,
        option: option,
      };
      const response = await axios.post("http://localhost:3000/register", data);
    };
  return (
    <>
      <div className="container p-3">
        <h2>Signup Form</h2>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              onChange={(e) => {
                setFirst(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              onChange={(e) => {
                setLast(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              
              onChange={(e) => {
                setconfirmPass(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone:</label>
            <input
              type="number"
              name="number"
              id="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              name="subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              defaultValue={"Select Subject"}
              required
            >
              <option value={"Select Subject"}>Select Subject</option>
              <option value="Employee">Employee</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label>Person Status:</label>
            <label htmlFor="existing">Existing</label>
            <input
              type="radio"
              id="existing"
              name="employee-status"
              value="Existing"
              onChange={(e) => {
                setOption(e.target.value);
              }}
            />

            <label htmlFor="new">New</label>
            <input
              type="radio"
              id="new"
              name="employee-status"
              value="New"
              onChange={(e) => {
                setOption(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn" onClick={handleRegister}>
            Register
          </button>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
}

export default SignUP
