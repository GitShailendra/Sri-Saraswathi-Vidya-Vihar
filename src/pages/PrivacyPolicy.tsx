
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Privacy Policy
          </h1>
          
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead">
              Sri Saraswathi Vidya Vihar is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or provide information to us.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect personal information when you:
            </p>
            <ul>
              <li>Submit an inquiry or application form</li>
              <li>Register for events or activities</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us through our website or email</li>
            </ul>
            <p>
              The information we collect may include:
            </p>
            <ul>
              <li>Name, email address, and contact information</li>
              <li>Student and parent/guardian details</li>
              <li>Academic records and previous school information</li>
              <li>Demographic information</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To process admission applications</li>
              <li>To communicate with you about school events and activities</li>
              <li>To respond to your inquiries</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              We are committed to protecting the privacy of children. Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the bottom of this page.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: info@srisaraswathividyavihar.edu</li>
              <li>By phone: +91 98765 43210</li>
              <li>By mail: 12-3-456, Main Street, City Name, State - 500001</li>
            </ul>
            
            <p className="text-sm text-gray-600 mt-8">
              Last Updated: May 15, 2025
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PrivacyPolicy;
