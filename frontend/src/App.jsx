import './App.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './pages/Landing/LandingPage'

import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>


      <Footer />

    </>
    


  )
}

export default App
