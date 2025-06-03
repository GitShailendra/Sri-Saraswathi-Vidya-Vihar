import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/SriVidyaLogo.png"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`w-full ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        } fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo}
                alt="Sri Saraswathi Vidya Vihar Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/60x60?text=SSVV";
                }}
              />
              <div className="ml-3 hidden md:block">
                <h1 className={`font-serif text-lg font-semibold leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-school-blue' : 'text-white'
                }`}>
                  Sri Saraswathi Vidya Vihar
                </h1>
                <p className={`text-xs font-nunito transition-colors duration-300 ${
                  isScrolled ? 'text-school-dark' : 'text-white/90'
                }`}>
                  Empowering young minds since 1988
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex space-x-8 text-sm font-medium font-poppins">
                <li>
                  <Link 
                    to="/" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/about') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/academics" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/academics') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Academics
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/facilities" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/facilities') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admissions" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/admissions') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gallery" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/gallery') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/notices" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/notices') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Notices
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`transition-colors border-b-2 pb-1 ${
                      isActive('/contact') 
                        ? 'border-school-orange text-school-orange' 
                        : `border-transparent ${
                            isScrolled 
                              ? 'text-school-dark hover:text-school-orange' 
                              : 'text-white hover:text-school-orange'
                          }`
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Navigation Toggle */}
            <button 
              className={`md:hidden p-2 z-60 relative transition-colors duration-300 ${
                isMenuOpen 
                  ? 'text-white' 
                  : isScrolled 
                    ? 'text-school-dark' 
                    : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Navigation Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-school-blue via-school-blue/95 to-school-orange/90"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative h-full w-full flex flex-col justify-center items-center px-8 py-20 transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
        }`}>
          {/* Navigation Links */}
          <nav className="flex-1 flex items-center justify-center w-full max-w-sm">
            <ul className="space-y-6 text-center font-poppins w-full">
              <li>
                <Link 
                  to="/" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/about') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/academics" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/academics') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link 
                  to="/facilities" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/facilities') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link 
                  to="/admissions" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/admissions') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/gallery') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/notices" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/notices') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notices
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block text-xl font-medium transition-all duration-200 py-3 ${
                    isActive('/contact') 
                      ? 'text-school-orange' 
                      : 'text-white hover:text-school-orange'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;