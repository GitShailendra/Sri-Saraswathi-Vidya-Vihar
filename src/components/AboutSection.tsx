
import { Link } from 'react-router-dom';
import logo from "../assets/SriVidyaLogo.png";
import image from "../assets/Images/SchoolBuilding.png";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt="Students in classroom"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-school-orange text-white px-6 py-4 rounded shadow-lg md:w-64 animate-fade-in">
                <p className="text-lg font-medium mb-1">Established in</p>
                <p className="text-3xl font-serif font-bold">1988</p>
              </div>
              <div className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg z-10 hidden md:block animate-fade-in" style={{ animationDelay: '200ms' }}>
                <img 
                  src={logo}
                  alt="School Logo" 
                  className="h-20 w-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/80x80?text=SSVV";
                  }}
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark relative">
                About Our School
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-school-orange"></span>
              </h2>
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Sri Saraswathi Vidya Vihar has been a pillar of educational excellence in our community since 1988. We offer a value-based learning experience that blends rich academics with students' well-being, guided by an expert staff and passionate management.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our approach focuses on developing well-rounded individuals prepared for future challenges. We combine traditional values with innovative teaching methods to create an inspiring learning environment where students can discover their potential.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-school-blue font-bold text-lg mb-1">Vision</div>
                <p className="text-sm text-gray-600">To nurture global citizens with strong values and excellent academic capabilities</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-school-blue font-bold text-lg mb-1">Mission</div>
                <p className="text-sm text-gray-600">Providing quality education that balances academic excellence with character development</p>
              </div>
            </div>
            
            <div className="mt-8">
              <blockquote className="italic text-gray-600 border-l-4 border-school-orange pl-4 py-2 animate-fade-in">
                "Education is not the filling of a pail, but the lighting of a fire." – Sri Kannuri Sanjeevi, Founder
              </blockquote>
            </div>

            {/* <div className="mt-8">
              <Link 
                to="/about"
                className="inline-flex items-center font-medium text-school-blue hover:text-school-orange transition-colors"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
