import React from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Terms & Conditions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
              <p className="text-lg">Please read these terms carefully before using our services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to BELSWISH. By using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding with any booking or transaction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">2. Booking & Cancellation</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-3">2.1 Booking Policy</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All bookings are subject to availability</li>
                <li>A minimum advance payment of 25% is required for confirmation</li>
                <li>Full payment must be made before the commencement of services</li>
                <li>Prices are subject to change without prior notice</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Cancellation Policy</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cancellation more than 30 days before departure: 90% refund</li>
                <li>15-30 days before departure: 50% refund</li>
                <li>7-14 days before departure: 25% refund</li>
                <li>Less than 7 days before departure: No refund</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">3. Payment Terms</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                We accept payments through various modes including credit cards, debit cards, net banking, and UPI. All payments must be made in Indian Rupees.
              </p>
              <p>
                For international transactions, the conversion rate will be as per the current bank rate on the day of transaction.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">4. Travel Documentation</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                Customers are responsible for ensuring they have valid travel documents including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Valid passport with minimum 6 months validity</li>
                <li>Necessary visas and permits</li>
                <li>Travel insurance</li>
                <li>Vaccination certificates where required</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">5. Liability</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                BELSWISH acts as an agent for transportation, hotels, and other service providers and is not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Any injury, damage, loss, accident, delay, or irregularity</li>
                <li>Changes in schedule or itinerary due to circumstances beyond our control</li>
                <li>Any additional expenses arising from such changes</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">6. Privacy Policy</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                We respect your privacy and protect your personal information. Our detailed privacy policy explains how we collect, use, and protect your data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">7. Contact Information</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                For any queries regarding these terms and conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>Email: info@belwishtravels.com</p>
                <p>Phone: +91 99615 30776</p>
                <p>Address: 2nd floor, Makkah tower, court road manjeri, malappuram, kerala-676521</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Terms;