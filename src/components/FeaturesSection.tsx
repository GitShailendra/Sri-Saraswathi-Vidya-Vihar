
import { BookOpen, Users, Monitor, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-school-blue" />,
      title: "35+ Years Legacy",
      description: "Established in 1988 with a focus on all-around excellence"
    },
    {
      icon: <Users className="w-10 h-10 text-school-blue" />,
      title: "Experienced Faculty",
      description: "Over 50 years of collective teaching experience with modern methods"
    },
    {
      icon: <Monitor className="w-10 h-10 text-school-blue" />,
      title: "Smart Classrooms",
      description: "Digitally enhanced learning in every classroom"
    },
    {
      icon: <Heart className="w-10 h-10 text-school-blue" />,
      title: "Holistic Growth",
      description: "Focus on academics, values, arts, and social empathy"
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark inline-block relative">
            Why Choose Us
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-school-orange"></span>
          </h2>
          <p className="mt-6 text-gray-600">
            Choosing the right school for your child is a crucial decision. Here's why parents trust us with their children's education and future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 border-t-4 border-school-blue animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gray-50 inline-flex p-3 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-school-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
