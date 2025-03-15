import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';


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
    <Routes>
      <Route path="/" element = {authUser? <TaskPage /> : <Navigate to='/login'/>} />
      <Route path='/signup' element = { !authUser? <Signup/> : <Navigate to='/'/>} />
      <Route path='/login' element = { !authUser? <Login/> : <Navigate to='/'/>} />
    </Routes>
  );
}

export default App;