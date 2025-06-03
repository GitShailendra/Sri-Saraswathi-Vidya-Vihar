
import Navigation from '../components/Navigation';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            About Our School
          </h1>
          <AboutSection />
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-school-dark mb-6">Our History</h2>
            <p className="text-gray-600 mb-6 font-poppins">
              Sri Saraswathi Vidya Vihar was founded in 1988 with a vision to provide quality education that balances academic excellence with character development. Over the decades, we have grown from a small institution to one of the most respected educational establishments in the region.
            </p>
            <p className="text-gray-600 mb-6 font-poppins">
              Our school's journey has been marked by continuous improvement and adaptation to modern educational practices while staying true to our foundational values. Today, we proudly stand as an institution that nurtures thousands of young minds every year.
            </p>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-school-dark mb-6">Our Philosophy</h2>
            <p className="text-gray-600 mb-6 font-poppins">
              At Sri Saraswathi Vidya Vihar, we believe in the holistic development of each child. Our educational approach focuses on nurturing not just academic excellence but also ethical values, social consciousness, and physical well-being.
            </p>
            <p className="text-gray-600 mb-6 font-poppins">
              We view education as a collaborative journey involving students, teachers, and parents. By creating a supportive learning environment, we enable our students to discover their potential and develop into responsible global citizens.
            </p>
          </div>

          <div className="mt-16 p-8 bg-school-soft-blue rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-bold text-school-dark mb-6">Founder's Vision</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto border-4 border-white shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400" 
                    alt="Sri Kannuri Sanjeevi, Founder" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <blockquote className="italic text-lg text-gray-700 border-l-4 border-school-orange pl-4 py-2 font-nunito">
                  "Education is not the filling of a pail, but the lighting of a fire. Our mission is to ignite the spark of curiosity and foster a lifelong love for learning in every child who passes through our gates."
                </blockquote>
                <p className="mt-4 text-right font-medium text-school-dark">— Sri Kannuri Sanjeevi, Founder</p>
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

export default About;
