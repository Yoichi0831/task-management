import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";

function App() {
  
  return (
    <Routes>
      <Route path="/home" element = {<HomePage />} />
      <Route path="/" element = {<TaskPage />} />
    </Routes>
  );
}

export default App;