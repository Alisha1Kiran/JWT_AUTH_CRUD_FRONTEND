import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import Signup from "./Signup"
import Login from "./Login"
import Product from "./Product"
import Profile from "./Profile"
import ProductDetail from "./ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";

const Navigationbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  }
  return (
    <Router basename="/jwt-auth-crud-frontend.onrender.com">
      {/* <div className=""> */}
      <nav className="flex w-full py-3 gap-2 text-center font-bold bg-slate-950 bg-opacity-15">
        { !isAuthenticated && (
          <>
          <Link
          className="bg-gradient-to-tr from-blue-400 to-teal-200 w-2/12 mx-3 h-10 rounded-2xl text-pretty hover:from-blue-500 hover:to-teal-400"
          to="/"
        >
          Sign up
        </Link>
        <Link
          className="bg-gradient-to-tr from-blue-400 to-teal-200 w-2/12 mx-3 h-10 rounded-2xl hover:from-blue-500 hover:to-teal-400"
          to="/login"
        >
          Login
        </Link>
        </>
        )
      }
      {
        isAuthenticated && (
          <>
            <Link
          className="bg-gradient-to-tr from-blue-400 to-teal-200 w-2/12 mx-3 h-10 rounded-2xl text-sm hover:from-blue-500 hover:to-teal-400"
          to="/product"
        >
          Product
        </Link>
        <Link
          className="bg-gradient-to-tr from-blue-400 to-teal-200 w-2/12 mx-3 h-10 rounded-2xl text-sm hover:from-blue-500 hover:to-teal-400"
          to="/profile"
        >
          Profile
        </Link>
        <Link
          className="bg-gradient-to-tr from-blue-400 to-teal-200 w-2/12 mx-3 h-10 rounded-2xl text-sm hover:from-blue-500 hover:to-teal-400"
          onClick={handleLogout}
        >
          Logout
        </Link>
          </>
        )
      }
        </nav>

        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      {/* </div> */}
    </Router>
  );
};

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);

  if (!isAuthenticated) {
    console.log("Inside not is auth")
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Navigationbar;
