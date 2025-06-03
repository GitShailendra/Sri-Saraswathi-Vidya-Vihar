
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-school-dark/80 to-school-blue/50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 animate-fade-in">
        <div className="max-w-3xl text-white">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Welcome to <span className="text-school-orange">Sri Saraswathi Vidya Vihar</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Empowering young minds since 1988 with excellence in education, character building, and holistic development.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/admissions" className="bg-school-orange hover:bg-school-orange/90 text-white font-medium px-8 py-3 rounded-md transition-all transform hover:scale-105 flex items-center">
              Admissions Open <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/about" className="bg-transparent border-2 border-white hover:border-school-orange hover:text-school-orange text-white font-medium px-8 py-3 rounded-md transition-colors">
              Learn More
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-8">
            <div className="flex items-center animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm opacity-80">Years of Excellence</p>
                <p className="text-xl font-semibold">35+</p>
              </div>
            </div>
            <div className="flex items-center animate-slide-in" style={{ animationDelay: '300ms' }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm opacity-80">Qualified Teachers</p>
                <p className="text-xl font-semibold">50+</p>
              </div>
            </div>
            <div className="flex items-center animate-slide-in" style={{ animationDelay: '400ms' }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm opacity-80">Happy Students</p>
                <p className="text-xl font-semibold">1000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
