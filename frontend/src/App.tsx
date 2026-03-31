import { ToastContainer } from "react-toastify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Route , Routes} from "react-router"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { Dashboard } from "./pages/Dashboard"

import { Favourite } from "./pages/Favourite"
import ProtectedRoute from "./ProtectedRoute"



function App() {


  return (
    <>
     <div className="flex flex-col min-h-screen">
       <Navbar />
       
        <ToastContainer 
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        />
       <main className="grow">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute/>}>
           <Route path="/profile" element={<Profile />} />
           <Route path="/dashboard" element={ <Dashboard/> } />
           <Route path="/favourites" element={<Favourite />} />
          </Route>
         </Routes>
       </main>
       <Footer />
     </div>
    </>
  )
}

export default App
