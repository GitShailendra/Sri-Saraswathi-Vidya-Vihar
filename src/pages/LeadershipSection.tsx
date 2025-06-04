import React from 'react';

import founder from "../assets/Images/Founder.jpg";
import director from "../assets/Images/director.jpg";
import principal from "../assets/Images/principal.jpg";
import administrator from "../assets/Images/managment.jpg"

const LeadershipSection = () => {
  const leaders = [
    {
      id: 1,
      name: "Kannuri Sanjeevi",
      title: "Founder & Mentor",
      experience: "45 Years of Teaching Experience",
      image: founder
    },
    {
      id: 2,
      name: "Kannuri Meenakshi Devi",
      title: "Academic Director",
      experience: "35 Years of Teaching Experience",
      image: director
    },
    {
      id: 3,
      name: "Kannuri Prudhvi Raj",
      title: "Principal",
      experience: "12 Years of Experience in Education",
      image: principal
    },
    {
      id: 4,
      name: "Kannuri Anvesh",
      title: "Administrator & Technological Head",
      experience: "7 Years of Experience",
      image: administrator
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-1 h-12 bg-orange-500 mr-4"></div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
              Our Leadership
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-2 font-serif">
                  {leader.name}
                </h3>
                <p className="text-gray-700 font-medium mb-3">
                  {leader.title}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {leader.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Our leadership team brings together decades of educational expertise, innovative thinking, 
            and unwavering commitment to student success. Together, they guide Sri Saraswathi Vidya Vihar 
            towards excellence in education and character development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadershipSection;