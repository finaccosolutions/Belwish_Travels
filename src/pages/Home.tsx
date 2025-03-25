import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Plane, Import as Passport, Package, Fuel as Mosque, DollarSign, Bus, Star, MapPin, Users, Clock } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'Find the best deals on flights worldwide with our easy booking system.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Passport,
      title: 'Visa Services',
      description: 'Hassle-free visa processing for all your international travel needs.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Package,
      title: 'Tour Packages',
      description: 'Curated holiday packages for your perfect vacation experience.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Mosque,
      title: 'Umrah Services',
      description: 'Complete Umrah packages with spiritual guidance and support.',
      image: 'https://images.unsplash.com/photo-1591604129939-f11307cb76bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: DollarSign,
      title: 'Forex Services',
      description: 'Competitive exchange rates for all major world currencies.',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Bus,
      title: 'Transport',
      description: 'Reliable transportation services including buses and cabs.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const stats = [
    { icon: MapPin, value: '100+', label: 'Destinations' },
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Star, value: '4.9/5', label: 'Rating' },
    { icon: Clock, value: '24/7', label: 'Support' }
  ];

  return (
    <div className="bg-gray-50">
      <Hero />
      
      {/* Stats Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl p-8 transform group-hover:-translate-y-2 transition-all duration-300 shadow-xl">
                  <div className="inline-block p-4 rounded-full bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Services</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Experience world-class travel services tailored to your needs. From flight bookings to complete tour packages, we've got you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Popular Destinations</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore our most sought-after destinations and start planning your next adventure
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Dubai",
                price: "From ₹49,999",
                rating: "4.9",
                duration: "5 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Paris",
                price: "From ₹89,999",
                rating: "4.8",
                duration: "7 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Maldives",
                price: "From ₹74,999",
                rating: "4.9",
                duration: "6 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Singapore",
                price: "From ₹54,999",
                rating: "4.8",
                duration: "5 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Japan",
                price: "From ₹1,24,999",
                rating: "4.9",
                duration: "8 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Bangkok",
                price: "From ₹34,999",
                rating: "4.7",
                duration: "4 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Switzerland",
                price: "From ₹1,49,999",
                rating: "4.9",
                duration: "8 Days"
              },
              {
                image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Bali",
                price: "From ₹64,999",
                rating: "4.8",
                duration: "6 Days"
              }
            ].map((destination, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent group-hover:from-gray-900/95 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-semibold mb-2">{destination.title}</h3>
                    <div className="flex items-center text-gray-300 mb-2">
                      <Star size={16} className="text-yellow-400" />
                      <span className="ml-1">{destination.rating}</span>
                      <span className="mx-2">•</span>
                      <Clock size={16} />
                      <span className="ml-1">{destination.duration}</span>
                    </div>
                    <p className="text-rose-300 font-semibold">{destination.price}</p>
                    <button className="mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;