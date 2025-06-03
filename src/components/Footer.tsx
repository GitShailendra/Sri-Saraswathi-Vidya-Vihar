
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/SriVidyaLogo.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-school-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={logo}
                alt="Sri Saraswathi Vidya Vihar Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/60x60?text=SSVV";
                }}
              />
              <div className="ml-3">
                <h3 className="font-serif text-xl font-bold">Sri Saraswathi Vidya Vihar</h3>
                <p className="text-sm opacity-80">Empowering young minds since 1988</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed max-w-xs">
              A premier educational institution committed to academic excellence and holistic development of students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-school-orange transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-school-orange transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-school-orange transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-school-orange transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-school-orange transition-colors inline-block py-1">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-school-orange transition-colors inline-block py-1">About Us</Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-school-orange transition-colors inline-block py-1">Academics</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-school-orange transition-colors inline-block py-1">Admission Process</Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-school-orange transition-colors inline-block py-1">Facilities</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-school-orange transition-colors inline-block py-1">School Gallery</Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-school-orange transition-colors inline-block py-1">Notices & Circulars</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 border-b border-white/20 pb-2">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-school-orange" />
                <span>12-3-456, Main Street, City Name, State - 500001</span>
              </li>
              <li className="flex">
                <Phone size={18} className="mr-2 flex-shrink-0 text-school-orange" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail size={18} className="mr-2 flex-shrink-0 text-school-orange" />
                <span>info@srisaraswathividyavihar.edu</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">School Hours</h5>
              <p className="text-sm opacity-80">Monday - Friday: 8:00 AM - 4:30 PM</p>
              <p className="text-sm opacity-80">Saturday: 8:00 AM - 12:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70">© {currentYear} Sri Saraswathi Vidya Vihar. All rights reserved.</p>
            <p className="text-sm opacity-70 mt-2 md:mt-0">
              <span className="block md:inline">
                <Link to="/privacy-policy" className="hover:text-school-orange transition-colors">Privacy Policy</Link>
                <span className="mx-2 hidden md:inline">|</span>
              </span>
              <Link to="/terms-of-use" className="hover:text-school-orange transition-colors">Terms of Use</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
