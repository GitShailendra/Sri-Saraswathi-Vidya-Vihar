
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from "@/components/ui/button";

const Notices = () => {
  const notices = [
    {
      id: 1,
      title: "Admission Open for Academic Year 2025-26",
      date: "2025-05-10",
      category: "Admissions",
      content: "Applications are now being accepted for all grades for the upcoming academic year 2025-26. Please visit our admissions office or download the application form from our website."
    },
    {
      id: 2,
      title: "Annual Sports Day",
      date: "2025-05-20",
      category: "Events",
      content: "The Annual Sports Day will be held on June 5, 2025. All students are requested to participate in the events. Parents are cordially invited to attend and encourage the students."
    },
    {
      id: 3,
      title: "Summer Vacation Notice",
      date: "2025-05-12",
      category: "Academic",
      content: "The school will remain closed for summer vacation from May 25 to June 15, 2025. Classes will resume on June 16, 2025. Students are advised to complete their holiday homework during this period."
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      date: "2025-05-08",
      category: "Academic",
      content: "A Parent-Teacher Meeting is scheduled for May 22, 2025, from 9:00 AM to 12:30 PM. All parents are requested to attend to discuss their ward's progress."
    },
    {
      id: 5,
      title: "Science Exhibition",
      date: "2025-04-30",
      category: "Events",
      content: "A Science Exhibition will be held on May 18, 2025. Students from classes 6 to 10 are invited to participate and showcase their scientific models and experiments."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Notices & Circulars
          </h1>
          
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, and important information from Sri Saraswathi Vidya Vihar.
          </p>
          
          <div className="space-y-6">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-school-blue">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-semibold text-school-dark">{notice.title}</h3>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="text-sm text-gray-500 mr-4">
                        {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="bg-school-orange/10 text-school-orange text-xs px-2 py-1 rounded">
                        {notice.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{notice.content}</p>
                  <Button variant="ghost" className="text-school-blue hover:text-school-orange transition-colors">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Notices;
