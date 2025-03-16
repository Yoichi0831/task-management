import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Logo or Title */}
      <h1 className="text-xl font-bold">Task Manager</h1>

      {/* Right Section (Avatar + Login/Logout) */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          src={!authUser? "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border border-white object-cover"
        />

        {/* Login/Logout Button */}
        <button
          onClick={() => {
            if (authUser) {
              logout();
            } else {
              navigate("/login");
            }
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition"
        >
          {authUser ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
