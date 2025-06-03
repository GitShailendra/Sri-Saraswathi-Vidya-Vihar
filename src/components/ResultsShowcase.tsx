
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Trophy, Award } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ResultsShowcase = () => {
  const [categories] = useState({
    '2023 Results': [
      {
        id: 1,
        name: 'Shivani Reddy',
        marks: '594/600',
        rank: 'State Rank 1',
        imageUrl: 'https://images.unsplash.com/photo-1621274790572-7c32596bc67f?q=80&w=150'
      },
      {
        id: 2,
        name: 'Rahul Kumar',
        marks: '587/600',
        rank: 'State Rank 3',
        imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150'
      },
      {
        id: 3,
        name: 'Ananya Sharma',
        marks: '586/600',
        rank: 'State Rank 5',
        imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=150'
      },
      {
        id: 4,
        name: 'Arjun Nair',
        marks: '585/600',
        rank: 'State Rank 6',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
      }
    ],
    'School Statistics': [
      {
        id: 1,
        stat: '98.7%',
        description: 'Overall Pass Percentage',
      },
      {
        id: 2,
        stat: '73',
        description: 'Students Scored Above 90%',
      },
      {
        id: 3,
        stat: '21',
        description: 'State Rank Holders',
      },
      {
        id: 4,
        stat: '100%',
        description: 'Science Stream Pass Percentage',
      }
    ],
    'Academic Achievements': [
      {
        id: 1,
        title: 'Best School Award',
        description: 'Awarded by State Education Department for Academic Excellence',
        year: '2023'
      },
      {
        id: 2,
        title: 'Science Olympiad',
        description: '15 National Level Qualifiers',
        year: '2023'
      },
      {
        id: 3,
        title: 'Mathematics Competition',
        description: '3 Gold Medals at Regional Level',
        year: '2023'
      }
    ],
  });

  return (
    <section className="py-20 bg-gradient-to-b from-school-blue/10 to-white" id="results">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12 gap-3">
          <Trophy className="text-school-orange h-8 w-8" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center">
            Academic Excellence & Achievements
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white/60 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-school-blue shadow'
                        : 'text-gray-600 hover:bg-white/30 hover:text-school-dark'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
              {/* 2023 Results Panel */}
              <Tab.Panel className="rounded-xl bg-white p-4 shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-school-dark mb-2">SSC Results 2023</h3>
                  <p className="text-gray-600">Our top performers have made us proud once again</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories['2023 Results'].map((student) => (
                    <div key={student.id} className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="mx-auto rounded-full overflow-hidden h-20 w-20 mb-4 border-2 border-school-orange">
                        <img 
                          src={student.imageUrl} 
                          alt={student.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                      <h4 className="font-medium text-school-dark">{student.name}</h4>
                      <p className="text-school-blue font-bold text-lg">{student.marks}</p>
                      <p className="text-sm text-gray-600">{student.rank}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <a 
                    href="/results" 
                    className="inline-flex items-center font-medium text-school-blue hover:text-school-orange transition-colors"
                  >
                    View Complete Results
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </Tab.Panel>

              {/* School Statistics Panel */}
              <Tab.Panel className="rounded-xl bg-white p-4 shadow">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {categories['School Statistics'].map((stat) => (
                    <div 
                      key={stat.id} 
                      className="text-center p-6 rounded-lg bg-gradient-to-br from-school-blue/5 to-school-blue/10"
                    >
                      <div className="text-4xl font-bold text-school-blue mb-2">{stat.stat}</div>
                      <p className="text-gray-700 text-sm">{stat.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-school-dark mb-4">Result Highlights</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-school-orange mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>8 students scored 590+ out of 600 in SSC examinations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-school-orange mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>56% of our students scored distinction (75%+)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-school-orange mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>100% pass rate in Mathematics and Science</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-school-orange mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Improved average score by 3.5% compared to previous year</span>
                    </li>
                  </ul>
                </div>
              </Tab.Panel>

              {/* Academic Achievements Panel */}
              <Tab.Panel className="rounded-xl bg-white p-4 shadow">
                <div className="space-y-6">
                  {categories['Academic Achievements'].map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className="flex items-start border-l-4 border-school-orange pl-4 py-2"
                    >
                      <div className="mr-4">
                        <Award className="h-10 w-10 text-school-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-school-dark">{achievement.title}</h4>
                        <p className="text-gray-600">{achievement.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-school-orange/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-xl text-school-dark mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Our Legacy of Excellence
                  </h4>
                  <p className="text-gray-700">
                    For over three decades, Sri Saraswathi Vidya Vihar has consistently produced top-ranking students and maintained a tradition of academic excellence. Our students have gone on to prestigious institutions across the country and abroad, carrying forward our legacy of quality education.
                  </p>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default ResultsShowcase;
