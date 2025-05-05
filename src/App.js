import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./Components/About";
import Profile from "./Components/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./Components/Footer";
import Contact from "./pages/Contact";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import AdminDashboard from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Dashboard />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
        <ToastContainer position="top-right"  autoClose={1500}     />
    </Router>
  );
};

export default App;
