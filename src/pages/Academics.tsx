
import Navigation from '../components/Navigation';
import AcademicsSection from '../components/AcademicsSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Academics = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Academics
          </h1>
          
          <AcademicsSection />
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-school-dark mb-6">Curriculum Overview</h2>
            <p className="text-gray-600 mb-6 font-poppins">
              Our curriculum is designed to meet national educational standards while incorporating innovative teaching methods. We focus on creating a balance between theoretical knowledge and practical application.
            </p>
            <p className="text-gray-600 mb-6 font-poppins">
              The academic program is structured to encourage critical thinking, problem-solving, and creativity. Our teachers use a variety of instructional strategies to accommodate different learning styles and ensure that every student can succeed.
            </p>
            <div className="bg-school-soft-green p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-xl font-semibold text-school-dark mb-4">Key Features of Our Curriculum</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Activity-based learning approaches</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Integration of technology in classrooms</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Regular assessments and feedback</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Special support for different learning needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Project-based learning initiatives</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-school-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Environmental awareness programs</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-school-dark mb-6">Faculty</h2>
            <p className="text-gray-600 mb-6 font-poppins">
              Our teaching staff consists of highly qualified and experienced educators who are passionate about teaching. They regularly participate in professional development programs to stay updated with the latest educational methodologies.
            </p>
            <p className="text-gray-600 mb-6 font-poppins">
              The teacher-student ratio is maintained at an optimal level to ensure personalized attention for each student. Our faculty members are not just teachers but mentors who guide students in their academic and personal growth.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Academics;
