import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { BarChart3, Users, Package, Globe2, MessageSquare, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    totalPackages: 0,
    totalCountries: 0,
    monthlyBookings: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    // Fetch dashboard stats
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    // This would fetch real stats from your API
    setStats({
      totalEnquiries: 156,
      totalPackages: 24,
      totalCountries: 12,
      monthlyBookings: 89
    });
  };

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Tour Packages',
      value: stats.totalPackages,
      icon: Package,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Countries',
      value: stats.totalCountries,
      icon: Globe2,
      color: 'bg-purple-500',
      change: '+2%'
    },
    {
      title: 'Monthly Bookings',
      value: stats.monthlyBookings,
      icon: TrendingUp,
      color: 'bg-rose-500',
      change: '+18%'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your travel business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Enquiries</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', service: 'Dubai Package', time: '2 hours ago' },
                { name: 'Jane Smith', service: 'UK Visa', time: '4 hours ago' },
                { name: 'Mike Johnson', service: 'Umrah Package', time: '6 hours ago' },
                { name: 'Sarah Wilson', service: 'Singapore Tour', time: '8 hours ago' }
              ].map((enquiry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{enquiry.name}</p>
                    <p className="text-sm text-gray-600">{enquiry.service}</p>
                  </div>
                  <span className="text-xs text-gray-500">{enquiry.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/admin/packages')}
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
              >
                <Package className="mx-auto mb-2 text-blue-600" size={24} />
                <span className="text-sm font-medium text-blue-800">Manage Packages</span>
              </button>
              <button
                onClick={() => navigate('/admin/visa')}
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
              >
                <Globe2 className="mx-auto mb-2 text-green-600" size={24} />
                <span className="text-sm font-medium text-green-800">Visa Management</span>
              </button>
              <button
                onClick={() => navigate('/admin/enquiries')}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
              >
                <MessageSquare className="mx-auto mb-2 text-purple-600" size={24} />
                <span className="text-sm font-medium text-purple-800">View Enquiries</span>
              </button>
              <button
                onClick={() => navigate('/admin/settings')}
                className="p-4 bg-rose-50 hover:bg-rose-100 rounded-lg text-center transition-colors"
              >
                <BarChart3 className="mx-auto mb-2 text-rose-600" size={24} />
                <span className="text-sm font-medium text-rose-800">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;