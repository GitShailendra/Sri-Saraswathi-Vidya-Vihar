
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We will get back to you soon.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
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
                Phone: +91 98765 43210
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" className="bg-school-blue hover:bg-blue-700 px-8 py-2">
                  Send Message
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
