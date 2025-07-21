import React, { useState } from 'react';
import { Phone, MapPin, Clock, AlertTriangle, Shield, Users, Scale, Heart } from 'lucide-react';

const EmergencyContacts = () => {
  const [activeCategory, setActiveCategory] = useState('emergency');

  const emergencyContacts = [
    {
      name: 'National Police Service',
      number: '999',
      description: 'General police emergency line',
      available: '24/7',
      icon: Shield,
      priority: 'high'
    },
    {
      name: 'IPOA Emergency Hotline',
      number: '+254 20 272 6171',
      description: 'Independent Policing Oversight Authority',
      available: '24/7',
      icon: Scale,
      priority: 'high'
    },
    {
      name: 'Kenya Red Cross',
      number: '1199',
      description: 'Emergency medical assistance',
      available: '24/7',
      icon: Heart,
      priority: 'high'
    }
  ];

  const legalContacts = [
    {
      name: 'Kenya National Commission on Human Rights',
      number: '+254 20 272 1152',
      description: 'Human rights violations reporting',
      available: 'Mon-Fri 8AM-5PM',
      icon: Scale,
      priority: 'medium'
    },
    {
      name: 'Law Society of Kenya',
      number: '+254 20 271 9016',
      description: 'Legal representation and advice',
      available: 'Mon-Fri 8AM-5PM',
      icon: Users,
      priority: 'medium'
    },
    {
      name: 'Kituo Cha Sheria',
      number: '+254 20 387 4943',
      description: 'Free legal aid services',
      available: 'Mon-Fri 8AM-5PM',
      icon: Scale,
      priority: 'medium'
    }
  ];

  const supportContacts = [
    {
      name: 'Trauma Counseling Center',
      number: '+254 700 123 456',
      description: 'Psychological support for victims',
      available: '24/7',
      icon: Heart,
      priority: 'medium'
    },
    {
      name: 'Victim Support Network',
      number: '+254 722 456 789',
      description: 'Community support and advocacy',
      available: 'Mon-Fri 9AM-6PM',
      icon: Users,
      priority: 'medium'
    },
    {
      name: 'Women\'s Rights Helpline',
      number: '+254 733 123 456',
      description: 'Support for female victims',
      available: '24/7',
      icon: Heart,
      priority: 'medium'
    }
  ];

  const regionalContacts = [
    {
      region: 'Nairobi County',
      contacts: [
        { name: 'Nairobi IPOA Office', number: '+254 20 272 6171', address: 'Milimani Commercial Court Building' },
        { name: 'Nairobi Legal Aid', number: '+254 20 387 4943', address: 'Woodvale Grove, Westlands' }
      ]
    },
    {
      region: 'Mombasa County',
      contacts: [
        { name: 'Mombasa IPOA Office', number: '+254 41 222 4567', address: 'Nyali Bridge Plaza' },
        { name: 'Coast Legal Aid', number: '+254 41 222 3456', address: 'Mama Ngina Drive' }
      ]
    },
    {
      region: 'Kisumu County',
      contacts: [
        { name: 'Kisumu IPOA Office', number: '+254 57 202 3456', address: 'Oginga Odinga Street' },
        { name: 'Western Legal Aid', number: '+254 57 202 2345', address: 'Jomo Kenyatta Highway' }
      ]
    }
  ];

  const categories = [
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'legal', label: 'Legal Aid', icon: Scale },
    { id: 'support', label: 'Support', icon: Heart },
    { id: 'regional', label: 'Regional', icon: MapPin }
  ];

  const getContactsByCategory = () => {
    switch (activeCategory) {
      case 'emergency':
        return emergencyContacts;
      case 'legal':
        return legalContacts;
      case 'support':
        return supportContacts;
      default:
        return [];
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
        <p className="text-gray-600">Quick access to emergency services, legal aid, and support organizations</p>
      </div>

      {/* Priority Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">In Immediate Danger?</h3>
            <p className="text-sm text-red-700 mb-3">
              If you're currently in immediate physical danger, call <strong>999</strong> first.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg">
              Call 999 Now
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contacts List */}
      {activeCategory !== 'regional' && (
        <div className="space-y-4">
          {getContactsByCategory().map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className={`bg-white rounded-lg border-2 p-6 ${getPriorityColor(contact.priority)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-lg border-2 border-current">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-gray-600 mb-2">{contact.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{contact.available}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    contact.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contact.priority} Priority
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{contact.number}</span>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Call
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      SMS
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Regional Contacts */}
      {activeCategory === 'regional' && (
        <div className="space-y-6">
          {regionalContacts.map((region, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>{region.region}</span>
              </h3>
              <div className="space-y-4">
                {region.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                        Call
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.number}</p>
                    <p className="text-sm text-gray-500">{contact.address}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep these numbers saved in your phone for quick access</li>
          <li>• Some services may charge standard call rates</li>
          <li>• Free legal aid is available for those who qualify</li>
          <li>• Counseling services are confidential and professional</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyContacts;