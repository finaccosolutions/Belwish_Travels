import React from 'react';
import { Users, Award, Globe2, Clock, MapPin, Phone, Mail } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">About BELSWISH</h1>
              <p className="text-xl">Your trusted partner for unforgettable travel experiences since 2020</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2020, BELSWISH has grown from a small local travel agency to a comprehensive travel solutions provider. Our journey began with a simple mission: to make travel accessible, comfortable, and memorable for everyone.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we serve thousands of happy customers, offering a wide range of services from flight bookings to complete tour packages. Our commitment to excellence and customer satisfaction has made us one of the most trusted names in the travel industry.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-rose-500 mb-2">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-rose-500 mb-2">100+</div>
                <div className="text-gray-600">Destinations</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Travel 1"
              className="rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Travel 2"
              className="rounded-lg mt-8"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Customer First",
                description: "We prioritize our customers' needs and satisfaction above all"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for excellence in every service we provide"
              },
              {
                icon: Globe2,
                title: "Global Reach",
                description: "Connecting people to destinations worldwide"
              },
              {
                icon: Clock,
                title: "Reliability",
                description: "Dependable service you can count on, always"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <value.icon className="text-rose-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              position: "CEO & Founder",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Jane Smith",
              position: "Operations Director",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Mike Johnson",
              position: "Travel Expert",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <MapPin size={24} className="text-rose-500" />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p>2nd floor, Makkah tower, court road manjeri, malappuram, kerala-676521</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={24} className="text-rose-500" />
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p>+91 99615 30776</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail size={24} className="text-rose-500" />
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p>info@belwishtravels.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;