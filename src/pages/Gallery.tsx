import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'campus', name: 'Campus' },
    { id: 'events', name: 'Events' },
    { id: 'sports', name: 'Sports' },
    { id: 'activities', name: 'Activities' }
  ];

  const API_BASE_URL =  'https://vidya-vista-rebuild.onrender.com';

  // Fetch images from API
  const fetchGalleryImages = async (category = 'all', page = 1, limit = 50) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        category: category,
        page: page.toString(),
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
        setPagination(result.pagination);
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
    fetchGalleryImages(activeCategory, 1);
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Reset to page 1 when changing category
    fetchGalleryImages(categoryId, 1);
  };

  // Handle image load error - fallback to placeholder
  const handleImageError = (e) => {
    e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-school-blue"></div>
      <span className="ml-3 text-gray-600">Loading gallery...</span>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-red-800 font-medium mb-2">Unable to load gallery</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={() => fetchGalleryImages(activeCategory, 1)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
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
        <h3 className="text-lg font-medium mb-2">No images found</h3>
        <p className="text-sm">
          {activeCategory === 'all' 
            ? 'No images have been uploaded yet.' 
            : `No images found in the ${categories.find(c => c.id === activeCategory)?.name} category.`
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-school-dark text-center mb-12">
            School Gallery
          </h1>
          
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Explore our vibrant school life through our gallery of campus facilities, events, 
            sports competitions, and student activities.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-white rounded-full shadow-md p-1.5 inline-flex">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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

          {/* Gallery Stats */}
          {!loading && !error && galleryItems.length > 0 && (
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm">
                Showing {galleryItems.length} of {pagination.totalItems} images
                {activeCategory !== 'all' && (
                  <span> in {categories.find(c => c.id === activeCategory)?.name}</span>
                )}
              </p>
            </div>
          )}
          
          {/* Loading State */}
          {loading && <LoadingSpinner />}
          
          {/* Error State */}
          {error && !loading && <ErrorMessage />}
          
          {/* Empty State */}
          {!loading && !error && galleryItems.length === 0 && <EmptyState />}
          
          {/* Gallery Grid */}
          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg shadow-md group h-64 bg-gray-100"
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
                    <h4 className="text-white font-medium text-sm md:text-base">{item.title}</h4>
                    <p className="text-white/80 text-xs md:text-sm capitalize">{item.category}</p>
                    {item.uploadDate && (
                      <p className="text-white/60 text-xs mt-1">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button - if you want to implement pagination */}
          {!loading && !error && pagination.hasNext && (
            <div className="text-center mt-12">
              <button
                onClick={() => fetchGalleryImages(activeCategory, pagination.currentPage + 1)}
                className="bg-school-blue text-white px-6 py-3 rounded-lg hover:bg-school-blue/90 transition-colors"
              >
                Load More Images
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;