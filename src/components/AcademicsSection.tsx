
import { Link } from 'react-router-dom';
import { BookOpen, Users, Pencil, Award, Clock } from 'lucide-react';

const AcademicsSection = () => {
  return (
    <section className="py-20 bg-white" id="academics">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark inline-block relative">
            Academics & Activities
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-school-orange"></span>
          </h2>
          <p className="mt-6 text-gray-600 font-poppins">
            Our curriculum is designed to develop, nurture and enhance both analytical and creative learning abilities. Students are encouraged to explore Science, Arts, Technology, and Sports in an engaging environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-school-soft-blue rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow animate-fade-in">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200"
                alt="Academic Programs"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-dark/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-2xl font-serif font-bold">Academic Programs</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 font-poppins">
                <li className="flex items-start">
                  <BookOpen className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Primary School (Classes 1-5)</span>
                    <p className="text-sm text-gray-600 mt-1">Foundation for lifelong learning with focus on fundamental skills and character development</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Middle School (Classes 6-8)</span>
                    <p className="text-sm text-gray-600 mt-1">Building on fundamentals with introduction to specialized subjects and critical thinking</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Pencil className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">High School (Classes 9-10)</span>
                    <p className="text-sm text-gray-600 mt-1">Comprehensive preparation for board exams with specialized coaching and career guidance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Special Focus on STEM Education</span>
                    <p className="text-sm text-gray-600 mt-1">Project-based learning in Science, Technology, Engineering and Mathematics</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link 
                  to="/academics" 
                  className="inline-flex items-center font-medium text-school-blue hover:text-school-orange transition-colors"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-school-soft-yellow rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=1200"
                alt="Co-Curricular Activities"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-dark/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-2xl font-serif font-bold">Co-Curricular Activities</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 font-poppins">
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Sports & Athletics Programs</span>
                    <p className="text-sm text-gray-600 mt-1">Regular training in cricket, basketball, volleyball, athletics with professional coaches</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Cultural & Performing Arts</span>
                    <p className="text-sm text-gray-600 mt-1">Classes in dance, music, drama, and visual arts with regular performances</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Clubs & Student Societies</span>
                    <p className="text-sm text-gray-600 mt-1">Science, literary, eco, and robotics clubs for specialized interests</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-school-orange mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Educational Tours & Community Service</span>
                    <p className="text-sm text-gray-600 mt-1">Regular field trips and social responsibility projects to develop rounded personalities</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link 
                  to="/activities" 
                  className="inline-flex items-center font-medium text-school-blue hover:text-school-orange transition-colors"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/academics" 
            className="bg-school-blue hover:bg-school-blue/90 text-white font-poppins font-medium px-8 py-3 rounded-md transition-all transform hover:scale-105 inline-flex items-center"
          >
            Explore Academics
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
