import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { AxiosInstance } from 'axios';

interface Category {
  id: string;
  name: string;
  color: string;
}

// Updated interface to match AdminDashboard
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

interface UploadModalProps {
  categories: Category[];
  onClose: () => void;
  onSuccess: (item: GalleryItem) => void;
  apiClient: AxiosInstance;
}

const UploadModal: React.FC<UploadModalProps> = ({
  categories,
  onClose,
  onSuccess,
  apiClient
}) => {
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'campus',
    imageUrl: '',
    file: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files are allowed (JPEG, PNG, GIF, WebP)');
        return;
      }

      setNewImage(prev => ({ ...prev, file, imageUrl: '' }));
      setError(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewImage(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'imageUrl' && value ? { file: null } : {})
    }));
    setError(null);
  };

  const handleUploadImage = async () => {
    if (!newImage.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!newImage.file && !newImage.imageUrl.trim()) {
      setError('Either file upload or image URL is required');
      return;
    }

    if (newImage.file && newImage.imageUrl.trim()) {
      setError('Please provide either file or URL, not both');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', newImage.title.trim());
      formData.append('category', newImage.category);
      
      if (newImage.file) {
        formData.append('image', newImage.file);
      } else if (newImage.imageUrl.trim()) {
        formData.append('imageUrl', newImage.imageUrl.trim());
      }

      console.log('Uploading image...');
      const response = await apiClient.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data);

      if (response.data.success) {
        // The backend now returns imageData (base64) instead of imageUrl
        const uploadedItem: GalleryItem = {
          id: response.data.data.id,
          title: response.data.data.title,
          category: response.data.data.category,
          imageData: response.data.data.imageData, // Base64 data from backend
          imageUrl: response.data.data.imageUrl, // Original URL if exists
          uploadDate: response.data.data.uploadDate,
          uploadType: response.data.data.uploadType,
          contentType: response.data.data.contentType,
          size: response.data.data.size
        };

        console.log('Calling onSuccess with:', uploadedItem);
        onSuccess(uploadedItem);
        
        // Reset form
        setNewImage({ title: '', category: 'campus', imageUrl: '', file: null });
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const isValid = newImage.title.trim() && (newImage.file || newImage.imageUrl.trim());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Add New Image</h3>
          <button
            onClick={onClose}
            disabled={uploading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Title *
            </label>
            <input
              type="text"
              name="title"
              value={newImage.title}
              onChange={handleInputChange}
              disabled={uploading}
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
              name="category"
              value={newImage.category}
              onChange={handleInputChange}
              disabled={uploading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={newImage.imageUrl}
              onChange={handleInputChange}
              disabled={uploading || !!newImage.file}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading || !!newImage.imageUrl.trim()}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer font-medium ${
                  uploading || newImage.imageUrl.trim()
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Choose file
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG, GIF, WebP up to 10MB</p>
              {newImage.file && (
                <p className="text-sm text-green-600 mt-2">{newImage.file.name}</p>
              )}
            </div>
          </div>

          {/* Preview */}
          {(newImage.imageUrl || newImage.file) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="border rounded-lg p-2">
                <img
                  src={newImage.file ? URL.createObjectURL(newImage.file) : newImage.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadImage}
            disabled={!isValid || uploading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {uploading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{uploading ? 'Uploading...' : 'Add Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;