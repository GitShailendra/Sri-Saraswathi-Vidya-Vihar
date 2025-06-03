import React, { useState, useEffect } from 'react';
import { 
  School, Bell, Search, Menu, X, Images, Plus, LogOut, MessageSquare, Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GalleryGrid from './GallaryGrid';
import UploadModal from './UploadModal';
import ContactManagement from './ContactManagement'; // Import the new component
import axios from 'axios';

// Updated interface to include buffer data
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageData: string; // Base64 encoded image data
  imageUrl?: string; // Original URL if exists
  uploadDate: string;
  uploadType: 'file' | 'url';
  contentType?: string;
  size?: number;
}

interface CategoryStats {
  id: string;
  name: string;
  color: string;
  count: number;
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'contacts'>('gallery'); // Add tab state

  const { logout, token } = useAuth();

  const categories = [
    { id: 'campus', name: 'Campus', color: 'blue' },
    { id: 'events', name: 'Events', color: 'green' },
    { id: 'sports', name: 'Sports', color: 'orange' },
    { id: 'activities', name: 'Activities', color: 'purple' }
  ];

  // API client with auth header
  const apiClient = axios.create({
    baseURL: 'https://vidya-vista-rebuild.onrender.com', // Updated to deployed link for contacts
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Gallery API client (keep the original for gallery)
  const galleryApiClient = axios.create({
    baseURL: 'https://vidya-vista-rebuild.onrender.com',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch gallery items with buffer data
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching gallery items...');
      const response = await axios.get('https://vidya-vista-rebuild.onrender.com/gallery');
      
      console.log('Gallery API Response:', response.data);
      
      if (response.data.success) {
        const items = response.data.data;
        console.log('Received items:', items.length);
        
        // Log first item to check data structure
        if (items.length > 0) {
          console.log('First item structure:', {
            id: items[0].id,
            title: items[0].title,
            category: items[0].category,
            hasImageData: !!items[0].imageData,
            imageDataType: typeof items[0].imageData,
            imageDataLength: items[0].imageData?.length || 0
          });
        }
        
        setGalleryItems(items);
      } else {
        throw new Error(response.data.message || 'Failed to fetch gallery items');
      }
    } catch (err: any) {
      console.error('Error fetching gallery items:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await galleryApiClient.delete(`/gallery/${id}`);
      
      if (response.data.success) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
      } else {
        throw new Error(response.data.message || 'Failed to delete image');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to delete image');
      console.error('Error deleting image:', err);
    }
  };

  // Edit image
  const handleEditImage = async (id: string, data: { title: string; category: string }) => {
    try {
      const response = await galleryApiClient.put(`/gallery/${id}`, data);
      
      if (response.data.success) {
        // Update the item in the local state
        setGalleryItems(prev => 
          prev.map(item => 
            item.id === id 
              ? { ...item, title: data.title, category: data.category }
              : item
          )
        );
      } else {
        throw new Error(response.data.message || 'Failed to update image');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to update image');
      console.error('Error updating image:', err);
      throw err; // Re-throw to handle in component
    }
  };

  // Handle successful upload
  const handleUploadSuccess = (newItem: GalleryItem) => {
    console.log('New item uploaded:', newItem);
    setGalleryItems(prev => [newItem, ...prev]);
    setShowUploadModal(false);
  };

  // Calculate category stats
  const categoryStats: CategoryStats[] = categories.map(cat => ({
    ...cat,
    count: galleryItems.filter(item => item.category === cat.id).length
  }));

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (activeTab === 'gallery') {
      fetchGalleryItems();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-sm shadow-xl transition-transform duration-300 ease-in-out border-r border-gray-200`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">SSVV Admin</h2>
              <p className="text-xs text-gray-600">Management Panel</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Images className="w-5 h-5" />
            <span className="font-medium">Gallery Management</span>
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Contact Management</span>
          </button>
        </nav>

        {/* Category Stats - Only show for gallery */}
        {activeTab === 'gallery' && (
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Categories</h3>
            {categoryStats.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 bg-${cat.color}-500 rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-600">{cat.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'gallery' ? 'Gallery Management' : 'Contact Management'}
                </h1>
                <p className="text-sm text-gray-600">
                  {activeTab === 'gallery' 
                    ? 'Manage school gallery images and categories'
                    : 'View and manage contact form submissions'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search - Only show for gallery */}
              {activeTab === 'gallery' && (
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search images..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                  />
                </div>
              )}

              {/* Add Image Button - Only show for gallery */}
              {activeTab === 'gallery' && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'gallery' ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Gallery Images</h2>
                  <p className="text-sm text-gray-600">Total: {galleryItems.length} images</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                  <button 
                    onClick={fetchGalleryItems}
                    className="mt-2 text-red-700 hover:text-red-900 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Gallery Grid Component */}
              <GalleryGrid 
                items={galleryItems}
                categories={categories}
                loading={loading}
                onDelete={handleDeleteImage}
                onEdit={handleEditImage}
              />
            </div>
          ) : (
            <ContactManagement apiClient={apiClient} />
          )}
        </main>
      </div>

      {/* Upload Modal Component - Only show for gallery */}
      {showUploadModal && activeTab === 'gallery' && (
        <UploadModal
          categories={categories}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
          apiClient={galleryApiClient}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;