
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { FileText, Calendar, Phone } from 'lucide-react';

const Admissions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Admissions
          </h1>
          
          <div className="bg-gradient-to-r from-school-blue/10 to-school-orange/10 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-serif font-bold text-school-dark mb-4">Admission Process</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in Sri Saraswathi Vidya Vihar. Our admission process is designed to be straightforward while ensuring we find the best fit for our school community.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-school-blue">Steps for Admission:</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600">
                <li>Fill out the application form (available online or at the school office)</li>
                <li>Submit required documents (birth certificate, previous academic records, transfer certificate if applicable)</li>
                <li>Schedule an interaction session/entrance assessment</li>
                <li>Receive admission decision</li>
                <li>Complete fee payment to secure admission</li>
              </ol>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-school-blue">
              <h2 className="text-xl font-semibold mb-4 text-school-dark">Eligibility Criteria</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Primary School (Classes 1-5): Age 5-10 years</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Middle School (Classes 6-8): Age appropriate for the class applied for with satisfactory academic performance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-orange mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>High School (Classes 9-10): Admission based on entrance test and previous academic records</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-school-orange">
              <h2 className="text-xl font-semibold mb-4 text-school-dark">Required Documents</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Birth Certificate (original and photocopy)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Transfer Certificate from previous school (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Report cards from the previous two academic years</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Four passport-size photographs of the student</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Address proof and ID proof of parents/guardians</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-bold text-school-dark mb-6">Contact Admission Office</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 text-school-orange mr-2" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 text-school-orange mr-2" />
                <span>Monday to Friday: 9:00 AM - 3:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-school-orange hover:bg-orange-600">
                <FileText className="mr-2" />
                Contact For Admission
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Admissions;
