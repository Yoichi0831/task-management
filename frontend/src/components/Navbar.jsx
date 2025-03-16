import React from "react";
import { useAuthStore } from "../store/useAuthStore"; // 假设你有 Zustand 存储用户状态
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Logo or Title */}
      <h1 className="text-xl font-bold">Task Manager</h1>

      {/* Right Section (Avatar + Login/Logout) */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          src={user?.avatar || "https://via.placeholder.com/40"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-white object-cover"
        />

        {/* Login/Logout Button */}
        <button
          onClick={() => {
            if (user) {
              logout();
            } else {
              navigate("/login");
            }
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition"
        >
          {user ? "🚪" : "🔑"}
        </button>
      </div>
    </nav>
  );
}
