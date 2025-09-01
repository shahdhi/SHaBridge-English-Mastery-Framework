import React, { useState } from 'react';
import { User, Mail, Calendar, Globe, BookOpen, GraduationCap, Car as IdCard } from 'lucide-react';
import { StudentInfo } from '../types/test';

interface StudentInfoFormProps {
  onSubmit: (info: StudentInfo) => void;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StudentInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    level: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Partial<StudentInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<StudentInfo> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.level) newErrors.level = 'Please select your current level';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof StudentInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://copilot.microsoft.com/th/id/BCO.1671fab5-16d2-493f-999e-daadcc92b63b.png" 
              alt="Sha Bridge College Logo" 
              className="w-12 h-12"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} 
            />
            <GraduationCap className="w-8 h-8 text-blue-900 hidden" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sha Bridge College</h1>
              <p className="text-sm text-gray-600">English Language Assessment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <User className="w-10 h-10 text-blue-800" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Student Information</h1>
          <p className="text-lg text-gray-600">Please provide your details before beginning the assessment</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.dateOfBirth ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.phoneNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>

            {/* Assessment Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Assessment Information
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Self-Assessed English Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.level ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner (A1)</option>
                    <option value="elementary">Elementary (A2)</option>
                    <option value="intermediate">Intermediate (B1)</option>
                    <option value="upper-intermediate">Upper Intermediate (B2)</option>
                    <option value="advanced">Advanced (C1)</option>
                    <option value="proficient">Proficient (C2)</option>
                    <option value="unsure">Not sure</option>
                  </select>
                  {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <User className="w-6 h-6 text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
                  <ul className="text-amber-700 space-y-1 text-sm">
                    <li>• All information provided will be kept confidential</li>
                    <li>• Your details will be used for test administration and results processing only</li>
                    <li>• Ensure all information is accurate as it will appear on your certificate</li>
                    <li>• You cannot change this information once the test begins</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
              >
                Continue to Assessment
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Sha Bridge College Language Assessment Center • Confidential Testing Environment
          </p>
        </div>
      </div>
    </div>
  );
};
