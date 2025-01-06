import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from './sharedComponent/TextField';
import {deleteProfile, updateUser} from './../slice/userSlice';
import {useNavigate} from 'react-router-dom';
import { logout } from '../slice/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector((state) => state.Auth)
  console.log("User data : ", user);
  const [enableField, setEnableField] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
  });
  const enableToEdit = (e) => {
    e.preventDefault();
    console.log("Enable to edit")
    setEnableField(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    dispatch(deleteProfile(user._id))
    .then((action) => {
      if(action.type === "user/deleteProfile/fulfilled"){
        console.log("action : ", action)
        if(action.payload.message === "User deleted successfully"){
          console.log("inside delete success");
          dispatch(logout()).then(() => navigate('/signup'));
        }
      }
    })
  }

  const saveProfile = (e) => {
    e.preventDefault();
    // Dispatch an action or call an API to save the data
    console.log('Saving Profile:', formData);
    // Compare formData with user data to get updated fields
      const updatedData = Object.keys(formData).reduce((changes, key) => {
      if (formData[key] !== user[key]) {
        changes[key] = formData[key];
      }
      return changes;
    }, {});
    // Example dispatch call:
    // dispatch(updateUserProfile(formData));
    if (Object.keys(updatedData).length > 0) {
      console.log('Updated Data:', updatedData);
      console.log("User ID:", user._id);
      // Dispatch action or call API with updated data
      dispatch(updateUser({ id: user._id, userData: updatedData }));
    } else {
      console.log('No changes to save');
    }
    setEnableField(false);
  };
  return (
    <div className='flex flex-col mx-2 mt-10 h-3/4 w-full items-center bg-sky-800 bg-opacity-60 rounded-md shadow-2xl'>
      <h1 className='font-sans text-cyan-950 text-3xl font-extrabold my-10 animate-bounce'>{user.fullName} Profile</h1>
      <form className="flex flex-col gap-y-5 mb-10 mx-10" onSubmit={saveProfile}>
        <TextField
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled= {!enableField}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled= {!enableField}
        />
        <div className='flex flex-col gap-2 mt-5'>
        {!enableField ? (
          <>
            <button
              type="button"
              className="bg-gradient-to-tr from-blue-400 to-teal-200 mx-3 h-10 w-60 rounded-2xl text-pretty hover:from-blue-500 hover:to-teal-400 animate-pulse"
              onClick={enableToEdit}
            >
              Click here to reset information
            </button>
            <button
              type="button"
              className="bg-gradient-to-tr from-blue-400 to-teal-200 mx-3 h-10 w-40 rounded-2xl text-pretty hover:from-blue-500 hover:to-teal-400"
              onClick={handleDeleteProfile}
            >
              Delete Account
            </button>
            </>
          ) : (
            <button
              type="submit"
              className="bg-gradient-to-tr from-blue-400 to-teal-200 mx-3 h-10 w-40 rounded-2xl text-pretty hover:from-blue-500 hover:to-teal-400"
            >
              Save
            </button>
          )}
          </div>
      </form>
      
    </div>
  )
}

export default Profile