import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "./sharedComponent/TextField";
import Button from "./sharedComponent/Button";
import { useSelector, useDispatch } from "react-redux";
import { addUser, clearError } from "../slice/userSlice";

const Signup = () => {
  // Creating navigate function instance
  const navigate = useNavigate();
  // local state of form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.User);
  const [valError, setValError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // password match validation
    if (e.target.name === "confirmPassword") {
      console.log("inside confirmPassword")
      if (formData.password !== e.target.value) {
      console.log("inside confirmPassword2")
        setValError("Passwords do not match");
      } else {
        setValError(""); // Clear error if they match
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("inside handlemsanagement");
    e.preventDefault();

    if (valError) {
      return; // Prevent form submission if passwords do not match
    }

    await dispatch(addUser(formData))
    .then((action) => {
      console.log("action : ", action);
      console.log("action type", action.type);
      if(action.type === "add/user/fulfilled"){
        console.log("inside fulfilled");
        setFormData({
          fullName: '',
          email: '',
          password: '',
          changePassword: ''
        });
        console.log("User added successfully:", action.payload);
        
        // Redirect to login page
        navigate('/login');
      } else if(action.type === "add/user/rejected") {
        console.error("Failed to add user:", action.error.message);
      }
    })
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="font-serif text-3xl mb-10">Sign Up here !</h3>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          type="text"
          name="fullName"
          placeholder="Enter name here"
          onChange={handleChange}
          value={formData.fullName}
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Enter same password"
          onChange={handleChange}
          value={formData.changePassword}
          required
        />
        {valError && <p className="text-red-800 text-sm">{valError}</p>}
        {!loading ? (
        <Button label="Sign Up" />) : (
          <button
    type="button"
    className="bg-cyan-700 w-3/4 text-white px-4 py-2 rounded-3xl flex items-center justify-center"
    disabled
  >
    <span className="mr-2 text-xl font-extrabold animate-pulse">Processing</span>
    <span className="flex space-x-3">
      <span className="h-2 w-2 bg-white rounded-full animate-ping animation-delay-0"></span>
      <span className="h-2 w-2 bg-white rounded-full animate-ping animation-delay-200"></span>
      <span className="h-2 w-2 bg-white rounded-full animate-ping animation-delay-400"></span>
    </span>
  </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
