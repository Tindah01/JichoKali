import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Upload, AlertTriangle, Shield, Camera, FileText } from 'lucide-react';

interface ReportIncidentProps {
  onSubmit: (report: any) => void;
}

const ReportIncident: React.FC<ReportIncidentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    officerDetails: '',
    witnesses: '',
    injuries: false,
    medicalAttention: false,
    anonymous: true,
    severity: 'Medium'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      officerDetails: '',
      witnesses: '',
      injuries: false,
      medicalAttention: false,
      anonymous: true,
      severity: 'Medium'
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Report an Incident</h2>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${
                i + 1 <= currentStep ? 'bg-red-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>Safety First:</strong> Only report when you're in a safe location. 
              All information is encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of the incident"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Where did this incident occur?"
                  required
                />
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => window.open('/map', '_blank')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    📍 Find nearest police station
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Incident Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Provide a detailed account of what happened. Include as much information as possible."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Officer Details (if known)
                </label>
                <textarea
                  name="officerDetails"
                  value={formData.officerDetails}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Badge numbers, names, physical descriptions, vehicle details, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Witnesses
                </label>
                <textarea
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Names and contact details of any witnesses (optional)"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Medical & Evidence */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information & Evidence</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="injuries"
                    checked={formData.injuries}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Did you sustain any injuries?
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="medicalAttention"
                    checked={formData.medicalAttention}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Did you seek medical attention?
                  </label>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Evidence</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Photos, videos, medical reports, or other documents
                </p>
                <button
                  type="button"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Choose Files
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported: JPG, PNG, PDF, MP4 (Max 10MB each)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Privacy & Submission */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Submission</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="font-medium text-gray-900">
                    Submit this report anonymously (Recommended)
                  </label>
                </div>
                <p className="text-sm text-gray-600 ml-7">
                  Anonymous reports help protect your identity while still allowing us to investigate and take action.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your report will be reviewed within 24-48 hours</li>
                  <li>• We'll verify the information and assign a case number</li>
                  <li>• Relevant authorities and human rights organizations will be notified</li>
                  <li>• You'll receive updates on the case progress (if not anonymous)</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Your Data is Protected</h4>
                    <p className="text-sm text-green-800">
                      All reports are encrypted, securely stored, and only shared with authorized personnel 
                      working on police accountability and human rights protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors ml-auto"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors ml-auto"
            >
              Submit Report
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReportIncident;