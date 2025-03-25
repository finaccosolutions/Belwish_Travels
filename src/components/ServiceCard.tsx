import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, image }) => {
  return (
    <div className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-500">
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        />
        <button className="mt-6 w-full bg-gradient-to-r from-rose-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-indigo-600 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;