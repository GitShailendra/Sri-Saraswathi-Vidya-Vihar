
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Terms of Use
          </h1>
          
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead">
              Welcome to the Sri Saraswathi Vidya Vihar website. By accessing or using this site, you agree to be bound by these Terms of Use.
            </p>
            
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the Sri Saraswathi Vidya Vihar website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The content on this website, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of Sri Saraswathi Vidya Vihar and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as follows:
            </p>
            <ul>
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
              <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
            </ul>
            
            <h2>User Contributions</h2>
            <p>
              The website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features that allow users to post, submit, publish, display, or transmit content on or through the website.
            </p>
            <p>
              All user contributions must comply with the Content Standards set out in these Terms of Use. Any user contribution you post to the site will be considered non-confidential and non-proprietary.
            </p>
            
            <h2>Disclaimer</h2>
            <p>
              The materials on the Sri Saraswathi Vidya Vihar website are provided on an 'as is' basis. Sri Saraswathi Vidya Vihar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Sri Saraswathi Vidya Vihar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Sri Saraswathi Vidya Vihar website, even if Sri Saraswathi Vidya Vihar or a Sri Saraswathi Vidya Vihar authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>Links to Other Websites</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Sri Saraswathi Vidya Vihar. Sri Saraswathi Vidya Vihar has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>Modifications</h2>
            <p>
              Sri Saraswathi Vidya Vihar may revise these Terms of Use at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Use.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            
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

export default TermsOfUse;
