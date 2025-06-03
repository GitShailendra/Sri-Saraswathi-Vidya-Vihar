import React, { useState } from 'react';
import { Eye, Edit, Trash2, X } from 'lucide-react';

// Updated interface for buffer data
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

interface Category {
  id: string;
  name: string;
  color: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  categories: Category[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { title: string; category: string }) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  items, 
  categories, 
  loading, 
  onDelete,
  onEdit
}) => {
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editForm, setEditForm] = useState({ title: '', category: '' });
  const [updating, setUpdating] = useState(false);

  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.color || 'gray';
  };

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || categoryId;
  };

  const handleEditClick = (item: GalleryItem) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      category: item.category
    });
  };

  const handleEditSubmit = async () => {
    if (!editingItem || !editForm.title.trim()) return;

    setUpdating(true);
    try {
      await onEdit(editingItem.id, {
        title: editForm.title.trim(),
        category: editForm.category
      });
      setEditingItem(null);
    } catch (error) {
      console.error('Edit failed:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleEditCancel = () => {
    setEditingItem(null);
    setEditForm({ title: '', category: '' });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
        <p className="text-gray-600">Start by adding your first gallery image.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 group">
            <div className="relative h-48 overflow-hidden">
              {/* Use imageData (base64) instead of imageUrl */}
              <img
                src={item.imageData}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  console.error('Image load error for item:', item.id);
                  e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <button 
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                    title="View Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-green-600 transition-colors"
                    title="Edit Image"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(item.category)}-100 text-${getCategoryColor(item.category)}-800`}>
                  {getCategoryName(item.category)}
                </span>
                <span className="text-xs text-gray-500">{item.uploadDate}</span>
              </div>
              {/* Optional: Show file size */}
              {item.size && (
                <div className="mt-2 text-xs text-gray-400">
                  Size: {(item.size / 1024).toFixed(1)} KB
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Edit Image</h3>
              <button
                onClick={handleEditCancel}
                disabled={updating}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Image
                </label>
                <div className="border rounded-lg p-2">
                  <img
                    src={editingItem.imageData}
                    alt={editingItem.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Title *
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  disabled={updating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Enter image title"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                  disabled={updating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">
                  <p><strong>Upload Type:</strong> {editingItem.uploadType}</p>
                  <p><strong>Upload Date:</strong> {editingItem.uploadDate}</p>
                  {editingItem.size && (
                    <p><strong>Size:</strong> {(editingItem.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleEditCancel}
                disabled={updating}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editForm.title.trim() || updating}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {updating && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{updating ? 'Updating...' : 'Update Image'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
