import React, { useState } from 'react';
import { Plane, Import as Passport, Package, Fuel as Mosque, DollarSign, Bus, Menu, X, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Plane, text: 'Flights', path: '/flights' },
    { icon: Passport, text: 'Visa', path: '/visa' },
    { icon: Package, text: 'Packages', path: '/packages' },
    { icon: Mosque, text: 'Umrah', path: '/umrah' },
    { icon: DollarSign, text: 'Forex', path: '/forex' },
    { icon: Bus, text: 'Transport', path: '/transport' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Globe2 size={28} className="text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent hover:from-rose-600 hover:to-pink-700 transition-colors">
              BELWISH
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path} 
                className="flex items-center text-gray-600 hover:text-rose-500 transition-colors group relative"
              >
                <item.icon className="mr-2" size={20} />
                <span>{item.text}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className="flex items-center text-gray-600 hover:text-rose-500 py-3 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-2" size={20} />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;