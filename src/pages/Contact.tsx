import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, CheckCircle, XCircle, X } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Auto-hide notification after 3 seconds
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://vidya-vista-rebuild.onrender.com/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success notification
        showNotification('success', 'Message sent successfully! We will get back to you soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // Show error notification
        showNotification('error', data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('error', 'Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Notification Banner */}
      {notification.type && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        } max-w-md w-full mx-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification({ type: null, message: '' })}
              className="text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-school-blue/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-school-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Our Address</h3>
              <p className="text-gray-600">
                12-3-456, Main Street<br />
                City Name, State - 500001<br />
                India
              </p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-school-blue/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-school-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-1">
                Phone: +91 90596 29689
+91 73375 53175
              </p>
              <p className="text-gray-600">
                Toll Free: 1800-123-4567
              </p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-school-blue/10 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-school-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-600 mb-1">
                Monday - Friday: 8:00 AM - 4:30 PM
              </p>
              <p className="text-gray-600">
                Saturday: 8:00 AM - 12:30 PM
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 shadow-md">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-school-dark mb-4">Send Us a Message</h2>
              <p className="text-gray-600">
                We'd love to hear from you! Fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select a subject</option>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="General Information">General Information</option>
                    <option value="Fee Structure">Fee Structure</option>
                    <option value="Campus Visit">Campus Visit</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent disabled:opacity-50"
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-school-blue hover:bg-blue-700 px-8 py-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-school-dark mb-8 text-center">Our Location</h2>
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2167850842125!2d78.38864411469082!3d17.44930198804063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dceb4710d1%3A0xd93d3244d337b9bd!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1614582831271!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;