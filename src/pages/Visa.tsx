import React from 'react';
import { Import as Passport, Globe2, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Visa = () => {
  const visaTypes = [
    {
      title: "Tourist Visa",
      countries: ["UAE", "Singapore", "Thailand", "Malaysia"],
      processingTime: "3-5 working days",
      startingPrice: "₹4,999"
    },
    {
      title: "Business Visa",
      countries: ["USA", "UK", "Canada", "Australia"],
      processingTime: "5-7 working days",
      startingPrice: "₹12,999"
    },
    {
      title: "Student Visa",
      countries: ["USA", "UK", "Canada", "Australia", "New Zealand"],
      processingTime: "10-15 working days",
      startingPrice: "₹15,999"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Visa Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Hassle-free Visa Services</h1>
              <p className="text-xl mb-8">Expert assistance for all your visa requirements with guaranteed processing</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Visa Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visaTypes.map((visa, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{visa.title}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Globe2 className="mr-3 text-rose-500" size={20} />
                    <span>Available for {visa.countries.length} countries</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-3 text-rose-500" size={20} />
                    <span>{visa.processingTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-3 text-rose-500" size={20} />
                    <span>Starting from {visa.startingPrice}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {visa.countries.map((country, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <CheckCircle2 className="mr-2 text-green-500" size={16} />
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gray-100 hover:bg-rose-500 hover:text-white text-gray-800 py-3 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Visa Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Submit Documents",
                description: "Provide all necessary documents as per visa requirements"
              },
              {
                step: "2",
                title: "Application Review",
                description: "Our experts review and verify your application"
              },
              {
                step: "3",
                title: "Processing",
                description: "Application is processed by the embassy"
              },
              {
                step: "4",
                title: "Visa Delivery",
                description: "Receive your visa and travel documents"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-rose-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Required Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "Valid Passport with minimum 6 months validity",
            "Passport size photographs",
            "Bank statements for the last 6 months",
            "Flight itinerary",
            "Hotel bookings",
            "Travel insurance",
            "Employment proof",
            "Income tax returns"
          ].map((doc, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
              <CheckCircle2 className="text-green-500 mr-3" size={24} />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Visa;