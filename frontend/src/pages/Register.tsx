
import { useForm, type SubmitHandler,  } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../services/api";
import { Link, useNavigate } from "react-router";


type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>();

  
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // console.log("Register data:", data);
  
    try {
       const res = await api.post("/auth/register", data);
        toast.success(res.data.message);
       reset();
       navigate("/login");
    } catch (error : any) {
     const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Registration failed";
        toast.error(errorMessage);
       
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-3 rounded-md border focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

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
                  message: "Invalid email address" 
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
                minLength: { value: 8, message: "Password must be at least 8 characters long" } 
              })}
              className="w-full px-4 py-3 rounded-md border focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button className="block w-full p-3 text-center rounded-sm text-white bg-purple-500 cursor-pointer hover:bg-purple-600 transition duration-300" type="submit">
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <span className="text-blue-400"><Link to="/login">Login</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;