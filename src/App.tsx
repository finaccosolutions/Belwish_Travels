import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Visa from './pages/Visa';
import Packages from './pages/Packages';
import Umrah from './pages/Umrah';
import Forex from './pages/Forex';
import Transport from './pages/Transport';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';
import Insurance from './pages/Insurance';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/umrah" element={<Umrah />} />
          <Route path="/forex" element={<Forex />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;