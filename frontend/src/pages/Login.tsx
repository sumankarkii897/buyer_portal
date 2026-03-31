
import { useForm } from "react-hook-form";
import {toast} from "react-toastify"
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    // console.log("Login data:", data);
  try {
      const res = await api.post("/auth/login", data);
    
    toast.success(res.data.message);
    navigate("/dashboard")
  } catch (error) {
    toast.error("Login failed");
  }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                }
              })}
              className="w-full px-4 py-3 rounded-md border focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Password must be at least 6 characters long" } 
              })}
              className="w-full px-4 py-3 rounded-md border focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button className="block w-full p-3 text-center rounded-sm text-white bg-green-500 cursor-pointer hover:bg-green-600 transition duration-300" type="submit">
            Login
          </button>
          <p className="text-sm text-center">
            Don't have an account? <span  className="text-blue-400">
              <Link to="/register"
             >Register Now</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;