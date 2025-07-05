import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Visa from './pages/Visa';
import VisaCountry from './pages/VisaCountry';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Umrah from './pages/Umrah';
import Forex from './pages/Forex';
import Transport from './pages/Transport';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';
import Insurance from './pages/Insurance';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminVisa from './pages/admin/AdminVisa';
import AdminPackages from './pages/admin/AdminPackages';
import AdminUmrah from './pages/admin/AdminUmrah';
import AdminEnquiries from './pages/admin/AdminEnquiries';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/visa" element={<AdminVisa />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/umrah" element={<AdminUmrah />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/visa" element={<Visa />} />
                <Route path="/visa/:country" element={<VisaCountry />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetail />} />
                <Route path="/umrah" element={<Umrah />} />
                <Route path="/forex" element={<Forex />} />
                <Route path="/transport" element={<Transport />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;