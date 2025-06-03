
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Activities = () => {
  const activities = [
    {
      title: "Sports & Athletics",
      description: "Our school offers a wide range of sports activities including cricket, basketball, volleyball, athletics, and more. Regular inter-house and inter-school competitions are organized to foster sportsmanship and team spirit.",
      image: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?q=80&w=800"
    },
    {
      title: "Cultural Activities",
      description: "We encourage students to participate in various cultural activities such as music, dance, drama, and art. Annual cultural festivals and regular cultural events provide a platform for students to showcase their talents.",
      image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=800"
    },
    {
      title: "Clubs & Societies",
      description: "Various clubs and societies such as Science Club, Literary Club, Eco Club, and more allow students to pursue their interests beyond the classroom. These clubs organize regular activities, workshops, and competitions.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
    },
    {
      title: "Educational Tours",
      description: "Educational tours and field trips are organized for students to provide them with practical knowledge and exposure to the world outside the classroom. These trips include visits to museums, historical sites, and industries.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            Co-Curricular Activities
          </h1>
          
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            At Sri Saraswathi Vidya Vihar, we believe in the all-round development of students. Our co-curricular activities are designed to nurture talents, build character, and provide a well-rounded education.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x400?text=Activity+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-school-dark">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
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

export default Activities;
