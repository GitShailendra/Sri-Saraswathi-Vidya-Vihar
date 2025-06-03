
import { Link } from 'react-router-dom';
import { Calendar, FileText, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-school-blue to-school-blue/80 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Us Today</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Be part of a legacy that nurtures knowledge, character, and capability. Admissions are now open!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-3 text-school-orange" />
                <h3 className="text-xl font-semibold">Admission Process</h3>
              </div>
              <p className="text-white/80 mb-4">
                Learn about our straightforward admission process, eligibility criteria, and required documentation.
              </p>
              <Link
                to="/admissions"
                className="inline-flex items-center text-school-orange hover:underline"
              >
                View Process
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 mr-3 text-school-orange" />
                <h3 className="text-xl font-semibold">Schedule a Visit</h3>
              </div>
              <p className="text-white/80 mb-4">
                Visit our campus, meet our faculty, and experience our facilities firsthand before making your decision.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-school-orange hover:underline"
              >
                Book a Tour
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 mr-3 text-school-orange" />
                <h3 className="text-xl font-semibold">Contact Us</h3>
              </div>
              <p className="text-white/80 mb-4">
                Have questions? Our admission counselors are ready to help you with any inquiries about joining our school.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-school-orange hover:underline"
              >
                Get in Touch
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center bg-school-orange hover:bg-orange-500 text-white font-medium px-8 py-4 rounded-md transition-colors shadow-lg"
            >
              Start Admission Process
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
