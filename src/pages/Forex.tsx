import React from 'react';
import { DollarSign, Repeat, ShieldCheck, Clock, Calculator } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Forex = () => {
  const currencies = [
    { code: 'USD', name: 'US Dollar', rate: '82.50', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', rate: '89.75', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', rate: '104.25', flag: '🇬🇧' },
    { code: 'AED', name: 'UAE Dirham', rate: '22.45', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', rate: '22.00', flag: '🇸🇦' },
    { code: 'SGD', name: 'Singapore Dollar', rate: '61.30', flag: '🇸🇬' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Forex Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Foreign Exchange Services</h1>
              <p className="text-xl mb-8">Get the best exchange rates for all major world currencies</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Check Rates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Currency Calculator */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Currency Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                <option value="INR">Indian Rupee (INR)</option>
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <Calculator size={20} />
            <span>Calculate</span>
          </button>
        </div>
      </div>

      {/* Live Rates */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Live Exchange Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currencies.map(currency => (
            <div key={currency.code} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{currency.flag}</div>
                <div className="text-2xl font-bold text-rose-500">₹{currency.rate}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{currency.name}</h3>
              <p className="text-gray-600">{currency.code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Forex Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Best Rates",
                description: "Competitive exchange rates updated in real-time"
              },
              {
                icon: ShieldCheck,
                title: "Secure",
                description: "Safe and secure transactions with proper documentation"
              },
              {
                icon: Clock,
                title: "Quick Processing",
                description: "Fast processing of your forex requirements"
              },
              {
                icon: Repeat,
                title: "Multiple Currencies",
                description: "Exchange service for all major world currencies"
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

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Forex Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Currency Exchange",
              description: "Exchange foreign currency at competitive rates",
              features: ["Multiple currencies available", "Real-time rates", "Quick processing"]
            },
            {
              title: "Forex Cards",
              description: "Multi-currency travel cards for convenient spending abroad",
              features: ["Secure transactions", "Multiple currencies", "24/7 support"]
            },
            {
              title: "Wire Transfers",
              description: "Send money abroad quickly and securely",
              features: ["Fast processing", "Competitive rates", "Secure transfers"]
            },
            {
              title: "Travel Insurance",
              description: "Comprehensive travel insurance for your journey",
              features: ["Multiple plans", "Worldwide coverage", "24/7 assistance"]
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <ShieldCheck className="text-green-500 mr-2" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Forex;