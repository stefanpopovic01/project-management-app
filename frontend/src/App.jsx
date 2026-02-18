import './App.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './pages/Landing/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardHeader from './components/DashboardHeader/DashboardHeader'
import VerticalNavbar from './components/VerticalNavbar/VerticalNavbar'

import { Routes, Route, useLocation } from "react-router-dom";


function App() {

  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Navbar zavisi od rute */}
      {!isDashboardRoute ? (
        <Navbar />
      ) : (
        <>
          <DashboardHeader />
          <VerticalNavbar />
        </>
      )}

      

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </main>


      {/* Footer samo za javni deo */}
      {!isDashboardRoute && <Footer />}

    </>
    


  )
}

export default App
