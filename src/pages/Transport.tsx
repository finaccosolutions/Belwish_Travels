import React from 'react';
import { Bus, Car, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Transport = () => {
  const vehicles = [
    {
      type: "Luxury Sedan",
      capacity: "4 Passengers",
      price: "₹2,500/day",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: ["Air Conditioned", "Professional Driver", "GPS Navigation", "24/7 Support"]
    },
    {
      type: "Premium SUV",
      capacity: "6 Passengers",
      price: "₹3,500/day",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: ["Air Conditioned", "Professional Driver", "GPS Navigation", "Extra Luggage Space"]
    },
    {
      type: "Luxury Van",
      capacity: "12 Passengers",
      price: "₹5,000/day",
      image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: ["Air Conditioned", "Professional Driver", "GPS Navigation", "Large Groups"]
    },
    {
      type: "Mini Bus",
      capacity: "20 Passengers",
      price: "₹8,000/day",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: ["Air Conditioned", "Professional Driver", "Tour Guide", "Group Travel"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Transport Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Transport Services</h1>
              <p className="text-xl mb-8">Comfortable and reliable transportation solutions for all your travel needs</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Book Your Transport</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                  <option>1-4 Passengers</option>
                  <option>5-6 Passengers</option>
                  <option>7-12 Passengers</option>
                  <option>13-20 Passengers</option>
                </select>
              </div>
            </div>
          </div>
          <button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <Car size={20} />
            <span>Search Vehicles</span>
          </button>
        </div>
      </div>

      {/* Vehicle Types */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img 
                  src={vehicle.image}
                  alt={vehicle.type}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm">
                  {vehicle.capacity}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.type}</h3>
                <div className="space-y-2 mb-4">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <CheckCircle2 className="text-green-500 mr-2" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-rose-500 font-bold">{vehicle.price}</span>
                  <button className="bg-gray-100 hover:bg-rose-500 hover:text-white text-gray-800 px-4 py-2 rounded-lg text-sm transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Airport Transfers",
                description: "Reliable airport pickup and drop-off services"
              },
              {
                icon: Bus,
                title: "Group Tours",
                description: "Comfortable transportation for group travel"
              },
              {
                icon: Calendar,
                title: "Corporate Travel",
                description: "Professional transport solutions for business travel"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <service.icon className="text-rose-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            "Professional Drivers",
            "24/7 Customer Support",
            "GPS Tracking",
            "Competitive Rates",
            "Clean & Maintained Vehicles",
            "Flexible Booking",
            "Safe & Secure",
            "Nationwide Service"
          ].map((feature, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
              <CheckCircle2 className="text-green-500 mr-3" size={24} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Transport;