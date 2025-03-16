import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TaskPage from "./pages/TaskPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  );


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element = {!authUser? <Navigate to='/login'/>:<TaskPage />} />
        <Route path='/signup' element = { !authUser? <Signup/> : <Navigate to='/'/>} />
        <Route path='/login' element = { !authUser? <Login/> : <Navigate to='/'/>} />
      </Routes>
      <Toaster position="top-left" />
    </div>

  );
}

export default App;