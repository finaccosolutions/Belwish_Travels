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
    <div className="relative group overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-800/80 group-hover:from-gray-900/95 group-hover:to-gray-800/85 transition-all duration-300" />
      </div>
      <div className="relative p-8">
        <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
          <Icon size={40} />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-gray-100 transition-colors">{title}</h3>
        <p className="text-gray-300 group-hover:text-white transition-colors">{description}</p>
        <div className="mt-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-all duration-300">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;