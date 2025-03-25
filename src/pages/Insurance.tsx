import React from 'react';
import { Shield, CheckCircle2, AlertCircle, Clock, Globe2 } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Insurance = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "₹999",
      duration: "per trip",
      features: [
        "Medical coverage up to ₹2,50,000",
        "Lost baggage coverage",
        "Trip cancellation",
        "24/7 emergency assistance"
      ]
    },
    {
      name: "Premium Plan",
      price: "₹1,999",
      duration: "per trip",
      features: [
        "Medical coverage up to ₹5,00,000",
        "Lost baggage coverage",
        "Trip cancellation",
        "Adventure sports coverage",
        "24/7 emergency assistance",
        "Flight delay compensation"
      ]
    },
    {
      name: "Gold Plan",
      price: "₹2,999",
      duration: "per trip",
      features: [
        "Medical coverage up to ₹10,00,000",
        "Lost baggage coverage",
        "Trip cancellation",
        "Adventure sports coverage",
        "24/7 emergency assistance",
        "Flight delay compensation",
        "Personal accident coverage",
        "Home insurance while traveling"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Travel Insurance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Travel Insurance</h1>
              <p className="text-xl mb-8">Protect your journey with comprehensive travel insurance coverage</p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Plans */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-rose-500">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.duration}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <CheckCircle2 className="mr-2 text-green-500" size={18} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition-colors">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Details */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Coverage Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Medical Coverage",
                description: "Comprehensive medical coverage including emergency medical expenses"
              },
              {
                icon: Globe2,
                title: "Worldwide Coverage",
                description: "Protection across the globe with international assistance"
              },
              {
                icon: Clock,
                title: "24/7 Assistance",
                description: "Round-the-clock emergency support wherever you are"
              },
              {
                icon: AlertCircle,
                title: "Trip Cancellation",
                description: "Coverage for unexpected trip cancellations"
              }
            ].map((coverage, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <coverage.icon className="text-rose-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{coverage.title}</h3>
                <p className="text-gray-600">{coverage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Claims Process */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Claims Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Report Incident",
              description: "Contact our 24/7 helpline immediately after the incident"
            },
            {
              step: "2",
              title: "Submit Documents",
              description: "Provide all necessary documents and evidence"
            },
            {
              step: "3",
              title: "Assessment",
              description: "Our team will assess your claim within 48 hours"
            },
            {
              step: "4",
              title: "Settlement",
              description: "Quick settlement once claim is approved"
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

      {/* FAQs */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "What does travel insurance cover?",
                answer: "Travel insurance typically covers medical emergencies, trip cancellations, lost baggage, and other travel-related incidents. Coverage varies by plan."
              },
              {
                question: "How do I make a claim?",
                answer: "Contact our 24/7 helpline immediately after the incident. Our team will guide you through the process and required documentation."
              },
              {
                question: "Is pre-existing condition covered?",
                answer: "Coverage for pre-existing conditions varies by plan. Please check the specific plan details or contact our support team."
              },
              {
                question: "Can I extend my coverage?",
                answer: "Yes, you can extend your coverage period. Contact us before your current coverage expires."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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

export default Insurance;