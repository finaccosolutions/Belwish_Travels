import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Plane, Import as Passport, Package, Fuel as Mosque, DollarSign, Bus, Star, MapPin, Users, Clock, Phone, Mail, MapPinned, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const [selectedDestType, setSelectedDestType] = useState('all');

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

  const destinations = {
    international: [
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
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "Switzerland",
        price: "From ₹1,49,999",
        rating: "4.9",
        duration: "8 Days"
      }
    ],
    domestic: [
      {
        image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "Goa",
        price: "From ₹24,999",
        rating: "4.7",
        duration: "4 Days"
      },
      {
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "Kashmir",
        price: "From ₹34,999",
        rating: "4.9",
        duration: "6 Days"
      },
      {
        image: "https://images.unsplash.com/photo-1587922546307-776227941871?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "Kerala",
        price: "From ₹29,999",
        rating: "4.8",
        duration: "5 Days"
      },
      {
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "Rajasthan",
        price: "From ₹39,999",
        rating: "4.8",
        duration: "7 Days"
      }
    ]
  };

  const offers = [
    {
      title: "Summer Special",
      description: "30% off on International Packages",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: "Starting from ₹49,999"
    },
    {
      title: "Honeymoon Package",
      description: "Romantic getaway to Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: "Starting from ₹89,999"
    },
    {
      title: "Dubai Shopping Festival",
      description: "5 Days of Luxury & Shopping",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: "Starting from ₹59,999"
    }
  ];

  const displayDestinations = selectedDestType === 'all' 
    ? [...destinations.international, ...destinations.domestic]
    : selectedDestType === 'international' 
      ? destinations.international 
      : destinations.domestic;

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

      {/* Special Offers Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Special Offers</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Grab these limited-time offers for your dream vacation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="relative p-8 h-[400px] flex flex-col justify-end">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-gray-200 mb-4">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-rose-300 font-semibold">{offer.price}</span>
                      <button className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-all">
                        Book Now
                      </button>
                    </div>
                  </div>
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
          Experience world-class travel services tailored to your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Featured Package */}
      <div className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Europe Dream Tour</h3>
                <p className="text-gray-300 mb-6">Experience the best of Europe with our exclusive 15-day package covering 6 countries.</p>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-center"><Star className="mr-2 text-yellow-400" size={20} /> 5-star accommodations</li>
                  <li className="flex items-center"><MapPin className="mr-2 text-blue-400" size={20} /> 12 major cities</li>
                  <li className="flex items-center"><Users className="mr-2 text-green-400" size={20} /> Expert tour guides</li>
                </ul>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">₹1,99,999</span>
                  <button className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Paris" className="rounded-lg" />
                <img src="https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Rome" className="rounded-lg" />
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="London" className="rounded-lg" />
                <img src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Amsterdam" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Popular Destinations</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Explore our most sought-after destinations and start planning your next adventure
          </p>
          
          {/* Destination Type Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'international', 'domestic'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedDestType(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedDestType === type
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayDestinations.map((destination, index) => (
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">BELSWISH</h3>
              <p className="mb-6">Your trusted partner for unforgettable travel experiences since 2020.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tour Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Flight Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotel Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forex Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPinned size={20} className="mr-3 text-rose-500 mt-1 flex-shrink-0" />
                  <span>2nd floor, Makkah tower, court road manjeri, malappuram, kerala-676521</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="mr-3 text-rose-500" />
                  <span>+91 99615 30776</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 text-rose-500" />
                  <span>info@belwishtravels.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">© 2025 BELSWISH. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-sm hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Home;