import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Trophy, Award, Users, Target, Calendar, TrendingUp } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ResultsShowcase = () => {
  const [apiResults, setApiResults] = useState([]);
  const [yearResults, setYearResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchResults();
    fetchStats();
  }, []);

  const fetchResults = async () => {
    try {
      // console.log('Fetching results from:', 'http://localhost:5000/results');
      const response = await fetch('https://sri-saraswathi-vidya-vihar.onrender.com/results');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Raw API response:", data);
      
      if (data.success && data.data && Array.isArray(data.data)) {
        console.log("Number of results received:", data.data.length);
        
        // Process each result with detailed logging
        const processedResults = data.data.map((student, index) => {
          console.log(`Processing student ${index}:`, student);
          
          let imageUrl = 'https://via.placeholder.com/150';
          
          // Handle image data
          if (student.studentImageData) {
            if (student.studentImageData.startsWith('data:image')) {
              imageUrl = student.studentImageData;
            } else {
              imageUrl = `data:image/jpeg;base64,${student.studentImageData}`;
            }
          } else if (student.studentImageDataBase64) {
            imageUrl = student.studentImageDataBase64;
          } else if (student.imageUrl) {
            imageUrl = student.imageUrl;
          }
          
          const processed = {
            id: student._id,
            name: student.studentName || 'Student Name',
            rank: student.rank || 1,
            totalStudents: student.totalStudents || 100,
            imageUrl: imageUrl,
            year: student.year || '2023',
            isActive: student.isActive !== false // Default to true
          };
          
          console.log(`Processed student ${index}:`, processed);
          return processed;
        });
        
        console.log("All processed results:", processedResults);
        
        // Get top performers (don't filter by isActive for now)
        const topRankers = processedResults
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 10); // Just take first 10
        
        console.log("Top rankers:", topRankers);
        setApiResults(topRankers);
        
        // Group by year
        const resultsByYear = processedResults.reduce((acc, student) => {
          const year = student.year;
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(student);
          return acc;
        }, {});
        
        // Sort each year's results
        Object.keys(resultsByYear).forEach(year => {
          resultsByYear[year].sort((a, b) => a.rank - b.rank);
        });
        
        console.log("Results by year:", resultsByYear);
        setYearResults(resultsByYear);
        
      } else {
        console.error('Invalid data structure:', data);
        setError('Invalid data received from server');
      }
      
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Try multiple possible endpoints
      const endpoints = [
        'https://sri-saraswathi-vidya-vihar.onrender.com/results/admin/stats',
        'https://sri-saraswathi-vidya-vihar.onrender.com/results/stats'
      ];
      
      for (const endpoint of endpoints) {
        try {
          console.log('Trying stats endpoint:', endpoint);
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log('Stats data:', data);
            if (data.success) {
              setStats(data.data);
              break;
            }
          }
        } catch (err) {
          console.log('Stats endpoint failed:', endpoint, err.message);
        }
      }
    } catch (err) {
      console.log("Error fetching stats:", err);
    }
  };

  // Create scrolling array
  const scrollingResults = apiResults.length > 0 
    ? [...apiResults, ...apiResults, ...apiResults] 
    : [];

  // Get available years
  const availableYears = Object.keys(yearResults).sort().reverse();

  console.log("Current state:", {
    apiResults,
    yearResults,
    availableYears,
    loading,
    error
  });

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id="results">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12 gap-3">
          <Trophy className="text-orange-500 h-8 w-8" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center">
            Academic Excellence & Achievements
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 overflow-x-auto">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'flex-shrink-0 rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                    'ring-white/60 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-gray-600 hover:bg-white/30 hover:text-gray-900'
                  )
                }
              >
                Top Performers
              </Tab>
              {availableYears.map((year) => (
                <Tab
                  key={year}
                  className={({ selected }) =>
                    classNames(
                      'flex-shrink-0 rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                      'ring-white/60 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-600 hover:bg-white/30 hover:text-gray-900'
                    )
                  }
                >
                  {year} Results
                </Tab>
              ))}
              {stats && (
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'flex-shrink-0 rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                      'ring-white/60 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-600 hover:bg-white/30 hover:text-gray-900'
                    )
                  }
                >
                  Statistics
                </Tab>
              )}
            </Tab.List>
            
            <Tab.Panels className="mt-6">
              {/* Top Performers Panel */}
              <Tab.Panel className="rounded-xl bg-white p-6 shadow">
            
                
                
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                    <p className="mt-2 text-gray-600">Loading results...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <div className="text-red-600 mb-4">Error: {error}</div>
                    <button 
                      onClick={fetchResults}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : apiResults.length > 0 ? (
                  <>
                    {/* Infinite Scrolling Container */}
                    <div className="overflow-hidden mb-8">
                      <div className="flex animate-scroll-rtl">
                        {scrollingResults.map((student, index) => (
                          <div 
                            key={`${student.id}-${index}`} 
                            className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all mx-3 w-56 border border-blue-100"
                          >
                            <div className="mx-auto rounded-full overflow-hidden h-24 w-24 mb-4 border-3 border-orange-500 shadow-lg">
                              <img 
                                src={student.imageUrl} 
                                alt={student.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "https://via.placeholder.com/150";
                                }}
                              />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2 truncate text-lg">{student.name}</h4>
                            <div className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                              <p className="text-blue-700 font-bold text-xl">
                                {student.rank}/{student.totalStudents}
                              </p>
                              <p className="text-sm text-gray-600">Rank</p>
                            </div>
                            <p className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full">
                              {student.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-600">No results available</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Make sure your backend is running and has data
                    </p>
                    <button 
                      onClick={fetchResults}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Refresh Data
                    </button>
                  </div>
                )}
                
                
              </Tab.Panel>

              {/* Year-wise Results Panels */}
              {availableYears.map((year) => (
                <Tab.Panel key={year} className="rounded-xl bg-white p-6 shadow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{year} Results</h3>
                    <p className="text-gray-600">
                      {yearResults[year]?.length || 0} students showcased from {year}
                    </p>
                  </div>
                  
                  {yearResults[year] && yearResults[year].length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {yearResults[year].slice(0, 12).map((student) => (
                        <div 
                          key={student.id} 
                          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all border border-gray-200"
                        >
                          <div className="mx-auto rounded-full overflow-hidden h-20 w-20 mb-3 border-2 border-orange-500">
                            <img 
                              src={student.imageUrl} 
                              alt={student.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150";
                              }}
                            />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2 truncate">{student.name}</h4>
                          <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
                            <p className="text-blue-700 font-bold text-lg">
                              {student.rank}/{student.totalStudents}
                            </p>
                            <p className="text-xs text-gray-600">Rank</p>
                          </div>
                          {student.rank <= 3 && (
                            <div className="flex justify-center">
                              <Trophy className={`h-4 w-4 ${
                                student.rank === 1 ? 'text-yellow-500' : 
                                student.rank === 2 ? 'text-gray-400' : 'text-orange-600'
                              }`} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-600">No results found for {year}</p>
                    </div>
                  )}
                  
                  {yearResults[year] && yearResults[year].length > 12 && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Showing top 12 results. {yearResults[year].length - 12} more available.
                      </p>
                    </div>
                  )}
                </Tab.Panel>
              ))}

              {/* Statistics Panel */}
              {stats && (
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">School Statistics</h3>
                    <p className="text-gray-600">Overall performance metrics across all years</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                      <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                      <div className="text-3xl font-bold text-blue-700 mb-1">
                        {stats.overview?.totalResults || 0}
                      </div>
                      <p className="text-gray-700 text-sm">Total Results</p>
                    </div>
                    
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                      <Target className="mx-auto h-8 w-8 text-green-600 mb-2" />
                      <div className="text-3xl font-bold text-green-700 mb-1">
                        {stats.overview?.activeResults || 0}
                      </div>
                      <p className="text-gray-700 text-sm">Published Results</p>
                    </div>
                    
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                      <Calendar className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-3xl font-bold text-purple-700 mb-1">
                        {stats.yearStats?.length || 0}
                      </div>
                      <p className="text-gray-700 text-sm">Academic Years</p>
                    </div>
                    
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                      <TrendingUp className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                      <div className="text-3xl font-bold text-orange-700 mb-1">
                        {stats.overview?.activeResults > 0 ? 
                          Math.round((stats.overview.activeResults / stats.overview.totalResults) * 100) : 0}%
                      </div>
                      <p className="text-gray-700 text-sm">Success Rate</p>
                    </div>
                  </div>

                  {stats.yearStats && stats.yearStats.length > 0 && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-xl text-gray-900 mb-4 flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-orange-500" />
                        Year-wise Performance
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {stats.yearStats.map((yearStat) => (
                          <div key={yearStat._id} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                            <div className="text-lg font-bold text-gray-900">{yearStat._id}</div>
                            <div className="text-2xl font-bold text-blue-600">{yearStat.count}</div>
                            <div className="text-xs text-gray-600">Students</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Tab.Panel>
              )}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-rtl {
          animation: scroll-rtl 25s linear infinite;
        }
        
        .animate-scroll-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ResultsShowcase;