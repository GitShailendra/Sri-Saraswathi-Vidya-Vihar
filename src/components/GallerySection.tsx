import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =  'https://vidya-vista-rebuild.onrender.com';
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
      observer.observe(gallerySection);
    }
    
    return () => {
      if (gallerySection) {
        observer.unobserve(gallerySection);
      }
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'campus', name: 'Campus' },
    { id: 'events', name: 'Events' },
    { id: 'sports', name: 'Sports' },
    { id: 'activities', name: 'Activities' }
  ];

  // Fetch images from API
  const fetchGalleryImages = async (category = 'all', limit = 8) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        category: category,
        page: '1',
        limit: limit.toString()
      });

      const response = await fetch(`${API_BASE_URL}/gallery?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Transform the API data to match our component structure
        const transformedItems = result.data.map(item => ({
          id: item.id,
          category: item.category,
          imageUrl: item.imageData || item.imageUrl, // Use base64 data or fallback to URL
          title: item.title,
          uploadDate: item.uploadDate,
          contentType: item.contentType,
          size: item.size
        }));

        setGalleryItems(transformedItems);
      } else {
        throw new Error(result.message || 'Failed to fetch gallery images');
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError(err.message || 'Failed to load gallery images');
      
      // Fallback to empty array on error
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load images on component mount and when category changes
  useEffect(() => {
    fetchGalleryImages(activeCategory, 8); // Limit to 8 images for preview section
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    fetchGalleryImages(categoryId, 8);
  };

  // Handle image load error - fallback to placeholder
  const handleImageError = (e) => {
    e.currentTarget.src = "https://via.placeholder.com/800x600?text=Photo";
  };

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-red-800 font-medium mb-2 font-poppins">Unable to load gallery</h3>
        <p className="text-red-600 text-sm mb-4 font-poppins">{error}</p>
        <button
          onClick={() => fetchGalleryImages(activeCategory, 8)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-poppins"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-gray-500">
        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-medium mb-2 font-poppins">No images found</h3>
        <p className="text-sm font-poppins">
          {activeCategory === 'all' 
            ? 'No images have been uploaded yet.' 
            : `No images found in the ${categories.find(c => c.id === activeCategory)?.name} category.`
          }
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-school-soft-gray" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-school-dark inline-block relative">
            School Gallery
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-school-orange"></span>
          </h2>
          <p className="mt-6 text-gray-600 font-poppins">
            Explore our vibrant school life through our gallery of campus facilities, events, 
            sports competitions, and student activities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8 animate-fade-in">
          <div className="bg-white rounded-full shadow-md p-1.5 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={loading}
                className={`px-4 py-2 rounded-full text-sm transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeCategory === category.id
                    ? 'bg-school-blue text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !loading && <ErrorMessage />}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && <EmptyState />}

        {/* Gallery Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <>
            {/* Gallery Stats */}
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm font-poppins">
                Showing {filteredItems.length} recent images
                {activeCategory !== 'all' && (
                  <span> in {categories.find(c => c.id === activeCategory)?.name}</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-lg shadow-md group h-64 bg-gray-100 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-medium font-poppins text-sm md:text-base">{item.title}</h4>
                    <p className="text-white/80 text-xs md:text-sm capitalize font-poppins">{item.category}</p>
                    {item.uploadDate && (
                      <p className="text-white/60 text-xs mt-1 font-poppins">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* View Full Gallery Button */}
        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="bg-white border border-school-blue text-school-blue hover:bg-school-blue hover:text-white font-medium px-8 py-3 rounded-md transition-colors font-poppins inline-flex items-center gap-2"
          >
            View Full Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Optional: Gallery Statistics */}
        {!loading && !error && galleryItems.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm font-poppins">
              Part of our growing collection of school memories
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;