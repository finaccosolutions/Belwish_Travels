import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, FileText, Users, GraduationCap, Upload, Send, Globe, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { publicAPI } from '../utils/api';

interface Country {
  id: number;
  name: string;
  flag: string;
  slug: string;
}

interface VisaDetails {
  id: number;
  country_id: number;
  visa_type: string;
  documents_required: string[];
  processing_time: string;
  visa_fee: string;
  process_description: string;
  additional_info: string;
}

const Visa = () => {
  const [selectedVisaType, setSelectedVisaType] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [visaDetails, setVisaDetails] = useState<VisaDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const visaTypes = [
    {
      type: 'tourist',
      title: 'Tourist Visa',
      description: 'For leisure travel and sightseeing',
      icon: Plane,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-200'
    },
    {
      type: 'business',
      title: 'Business Visa',
      description: 'For business meetings and conferences',
      icon: Users,
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      shadowColor: 'shadow-green-200'
    },
    {
      type: 'student',
      title: 'Student Visa',
      description: 'For educational purposes and studies',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      shadowColor: 'shadow-purple-200'
    }
  ];

  const fetchCountriesForVisaType = async (visaType: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await publicAPI.getVisaCountries(visaType);
      setCountries(response.data);
    } catch (err) {
      setError('Error fetching countries for visa type');
      console.error('Error fetching countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVisaDetails = async (countryId: number, visaType: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await publicAPI.getVisaDetails(countryId, visaType);
      setVisaDetails(response.data);
    } catch (err) {
      setError('Error fetching visa details');
      console.error('Error fetching visa details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVisaTypeSelect = (visaType: string) => {
    setSelectedVisaType(visaType);
    setSelectedCountry(null);
    setVisaDetails(null);
    setShowEnquiryForm(false);
    setShowUploadForm(false);
    fetchCountriesForVisaType(visaType);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowEnquiryForm(false);
    setShowUploadForm(false);
    fetchVisaDetails(country.id, selectedVisaType);
  };

  const handleBackToVisaTypes = () => {
    setSelectedVisaType('');
    setCountries([]);
    setSelectedCountry(null);
    setVisaDetails(null);
    setShowEnquiryForm(false);
    setShowUploadForm(false);
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setVisaDetails(null);
    setShowEnquiryForm(false);
    setShowUploadForm(false);
  };

  const EnquiryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
      visa_type: selectedVisaType,
      country: selectedCountry?.name || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await publicAPI.submitEnquiry({
          ...formData,
          type: 'visa_enquiry'
        });
        alert('Enquiry submitted successfully!');
        setShowEnquiryForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          visa_type: selectedVisaType,
          country: selectedCountry?.name || ''
        });
      } catch (err) {
        alert('Error submitting enquiry. Please try again.');
      }
    };

    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Visa Enquiry</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 group-hover:border-gray-300"
              placeholder="Enter your full name"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 group-hover:border-gray-300"
              placeholder="Enter your email address"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 group-hover:border-gray-300"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 group-hover:border-gray-300 resize-none"
              placeholder="Tell us about your travel plans..."
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Enquiry
            </button>
            <button
              type="button"
              onClick={() => setShowEnquiryForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFile) return;

      setUploading(true);
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('visa_type', selectedVisaType);
      formData.append('country', selectedCountry?.name || '');

      try {
        await publicAPI.uploadDocument(formData);
        alert('Document uploaded successfully!');
        setShowUploadForm(false);
        setSelectedFile(null);
      } catch (err) {
        alert('Error uploading document. Please try again.');
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full mr-4">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Upload Documents</h3>
        </div>
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Document
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 group-hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB)
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                'Upload Document'
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowUploadForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 opacity-5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm">
                <Globe className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your gateway to the world - Professional visa assistance with expert guidance every step of the way
            </p>
            <div className="flex justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Fast Processing
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Expert Support
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Global Coverage
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Visa Type Selection */}
        {!selectedVisaType && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Choose Your Visa Type</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select the type of visa that matches your travel purpose</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visaTypes.map((visa) => {
                const IconComponent = visa.icon;
                return (
                  <div
                    key={visa.type}
                    onClick={() => handleVisaTypeSelect(visa.type)}
                    className="group relative bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${visa.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Icon container */}
                    <div className={`relative bg-gradient-to-br ${visa.color} group-hover:bg-gradient-to-br group-hover:${visa.hoverColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-all duration-500 ${visa.shadowColor} shadow-lg group-hover:shadow-xl`}>
                      <IconComponent className="w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{visa.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{visa.description}</p>
                    
                    <button className={`bg-gradient-to-r ${visa.color} group-hover:bg-gradient-to-r group-hover:${visa.hoverColor} text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform group-hover:-translate-y-1`}>
                      Select This Visa
                    </button>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Country Selection */}
        {selectedVisaType && !selectedCountry && (
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Select Country for {visaTypes.find(v => v.type === selectedVisaType)?.title}
                </h2>
                <p className="text-gray-600">Choose your destination country</p>
              </div>
              <button
                onClick={handleBackToVisaTypes}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                ← Back to Visa Types
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="mt-6 text-xl text-gray-600 font-medium">Loading countries...</p>
                <p className="text-gray-500">Please wait while we fetch available destinations</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    className="group bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:scale-105 hover:-translate-y-2"
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-14 mx-auto rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-lg">{country.name}</h3>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm text-blue-600 font-medium">Click to view details →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visa Details */}
        {selectedCountry && visaDetails && (
          <div>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <img
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  className="w-12 h-8 object-cover rounded mr-4 shadow-md"
                />
                <div>
                  <h2 className="text-4xl font-bold text-gray-800">
                    {selectedCountry.name} - {visaTypes.find(v => v.type === selectedVisaType)?.title}
                  </h2>
                  <p className="text-gray-600">Complete visa information and requirements</p>
                </div>
              </div>
              <button
                onClick={handleBackToCountries}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                ← Back to Countries
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Visa Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Visa Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-gray-700">Processing Time</h4>
                      </div>
                      <p className="text-gray-600 font-medium">{visaDetails.processing_time}</p>
                    </div>
                    <div className="group p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                      <div className="flex items-center mb-2">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-gray-700">Visa Fee</h4>
                      </div>
                      <p className="text-gray-600 font-medium">{visaDetails.visa_fee}</p>
                    </div>
                  </div>
                </div>

                {/* Documents Required */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Documents Required</h3>
                  </div>
                  <div className="space-y-3">
                    {visaDetails.documents_required.map((doc, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                        <div className="bg-green-100 p-2 rounded-full mr-4 group-hover:bg-green-200 transition-colors duration-200">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Description */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Visa Process</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{visaDetails.process_description}</p>
                </div>

                {/* Additional Information */}
                {visaDetails.additional_info && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full mr-4">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">Additional Information</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{visaDetails.additional_info}</p>
                  </div>
                )}
              </div>

              {/* Action Panel */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Get Started</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowEnquiryForm(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    >
                      <Send className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                      Make Enquiry
                    </button>
                    <button
                      onClick={() => setShowUploadForm(true)}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    >
                      <Upload className="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform duration-300" />
                      Upload Documents
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Need Help?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Phone</p>
                        <p className="text-gray-600">+1 234 567 8900</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Send className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Email</p>
                        <p className="text-gray-600">visa@belwishtravels.com</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Office Hours</p>
                        <p className="text-gray-600">Mon-Fri 9AM-6PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forms */}
            {showEnquiryForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <EnquiryForm />
                </div>
              </div>
            )}

            {showUploadForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <UploadForm />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Visa;