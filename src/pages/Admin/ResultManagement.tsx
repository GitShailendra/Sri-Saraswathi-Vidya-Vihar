import React, { useState, useEffect } from 'react';
import { 
  Trophy, Plus, Edit3, Trash2, Eye, EyeOff, Search,
  ChevronLeft, ChevronRight, Users, Calendar,
  X, Upload
} from 'lucide-react';

interface Result {
  _id: string;
  year: string;
  rank: number; 
  studentImageData?: string; 
  totalStudents: number;
  imageUrl?: string;
  uploadType?: 'file' | 'url';
  isActive: boolean;
  studentName: string;
  createdAt: string;
  updatedAt: string;
  marks: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface ResultStats {
  overview: {
    totalResults: number;
    activeResults: number;
    inactiveResults: number;
  };
  yearStats: Array<{ _id: string; count: number }>;
}

interface ResultsManagementProps {
  apiClient: any;
}

const ResultsManagement: React.FC<ResultsManagementProps> = ({ apiClient }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [stats, setStats] = useState<ResultStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Fetch results
  const fetchResults = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (filterYear) params.append('year', filterYear);

      const response = await apiClient.get(`/results/admin?${params}`);
      console.log('API Response:', response.data);
      if (response.data.success) {
        setResults(response.data.data);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/results/admin/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Delete result
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;

    try {
      await apiClient.delete(`/results/admin/${id}`);
      fetchResults(currentPage);
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete result');
    }
  };

  // Toggle result status
  const handleToggleStatus = async (id: string) => {
    try {
      await apiClient.patch(`/results/admin/${id}/toggle-status`);
      fetchResults(currentPage);
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle status');
    }
  };

  useEffect(() => {
    fetchResults();
    fetchStats();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== '' || filterYear !== '') {
        fetchResults(1);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filterYear]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Results</p>
                <p className="text-3xl font-bold">{stats.overview.totalResults}</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Results</p>
                <p className="text-3xl font-bold">{stats.overview.activeResults}</p>
              </div>
              <Eye className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Hidden Results</p>
                <p className="text-3xl font-bold">{stats.overview.inactiveResults}</p>
              </div>
              <EyeOff className="w-8 h-8 text-orange-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Academic Years</p>
                <p className="text-3xl font-bold">{stats.yearStats.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Years</option>
              {stats?.yearStats.map(year => (
                <option key={year._id} value={year._id}>{year._id}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Result</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={() => fetchResults(currentPage)}
            className="mt-2 text-red-700 hover:text-red-900 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
           <thead className="bg-gray-50">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
  </tr>
</thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Loading results...
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                results.map((result) => (
  <tr key={result._id} className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      {result.studentImageData ? (
        <img 
          src={result.studentImageData} 
          alt={`Result ${result.year}`}
          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-xs">No Image</span>
        </div>
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900 text-lg">{result.studentName}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900 text-lg">{result.year}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          {result.marks}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {new Date(result.createdAt).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <button
        onClick={() => handleToggleStatus(result._id)}
        className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full ${
          result.isActive
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-red-100 text-red-800 hover:bg-red-200'
        }`}
      >
        {result.isActive ? (
          <>
            <Eye className="w-3 h-3" />
            <span>Active</span>
          </>
        ) : (
          <>
            <EyeOff className="w-3 h-3" />
            <span>Hidden</span>
          </>
        )}
      </button>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setEditingResult(result)}
          className="text-blue-600 hover:text-blue-900"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(result._id)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => fetchResults(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => fetchResults(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => fetchResults(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => fetchResults(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => fetchResults(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingResult) && (
        <ResultModal
          result={editingResult}
          onClose={() => {
            setShowAddModal(false);
            setEditingResult(null);
          }}
          onSuccess={() => {
            fetchResults(currentPage);
            fetchStats();
            setShowAddModal(false);
            setEditingResult(null);
          }}
          apiClient={apiClient}
        />
      )}
    </div>
  );
};

// Result Modal Component
interface Student {
  name: string;
  marks: string;
  image?: File | null;
  imagePreview?: string | null;
}

interface Result {
  _id: string;
  year: string;
  rank: number; 
  studentImageData?: string; 
  totalStudents: number;
  imageUrl?: string;
  uploadType?: 'file' | 'url';
  isActive: boolean;
  studentName: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface ResultModalProps {
  result?: Result | null;
  onClose: () => void;
  onSuccess: () => void;
  apiClient: any;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose, onSuccess, apiClient }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    year: result?.year || '',
    numberOfTopPerformers: 1,
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [currentStudent, setCurrentStudent] = useState<Student>({
    name: '',
    marks: '',
    image: null,
    imagePreview: null
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInitialFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'numberOfTopPerformers' ? parseInt(value) : value 
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentStudent(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.year || formData.numberOfTopPerformers < 1) {
        setErrors({ year: !formData.year ? 'Year is required' : null });
        return;
      }
      setStudents(new Array(formData.numberOfTopPerformers).fill(null).map(() => ({
        name: '',
        marks: '',
        image: null,
        imagePreview: null
      })));
      setCurrentStudent({ name: '', marks: '', image: null, imagePreview: null });
      setCurrentStudentIndex(0);
      setStep(2);
    }
  };

  const handleStudentSubmit = () => {
    if (!currentStudent.name || !currentStudent.marks) {
      setErrors({
        name: !currentStudent.name ? 'Student name is required' : null,
        marks: !currentStudent.marks ? 'Marks are required' : null
      });
      return;
    }

    const updatedStudents = [...students];
    updatedStudents[currentStudentIndex] = { ...currentStudent };
    setStudents(updatedStudents);

    if (currentStudentIndex < formData.numberOfTopPerformers - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
      setCurrentStudent({
        name: '',
        marks: '',
        image: null,
        imagePreview: null
      });
      setErrors({});
    } else {
      setStep(3);
    }
  };

  const handlePreviousStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
      setCurrentStudent(students[currentStudentIndex - 1]);
      setErrors({});
    }
  };

  const handleStudentImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentStudent(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResultPosterSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setErrors({ image: 'Result poster image is required' });
      return;
    }

    console.log('Form submitted!');
    console.log('Form data:', formData);
    console.log('Students:', students);
    console.log('Selected file:', selectedFile);
    
    setLoading(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('year', formData.year);
      formDataToSend.append('numberOfTopPerformers', formData.numberOfTopPerformers.toString());
      
      students.forEach((student, index) => {
        formDataToSend.append(`students[${index}][name]`, student.name);
        formDataToSend.append(`students[${index}][marks]`, student.marks);
        if (student.image) {
          formDataToSend.append(`studentImages`, student.image);
        }
      });
      
      formDataToSend.append('resultPoster', selectedFile);

      console.log('Making API call...');
      if (result) {
        await apiClient.put(`/results/admin/${result._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await apiClient.post('/results/admin', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('API call successful!');
      onSuccess();
    } catch (err: any) {
      console.error('API call failed:', err);
      if (err.response?.data?.errors) {
        const errorObj: any = {};
        err.response.data.errors.forEach((error: any) => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj);
      } else {
        alert(err.response?.data?.message || 'Failed to save result');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Result Details';
      case 2:
        return `Student ${currentStudentIndex + 1} of ${formData.numberOfTopPerformers}`;
      case 3:
        return 'Upload Result Poster';
      default:
        return 'Add Result';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {result ? 'Edit Result' : 'Add New Result'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`h-1 flex-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{getStepTitle()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Year and Number of Top Performers */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInitialFormChange}
                  placeholder="e.g., 2024, 2023-24"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.year && (
                  <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Top Performers *
                </label>
                <select
                  name="numberOfTopPerformers"
                  value={formData.numberOfTopPerformers}
                  onChange={handleInitialFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Student Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Enter details for student {currentStudentIndex + 1} of {formData.numberOfTopPerformers}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentStudent.name}
                  onChange={handleStudentChange}
                  placeholder="e.g., John Doe"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks/Score *
                </label>
                <input
                  type="text"
                  name="marks"
                  value={currentStudent.marks}
                  onChange={handleStudentChange}
                  placeholder="e.g., 586/600, 95.5%"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.marks ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.marks && (
                  <p className="text-red-500 text-xs mt-1">{errors.marks}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Photo (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleStudentImageSelect}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>

                {currentStudent.imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Photo Preview:</p>
                    <div className="relative inline-block">
                      <img
                        src={currentStudent.imagePreview}
                        alt="Student Photo Preview"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStudent(prev => ({
                            ...prev,
                            image: null,
                            imagePreview: null
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStudent}
                  disabled={currentStudentIndex === 0}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleStudentSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
                >
                  <span>
                    {currentStudentIndex < formData.numberOfTopPerformers - 1 ? 'Next Student' : 'Upload Poster'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Students Added:</p>
                <div className="flex flex-wrap gap-2">
                  {students.map((student, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        index <= currentStudentIndex && student.name
                          ? 'bg-green-100 text-green-800'
                          : index === currentStudentIndex
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {student.name || `Student ${index + 1}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload Result Poster */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  Great! You've added all {formData.numberOfTopPerformers} students. Now upload the result poster image.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Students Summary:</h3>
                <div className="space-y-2">
                  {students.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {student.imagePreview ? (
                          <img
                            src={student.imagePreview}
                            alt={student.name}
                            className="w-10 h-10 object-cover rounded-full border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Photo</span>
                          </div>
                        )}
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {student.marks}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result Poster Image *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleResultPosterSelect}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Result Poster Preview"
                      className="w-full max-w-sm h-auto object-contain rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Students</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : result ? 'Update Result' : 'Create Result'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResultsManagement;