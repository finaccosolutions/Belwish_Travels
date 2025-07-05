import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, Fuel as Mosque } from 'lucide-react';
import { adminAPI } from '../../utils/api';

interface UmrahPackage {
  id: number;
  title: string;
  duration: string;
  price: number;
  category: string;
  features: string[];
  accommodation_details: string;
  flight_details: string;
  visa_processing: string;
  transportation: string;
  meals_included: string;
  ziyarat_details: string;
  special_services: string;
  is_active: boolean;
}

const AdminUmrah = () => {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await adminAPI.getUmrahPackages();
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching Umrah packages:', error);
    }
  };

  const handleUpdatePackage = async (pkg: UmrahPackage) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await adminAPI.updateUmrahPackages(pkg);
      if (response.data.success) {
        setMessage('Package updated successfully!');
        fetchPackages();
      } else {
        setMessage('Error updating package');
      }
    } catch (error) {
      setMessage('Error updating package');
    } finally {
      setLoading(false);
    }
  };

  const updatePackage = (id: number, field: string, value: any) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ));
  };

  const updateFeature = (packageId: number, featureIndex: number, value: string) => {
    setPackages(packages.map(pkg => {
      if (pkg.id === packageId) {
        const newFeatures = [...pkg.features];
        newFeatures[featureIndex] = value;
        return { ...pkg, features: newFeatures };
      }
      return pkg;
    }));
  };

  const addFeature = (packageId: number) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, features: [...pkg.features, ''] } : pkg
    ));
  };

  const removeFeature = (packageId: number, featureIndex: number) => {
    setPackages(packages.map(pkg => {
      if (pkg.id === packageId) {
        const newFeatures = pkg.features.filter((_, index) => index !== featureIndex);
        return { ...pkg, features: newFeatures };
      }
      return pkg;
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Mosque className="mr-3" size={32} />
            Umrah Packages
          </h1>
          <p className="text-gray-600 mt-2">Manage Umrah packages and services</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Title</label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) => updatePackage(pkg.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={pkg.duration}
                    onChange={(e) => updatePackage(pkg.id, 'duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => updatePackage(pkg.id, 'price', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={pkg.category}
                    onChange={(e) => updatePackage(pkg.id, 'category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(pkg.id, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    {pkg.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(pkg.id, index)}
                        className="text-red-500 hover:text-red-700 px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature(pkg.id)}
                  className="text-rose-500 hover:text-rose-700 text-sm"
                >
                  + Add Feature
                </button>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Details</label>
                  <textarea
                    value={pkg.accommodation_details}
                    onChange={(e) => updatePackage(pkg.id, 'accommodation_details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Flight Details</label>
                  <textarea
                    value={pkg.flight_details}
                    onChange={(e) => updatePackage(pkg.id, 'flight_details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visa Processing</label>
                  <textarea
                    value={pkg.visa_processing}
                    onChange={(e) => updatePackage(pkg.id, 'visa_processing', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                  <textarea
                    value={pkg.transportation}
                    onChange={(e) => updatePackage(pkg.id, 'transportation', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meals Included</label>
                  <textarea
                    value={pkg.meals_included}
                    onChange={(e) => updatePackage(pkg.id, 'meals_included', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ziyarat Details</label>
                  <textarea
                    value={pkg.ziyarat_details}
                    onChange={(e) => updatePackage(pkg.id, 'ziyarat_details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Services</label>
                <textarea
                  value={pkg.special_services}
                  onChange={(e) => updatePackage(pkg.id, 'special_services', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pkg.is_active}
                    onChange={(e) => updatePackage(pkg.id, 'is_active', e.target.checked)}
                    className="mr-2"
                  />
                  Active Package
                </label>
                
                <button
                  onClick={() => handleUpdatePackage(pkg)}
                  disabled={loading}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  <span>{loading ? 'Saving...' : 'Save Package'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUmrah;