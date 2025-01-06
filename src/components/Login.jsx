import React, { useState } from 'react'
import TextField from './sharedComponent/TextField'
import Button from './sharedComponent/Button'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../slice/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.Auth)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  const handleLogin = async (event) => {
    console.log("inside handleLogin");
    event.preventDefault();
    await dispatch(loginUser(loginData))
    .then((action) => {
      console.log("login action : ", action);
      if(action.type === "auth/login/fulfilled"){
        event.preventDefault();
        if(!action.payload.token) return navigate("/login")
        console.log("inside login fulfilled");
        return navigate('/product');
      } else if(action.type === "add/login/rejected") {
        console.error("Failed to login:", action.error.message);
      }
    })
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form className="flex flex-col items-center space-y-4" onSubmit={handleLogin}>
        <h3 className="font-serif text-3xl">Login</h3>
        <TextField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={loginData.email}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={loginData.password}
          required
        />
        {!loading ? (
        <Button label="Login" />) : (
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
  )
}

export default Login