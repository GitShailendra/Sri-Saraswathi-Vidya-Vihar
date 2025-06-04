
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import placeholder from "../assets/Icons/placeholder.svg";
const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Both my children study here, and as a parent, I closely follow their academics. The management ensures strong focus in every class. If there’s any issue, Principal Mr. Sanjeev Garu and Mr. Prudvi Garu address it promptly and ensure parent satisfaction. I highly recommend this school for a bright future.",
      author: "Shankar",
      role: "Parent",
      imageUrl: placeholder
    },
    {
      id: 2,
      quote: "I've seen remarkable growth in my daughter's personality since she joined SSVV. The school's focus on holistic development and extracurricular activities has helped her discover her talents.",
      author: "Rajesh Kumar",
      role: "Parent of Class 5 Student",
      imageUrl: placeholder
    },
    {
      id: 3,
      quote: "As an alumnus, I can attest to the strong foundation SSVV provides. The values and education I received here have shaped my career and life choices significantly.",
      author: "Vikram Singh",
      role: "Alumnus, Batch of 2015",
      imageUrl: placeholder
    },
    {
      id: 4,
      quote: "The supportive environment at Sri Saraswathi Vidya Vihar encourages students to explore their interests and develop critical thinking skills. We're grateful to be part of this community.",
      author: "Meera Patel",
      role: "Parent of Class 10 Student",
      imageUrl: placeholder
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark inline-block relative">
            What Parents & Alumni Say
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-school-orange"></span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 md:p-10 shadow-lg relative">
            <div className="absolute -top-6 -left-6 text-school-orange">
              <Quote size={48} className="opacity-25" />
            </div>
            
            <div className="mb-8 pt-4">
              <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={testimonials[currentIndex].imageUrl}
                  alt={testimonials[currentIndex].author}
                  className="h-14 w-14 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Person";
                  }}
                />
              </div>
              <div>
                <h4 className="font-semibold text-school-dark">{testimonials[currentIndex].author}</h4>
                <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-school-blue hover:bg-school-blue hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === index ? 'w-6 bg-school-orange' : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-school-blue hover:bg-school-blue hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed">
              "Education is not the filling of a pail, but the lighting of a fire."
              <footer className="mt-4 text-base font-normal text-gray-600">
                — W.B. Yeats
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
