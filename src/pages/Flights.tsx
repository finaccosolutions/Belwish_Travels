import React, { useState } from 'react';
import { Plane, Calendar, Users, MapPin, Search, DollarSign, HeadphonesIcon, ShieldCheck, Star } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Flights = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1 Passenger'
  });

  const [searchResults, setSearchResults] = useState<null | Array<{
    airline: string;
    flightNo: string;
    departure: string;
    arrival: string;
    duration: string;
    price: string;
  }>>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated flight search results
    const mockResults = [
      {
        airline: 'Emirates',
        flightNo: 'EK507',
        departure: '10:30 AM',
        arrival: '4:30 PM',
        duration: '6h 00m',
        price: '₹32,999'
      },
      {
        airline: 'Qatar Airways',
        flightNo: 'QR321',
        departure: '2:15 PM',
        arrival: '8:45 PM',
        duration: '6h 30m',
        price: '₹35,499'
      },
      {
        airline: 'Air India',
        flightNo: 'AI934',
        departure: '11:45 AM',
        arrival: '5:30 PM',
        duration: '5h 45m',
        price: '₹28,999'
      }
    ];

    setSearchResults(mockResults);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Flights Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">Find Your Perfect Flight</h1>
              <p className="text-xl mb-8">Discover amazing deals on flights worldwide with our easy booking system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="from"
                  value={searchParams.from}
                  onChange={handleInputChange}
                  placeholder="Departure City"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="to"
                  value={searchParams.to}
                  onChange={handleInputChange}
                  placeholder="Arrival City"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  name="passengers"
                  value={searchParams.passengers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4+ Passengers</option>
                </select>
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-transparent mb-2">Search</label>
              <button 
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Search size={20} />
                <span>Search Flights</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6">Available Flights</h2>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((flight, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-6">
                      <p className="text-sm text-gray-600">Airline</p>
                      <p className="font-semibold">{flight.airline}</p>
                      <p className="text-sm text-gray-500">{flight.flightNo}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-xl font-bold">{flight.departure}</p>
                        <p className="text-sm text-gray-600">{searchParams.from}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-px bg-gray-300 relative">
                          <div className="absolute -top-2 right-0">
                            <Plane size={20} className="text-rose-500 transform rotate-90" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{flight.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold">{flight.arrival}</p>
                        <p className="text-sm text-gray-600">{searchParams.to}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-rose-500">{flight.price}</p>
                      <p className="text-sm text-gray-500">per person</p>
                    </div>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Routes */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              from: "Dubai",
              to: "Kerala",
              price: "₹15,999",
              image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
              from: "Mumbai",
              to: "Singapore",
              price: "₹24,999",
              image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
              from: "Delhi",
              to: "London",
              price: "₹45,999",
              image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
          ].map((route, index) => (
            <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={route.image}
                alt={`${route.from} to ${route.to}`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white">
                      <div className="text-sm">From</div>
                      <div className="text-xl font-bold">{route.from}</div>
                    </div>
                    <Plane className="text-white transform rotate-90" size={24} />
                    <div className="text-white text-right">
                      <div className="text-sm">To</div>
                      <div className="text-xl font-bold">{route.to}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 font-bold">Starting from {route.price}</span>
                    <button 
                      onClick={() => {
                        setSearchParams({
                          from: route.from,
                          to: route.to,
                          date: '',
                          passengers: '1 Passenger'
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Book With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Price Guarantee",
                description: "We offer the best deals and competitive prices on flights worldwide.",
                icon: DollarSign
              },
              {
                title: "24/7 Support",
                description: "Our customer support team is available round the clock to assist you.",
                icon: HeadphonesIcon
              },
              {
                title: "Secure Booking",
                description: "Book your flights with confidence using our secure payment system.",
                icon: ShieldCheck
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <feature.icon className="text-rose-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Flights;