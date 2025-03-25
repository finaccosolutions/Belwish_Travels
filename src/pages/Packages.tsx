import React, { useState } from 'react';
import { Package, MapPin, Calendar, Users, Star, Clock, DollarSign } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const packages = {
    international: [
      {
        title: "Dubai Adventure",
        duration: "5 Days / 4 Nights",
        price: "₹49,999",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah"]
      },
      {
        title: "Singapore & Malaysia",
        duration: "7 Days / 6 Nights",
        price: "₹69,999",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Universal Studios", "Marina Bay Sands", "Sentosa Island", "Petronas Towers"]
      }
    ],
    domestic: [
      {
        title: "Kerala Backwaters",
        duration: "5 Days / 4 Nights",
        price: "₹24,999",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1587922546307-776227941871?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Alleppey", "Munnar", "Thekkady", "Kovalam"]
      },
      {
        title: "Rajasthan Heritage",
        duration: "7 Days / 6 Nights",
        price: "₹34,999",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"]
      }
    ],
    honeymoon: [
      {
        title: "Maldives Romance",
        duration: "6 Days / 5 Nights",
        price: "₹89,999",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Water Villa Stay", "Sunset Cruise", "Couple Spa", "Water Sports"]
      },
      {
        title: "Swiss Alps",
        duration: "8 Days / 7 Nights",
        price: "₹1,49,999",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Zurich", "Lucerne", "Interlaken", "Mt. Titlis"]
      }
    ]
  };

  const displayPackages = selectedCategory === 'all' 
    ? [...packages.international, ...packages.domestic, ...packages.honeymoon]
    : packages[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Travel Packages"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl font-bold mb-6">Discover Amazing Places</h1>
              <p className="text-xl mb-8">Explore our curated collection of travel packages designed to create unforgettable memories</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Explore Packages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Package Categories */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'international', 'domestic', 'honeymoon'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative">
                  <img 
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={16} />
                      <span className="text-sm font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="mr-2" size={18} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <MapPin className="mr-2 text-rose-500" size={16} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-rose-500 font-bold text-xl">{pkg.price}</div>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Packages?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Best Price Guarantee",
                description: "We offer competitive prices and best value for your money"
              },
              {
                icon: Users,
                title: "Expert Guides",
                description: "Professional and experienced tour guides for your journey"
              },
              {
                icon: Calendar,
                title: "Flexible Booking",
                description: "Easy booking process with flexible payment options"
              },
              {
                icon: Package,
                title: "Customized Packages",
                description: "Tailor-made packages to suit your preferences"
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

export default Packages;