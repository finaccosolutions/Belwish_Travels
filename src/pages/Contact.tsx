import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl">We're here to help and answer any question you might have</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: MapPin,
              title: "Address",
              info: "2nd floor, Makkah tower, court road manjeri, malappuram, kerala-676521",
              color: "bg-blue-500"
            },
            {
              icon: Phone,
              title: "Phone",
              info: "+91 99615 30776",
              color: "bg-green-500"
            },
            {
              icon: Mail,
              title: "Email",
              info: "info@belwishtravels.com",
              color: "bg-rose-500"
            },
            {
              icon: Clock,
              title: "Working Hours",
              info: "Mon - Sat: 9:00 AM - 6:00 PM",
              color: "bg-purple-500"
            }
          ].map((contact, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl p-6">
              <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center mb-4`}>
                <contact.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
              <p className="text-gray-600">{contact.info}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I book a tour package?",
                  answer: "You can book a tour package through our website, by calling us, or visiting our office. Our team will guide you through the process."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept various payment methods including credit/debit cards, net banking, UPI, and cash payments at our office."
                },
                {
                  question: "Can I customize my travel package?",
                  answer: "Yes, we offer customized travel packages to suit your preferences and requirements. Contact our team for personalized options."
                },
                {
                  question: "What is your cancellation policy?",
                  answer: "Our cancellation policy varies depending on the type of booking and timing of cancellation. Please refer to our terms and conditions for details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[400px] w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2288464579387!2d76.11721661472015!3d11.016899892155432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b5c2c2c2c2c1%3A0x3b3b3b3b3b3b3b3b!2sManjeri%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Contact;