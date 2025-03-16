
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, MessageSquare, Mail, EyeOff, Eye, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningup } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return toast.error("Invalid email address");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm() === true) {
            signup(formData);
        }
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/019/762/041/non_2x/task-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg"
                            className="w-16 h-16 rounded-full bg-base-200 p-1 group-hover:bg-base-100 transition"
                        />
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>

                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value })}
                                />

                            </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>

                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="John@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                                />

                            </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="########"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                > 
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) 
                                    : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit" className="btn btn-primary w-full" disabled={isSigningup}
                        >
                            {isSigningup ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default SignUpPage;