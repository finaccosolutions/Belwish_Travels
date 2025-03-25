import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[700px] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        alt="Travel Hero"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex space-x-2">
                <span className="bg-rose-500 px-4 py-1 rounded-full text-sm font-semibold">Flights</span>
                <span className="bg-blue-500 px-4 py-1 rounded-full text-sm font-semibold">Hotels</span>
                <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-semibold">Tours</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Your Journey Begins with <span className="text-rose-400">BELWISH</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Discover extraordinary destinations and create unforgettable memories
            </p>
            <div className="space-x-4">
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Explore Destinations
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;