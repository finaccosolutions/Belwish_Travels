import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, DollarSign, FileText, Upload, Send, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import { publicAPI } from '../utils/api';

interface CountryDetails {
  id: number;
  name: string;
  flag_emoji: string;
  description: string;
  capital: string;
  currency: string;
  language: string;
  best_time_to_visit: string;
  image_url: string;
  visa_details: {
    tourist: any;
    business: any;
    student: any;
  };
}

const VisaCountry = () => {
  const { country } = useParams<{ country: string }>();
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
  const [activeTab, setActiveTab] = useState('tourist');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    visa_type: 'tourist',
    message: ''
  });

  useEffect(() => {
    if (country) {
      fetchCountryDetails(country);
    }
  }, [country]);

  const fetchCountryDetails = async (slug: string) => {
    try {
      const response = await publicAPI.getCountryDetails(slug);
      if (response.data.success) {
        setCountryDetails(response.data.country);
      }
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await publicAPI.submitEnquiry({
        ...enquiryForm,
        type: 'visa',
        country: countryDetails?.name
      });
      if (response.data.success) {
        alert('Enquiry submitted successfully!');
        setShowEnquiryForm(false);
        setEnquiryForm({ name: '', email: '', phone: '', visa_type: 'tourist', message: '' });
      }
    } catch (error) {
      alert('Error submitting enquiry');
    }
  };

  if (!countryDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  const visaTypes = [
    { id: 'tourist', label: 'Tourist Visa', icon: MapPin },
    { id: 'business', label: 'Business Visa', icon: DollarSign },
    { id: 'student', label: 'Student Visa', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src={countryDetails.image_url}
          alt={countryDetails.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl font-bold mb-4 flex items-center">
                <span className="text-8xl mr-4">{countryDetails.flag_emoji}</span>
                {countryDetails.name} Visa
              </h1>
              <p className="text-xl mb-8">{countryDetails.description}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowEnquiryForm(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => setShowDocumentUpload(true)}
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
                >
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 text-rose-500" size={32} />
              <h3 className="font-semibold text-gray-800">Capital</h3>
              <p className="text-gray-600">{countryDetails.capital}</p>
            </div>
            <div className="text-center">
              <DollarSign className="mx-auto mb-2 text-rose-500" size={32} />
              <h3 className="font-semibold text-gray-800">Currency</h3>
              <p className="text-gray-600">{countryDetails.currency}</p>
            </div>
            <div className="text-center">
              <FileText className="mx-auto mb-2 text-rose-500" size={32} />
              <h3 className="font-semibold text-gray-800">Language</h3>
              <p className="text-gray-600">{countryDetails.language}</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-2 text-rose-500" size={32} />
              <h3 className="font-semibold text-gray-800">Best Time</h3>
              <p className="text-gray-600">{countryDetails.best_time_to_visit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visa Types Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {visaTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === type.id
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <type.icon className="mx-auto mb-2" size={24} />
                {type.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Visa Details Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {visaTypes.find(t => t.id === activeTab)?.label} Requirements
                </h3>
                <div className="space-y-4">
                  {[
                    'Valid passport with minimum 6 months validity',
                    'Completed visa application form',
                    'Recent passport-size photographs',
                    'Flight itinerary',
                    'Hotel bookings or invitation letter',
                    'Bank statements (last 6 months)',
                    'Travel insurance',
                    'Employment certificate (if applicable)'
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Processing Information</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Processing Time:</span>
                    <span className="text-gray-600">5-7 working days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Visa Validity:</span>
                    <span className="text-gray-600">90 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Stay Duration:</span>
                    <span className="text-gray-600">30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Entry Type:</span>
                    <span className="text-gray-600">Single/Multiple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Service Fee:</span>
                    <span className="text-rose-500 font-bold">Starting from ₹4,999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Visa Enquiry</h2>
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
                  <select
                    value={enquiryForm.visa_type}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, visa_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="tourist">Tourist Visa</option>
                    <option value="business">Business Visa</option>
                    <option value="student">Student Visa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEnquiryForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Document Upload Modal */}
      {showDocumentUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Documents</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600 mb-4">Drag and drop your documents here</p>
                  <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
                    Choose Files
                  </button>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDocumentUpload(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default VisaCountry;