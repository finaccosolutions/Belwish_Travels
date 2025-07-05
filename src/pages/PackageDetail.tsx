import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Calendar, Send, Upload } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import { publicAPI } from '../utils/api';

interface PackageDetails {
  id: number;
  title: string;
  category: string;
  duration: string;
  price: number;
  discounted_price?: number;
  description: string;
  detailed_description: string;
  highlights: string[];
  inclusions: string;
  exclusions: string;
  itinerary: string;
  image_url: string;
  gallery_images: string[];
  country: string;
  cities: string[];
  best_time: string;
  difficulty_level: string;
  group_size: string;
}

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (id) {
      fetchPackageDetails(parseInt(id));
    }
  }, [id]);

  const fetchPackageDetails = async (packageId: number) => {
    try {
      const response = await publicAPI.getPackageDetails(packageId);
      if (response.data.success) {
        setPackageDetails(response.data.package);
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await publicAPI.submitEnquiry({
        ...enquiryForm,
        type: 'package',
        package_id: packageDetails?.id
      });
      if (response.data.success) {
        alert('Enquiry submitted successfully!');
        setShowEnquiryForm(false);
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      alert('Error submitting enquiry');
    }
  };

  if (!packageDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src={packageDetails.image_url}
          alt={packageDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {packageDetails.category}
                </span>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span>4.8 (124 reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">{packageDetails.title}</h1>
              <p className="text-xl mb-6">{packageDetails.description}</p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  <span>{packageDetails.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2" size={20} />
                  <span>{packageDetails.country}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>{packageDetails.group_size || 'Any group size'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold">
                  {packageDetails.discounted_price && (
                    <span className="text-lg text-gray-300 line-through mr-2">
                      ₹{packageDetails.price.toLocaleString()}
                    </span>
                  )}
                  ₹{(packageDetails.discounted_price || packageDetails.price).toLocaleString()}
                </div>
                <button 
                  onClick={() => setShowEnquiryForm(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Package Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageDetails.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="text-rose-500 mr-3" size={20} />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            {packageDetails.detailed_description && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Package</h2>
                <p className="text-gray-700 leading-relaxed">{packageDetails.detailed_description}</p>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packageDetails.inclusions && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Inclusions</h3>
                    <div className="text-gray-700 whitespace-pre-line">{packageDetails.inclusions}</div>
                  </div>
                )}
                {packageDetails.exclusions && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Exclusions</h3>
                    <div className="text-gray-700 whitespace-pre-line">{packageDetails.exclusions}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Itinerary */}
            {packageDetails.itinerary && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Itinerary</h2>
                <div className="text-gray-700 whitespace-pre-line">{packageDetails.itinerary}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {packageDetails.discounted_price && (
                    <span className="text-lg text-gray-500 line-through mr-2">
                      ₹{packageDetails.price.toLocaleString()}
                    </span>
                  )}
                  ₹{(packageDetails.discounted_price || packageDetails.price).toLocaleString()}
                </div>
                <p className="text-gray-600">per person</p>
              </div>
              
              <button 
                onClick={() => setShowEnquiryForm(true)}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Book This Package
              </button>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{packageDetails.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="capitalize">{packageDetails.difficulty_level}</span>
                </div>
                {packageDetails.best_time && (
                  <div className="flex justify-between">
                    <span>Best Time:</span>
                    <span>{packageDetails.best_time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cities Covered */}
            {packageDetails.cities.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Cities Covered</h3>
                <div className="space-y-2">
                  {packageDetails.cities.map((city, index) => (
                    <div key={index} className="flex items-center">
                      <MapPin className="text-rose-500 mr-2" size={16} />
                      <span className="text-gray-700">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Package Enquiry</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Any specific requirements or questions..."
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

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default PackageDetail;