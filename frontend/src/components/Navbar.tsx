import cookie from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {toast} from "react-toastify"
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
export const Navbar = () => {
    const navigate = useNavigate();
    const token = cookie.get("token");
    console.log("token : ", token)
    const handleLogout = async () => {
        try {
            const res = await api.post("/auth/logout");
            toast.success(res.data.message);
            navigate("/login");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Logout failed";
            toast.error(errorMessage);
            
        }
    }
  return (
   <>
   <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold"><Link to="/">Buyer Portal</Link></div>
        {
          
          token ? (
            <div className="flex gap-2">
             <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex gap-2 items-center"><TbLayoutDashboardFilled />
<Link to="/dashboard">Dashboard</Link>
</span>
             <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex gap-2 items-center"><FaHeart />
<Link to="/favourites">Favourite</Link>
</span>
             <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex gap-2 items-center"><FaUser />
<Link to="/profile">Profile</Link>
</span>
              <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex gap-2 items-center"><FiLogOut />
<Link to="/logout" onClick={handleLogout}>Logout</Link>
</span>
            </div>
          ) : (
            <div>
              <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Login</a>
              <a href="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Register</a>
            </div>
          )
        }
      </div>
    </nav>
   </>
  )
}
