import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Eye, CheckCircle, Clock, X } from 'lucide-react';
import { adminAPI } from '../../utils/api';

interface Enquiry {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  package_title?: string;
  visa_type: string;
  message: string;
  status: string;
  admin_notes: string;
  created_at: string;
}

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await adminAPI.getEnquiries();
      if (response.data.success) {
        setEnquiries(response.data.enquiries);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const handleStatusUpdate = async (id: number, status: string, notes: string = '') => {
    try {
      await adminAPI.updateEnquiryStatus(id, status);
      fetchEnquiries();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating enquiry:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visa': return '🛂';
      case 'package': return '📦';
      case 'umrah': return '🕋';
      case 'flight': return '✈️';
      default: return '💬';
    }
  };

  const filteredEnquiries = filterStatus === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filterStatus);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Enquiries</h1>
            <p className="text-gray-600 mt-2">Manage customer enquiries and requests</p>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                        <div className="text-sm text-gray-500">{enquiry.email}</div>
                        <div className="text-sm text-gray-500">{enquiry.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getTypeIcon(enquiry.type)}</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">{enquiry.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.package_title || enquiry.country || enquiry.visa_type || 'General'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(enquiry.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(enquiry.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enquiry Detail Modal */}
        {showModal && selectedEnquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Enquiry Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                        <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                        <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                        <p><strong>Date:</strong> {new Date(selectedEnquiry.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
                      <div className="space-y-2">
                        <p><strong>Type:</strong> {selectedEnquiry.type}</p>
                        {selectedEnquiry.country && <p><strong>Country:</strong> {selectedEnquiry.country}</p>}
                        {selectedEnquiry.visa_type && <p><strong>Visa Type:</strong> {selectedEnquiry.visa_type}</p>}
                        {selectedEnquiry.package_title && <p><strong>Package:</strong> {selectedEnquiry.package_title}</p>}
                        <p><strong>Status:</strong> 
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedEnquiry.status)}`}>
                            {selectedEnquiry.status.replace('_', ' ')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedEnquiry.message && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Message</h3>
                      <p className="bg-gray-50 p-4 rounded-lg">{selectedEnquiry.message}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Update Status</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(selectedEnquiry.id, 'new')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Mark as New
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedEnquiry.id, 'in_progress')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedEnquiry.id, 'completed')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedEnquiry.id, 'cancelled')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;