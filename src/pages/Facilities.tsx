
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { CheckCircle } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      title: "Smart Classrooms",
      description: "Our digitally-enhanced classrooms feature interactive whiteboards, projectors, and modern teaching tools that make learning engaging and effective.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800"
    },
    {
      title: "Science & Computer Labs",
      description: "Well-equipped science laboratories and computer labs with the latest technology provide hands-on learning experiences for our students.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800"
    },
    {
      title: "Library & Art Rooms",
      description: "Our extensive library houses thousands of books across various subjects, while dedicated art rooms foster creativity and expression.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800"
    },
    {
      title: "Sports Grounds & Activity Halls",
      description: "Spacious playgrounds for outdoor sports and well-designed activity halls for indoor games ensure physical development alongside academics.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Our Facilities
          </h1>
          
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Sri Saraswathi Vidya Vihar provides state-of-the-art facilities that create an ideal environment for learning, growth, and development. Our campus is designed to support both academic excellence and co-curricular activities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {facilities.map((facility, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x400?text=Facility+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-school-dark">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-school-dark mb-6">Additional Campus Amenities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Spacious and well-ventilated classrooms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Hygienic cafeteria serving nutritious meals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Medical room with first-aid facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">School transport with safety features</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated music and dance studios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Auditorium for performances and events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">CCTV surveillance for enhanced security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Eco-friendly campus with green spaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Facilities;
