import React from 'react';
import { Fuel as Mosque, Calendar, Users, MapPin, Star, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Umrah = () => {
  const packages = [
    {
      title: "Economy Package",
      duration: "15 Days",
      price: "₹85,999",
      features: [
        "3-star hotel accommodation",
        "Return flights",
        "Visa processing",
        "Local transportation",
        "Basic meals included",
        "Group Ziyarat"
      ]
    },
    {
      title: "Premium Package",
      duration: "15 Days",
      price: "₹1,25,999",
      features: [
        "4-star hotel accommodation",
        "Return flights",
        "Express visa processing",
        "Private transportation",
        "All meals included",
        "Guided Ziyarat",
        "Premium services"
      ]
    },
    {
      title: "Luxury Package",
      duration: "15 Days",
      price: "₹1,75,999",
      features: [
        "5-star hotel accommodation",
        "Business class flights",
        "VIP visa processing",
        "Luxury transportation",
        "Premium dining",
        "Private Ziyarat guide",
        "Exclusive services"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1591604129939-f11307cb76bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Umrah Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl font-bold mb-6">Umrah Services</h1>
              <p className="text-xl mb-8">Complete Umrah packages with spiritual guidance and support</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                <div className="flex items-center text-gray-600 mb-6">
                  <Calendar className="mr-2" size={20} />
                  <span>{pkg.duration}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <CheckCircle2 className="mr-2 text-green-500" size={18} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-3xl font-bold text-rose-500 mb-6">{pkg.price}</div>
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition-colors">
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services & Features */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Mosque,
                title: "Spiritual Guidance",
                description: "Expert guidance throughout your spiritual journey"
              },
              {
                icon: Users,
                title: "Group Services",
                description: "Well-organized group arrangements and support"
              },
              {
                icon: MapPin,
                title: "Hotel Booking",
                description: "Premium accommodation near holy sites"
              },
              {
                icon: Calendar,
                title: "Flexible Dates",
                description: "Multiple departure dates to choose from"
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

      {/* Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "Valid passport with minimum 6 months validity",
            "Vaccination requirements as per current guidelines",
            "Recent passport size photographs",
            "Completed visa application form",
            "Marriage certificate (if applicable)",
            "Bank statements",
            "COVID-19 negative certificate",
            "Travel insurance"
          ].map((requirement, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
              <CheckCircle2 className="text-green-500 mr-3" size={24} />
              <span>{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">What Our Pilgrims Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Khan",
                rating: "5.0",
                comment: "Excellent service and spiritual guidance throughout the journey."
              },
              {
                name: "Fatima Syed",
                rating: "4.9",
                comment: "Very well organized. The hotels were close to the holy sites."
              },
              {
                name: "Mohammed Rashid",
                rating: "5.0",
                comment: "Professional team and great support during the entire trip."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400" size={20} />
                  <span className="ml-2 text-white">{testimonial.rating}</span>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.comment}</p>
                <p className="text-white font-semibold">{testimonial.name}</p>
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

export default Umrah;