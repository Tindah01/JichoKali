import React, { useState } from 'react';
import { User, Shield, Bell, Lock, Eye, EyeOff, Settings, LogOut, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReportId, setShowReportId] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Anonymous User',
    email: 'user@anonymous.com',
    phone: '+254 7XX XXX XXX',
    location: 'Kenya',
    anonymousMode: true,
    notifications: true,
    emailAlerts: false,
    smsAlerts: true
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const reportStats = {
    total: 2,
    pending: 1,
    resolved: 0,
    investigating: 1
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-4 rounded-full">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {profileData.anonymousMode ? 'Anonymous User' : profileData.name}
              </h3>
              <p className="text-gray-600">Keeping Kenya safe, one report at a time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-600" />
          <span>Privacy & Security</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">Anonymous Mode</h4>
              <p className="text-sm text-green-700">Your reports are submitted anonymously for your protection</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isEditing ? editData.anonymousMode : profileData.anonymousMode}
                onChange={(e) => isEditing && setEditData({ ...editData, anonymousMode: e.target.checked })}
                disabled={!isEditing}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-green-800">Enabled</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Report ID Visibility</h4>
              <p className="text-sm text-gray-600">Show/hide your report reference numbers</p>
            </div>
            <button
              onClick={() => setShowReportId(!showReportId)}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              {showReportId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{showReportId ? 'Hide' : 'Show'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={isEditing ? editData.name : profileData.name}
              onChange={(e) => isEditing && setEditData({ ...editData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={isEditing ? editData.email : profileData.email}
              onChange={(e) => isEditing && setEditData({ ...editData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={isEditing ? editData.phone : profileData.phone}
              onChange={(e) => isEditing && setEditData({ ...editData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={isEditing ? editData.location : profileData.location}
              onChange={(e) => isEditing && setEditData({ ...editData, location: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reports</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{reportStats.total}</p>
            <p className="text-sm text-blue-700">Total Reports</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{reportStats.pending}</p>
            <p className="text-sm text-yellow-700">Pending</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{reportStats.investigating}</p>
            <p className="text-sm text-orange-700">Investigating</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{reportStats.resolved}</p>
            <p className="text-sm text-green-700">Resolved</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-red-600" />
          <span>Notification Preferences</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Get notified about report updates</p>
            </div>
            <input
              type="checkbox"
              checked={isEditing ? editData.notifications : profileData.notifications}
              onChange={(e) => isEditing && setEditData({ ...editData, notifications: e.target.checked })}
              disabled={!isEditing}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Alerts</h4>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <input
              type="checkbox"
              checked={isEditing ? editData.emailAlerts : profileData.emailAlerts}
              onChange={(e) => isEditing && setEditData({ ...editData, emailAlerts: e.target.checked })}
              disabled={!isEditing}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS Alerts</h4>
              <p className="text-sm text-gray-600">Get SMS notifications for urgent updates</p>
            </div>
            <input
              type="checkbox"
              checked={isEditing ? editData.smsAlerts : profileData.smsAlerts}
              onChange={(e) => isEditing && setEditData({ ...editData, smsAlerts: e.target.checked })}
              disabled={!isEditing}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Change Password</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Advanced Settings</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </div>
            <span className="text-red-400">›</span>
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-800 mb-3">
          Our support team is here to help you navigate the platform safely and securely.
        </p>
        <button className="text-sm text-blue-700 font-medium hover:text-blue-800">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default Profile;