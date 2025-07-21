import React, { useState } from 'react';
import { BookOpen, Scale, Phone, Users, FileText, ExternalLink, Download, AlertTriangle } from 'lucide-react';

const Resources = () => {
  const [activeSection, setActiveSection] = useState('legal');

  const legalResources = [
    {
      title: 'Know Your Rights',
      description: 'Understand your constitutional rights when interacting with police',
      icon: Scale,
      items: [
        'Right to remain silent',
        'Right to legal representation',
        'Right to be treated with dignity',
        'Right to medical attention if injured'
      ]
    },
    {
      title: 'Legal Aid Organizations',
      description: 'Organizations providing free legal assistance',
      icon: Users,
      items: [
        'Kenya National Commission on Human Rights (KNCHR)',
        'Independent Policing Oversight Authority (IPOA)',
        'Kituo Cha Sheria',
        'Law Society of Kenya (LSK)'
      ]
    }
  ];

  const emergencyContacts = [
    { name: 'Police Emergency', number: '999', available: '24/7' },
    { name: 'IPOA Hotline', number: '+254 20 272 6171', available: '24/7' },
    { name: 'KNCHR Hotline', number: '+254 20 272 1152', available: 'Business hours' },
    { name: 'Legal Aid Helpline', number: '+254 700 123 456', available: '24/7' }
  ];

  const documents = [
    {
      title: 'Police Brutality Reporting Guide',
      description: 'Step-by-step guide on reporting incidents',
      type: 'PDF',
      size: '2.5 MB'
    },
    {
      title: 'Know Your Rights Handbook',
      description: 'Complete guide to citizen rights in Kenya',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'Evidence Collection Checklist',
      description: 'What to document when witnessing police brutality',
      type: 'PDF',
      size: '800 KB'
    }
  ];

  const supportGroups = [
    {
      name: 'Trauma Support Network',
      description: 'Free counseling for victims of police brutality',
      contact: '+254 700 456 789',
      location: 'Nairobi, Mombasa, Kisumu'
    },
    {
      name: 'Community Justice Advocates',
      description: 'Grassroots organization supporting victims',
      contact: '+254 722 123 456',
      location: 'Nationwide'
    },
    {
      name: 'Legal Defense Fund',
      description: 'Financial support for legal proceedings',
      contact: 'info@legaldefense.ke',
      location: 'Online applications'
    }
  ];

  const sections = [
    { id: 'legal', label: 'Legal Resources', icon: Scale },
    { id: 'contacts', label: 'Emergency Contacts', icon: Phone },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'support', label: 'Support Groups', icon: Users }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Resources & Support</h2>
        <p className="text-gray-600">Access legal resources, emergency contacts, and support services</p>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legal Resources */}
      {activeSection === 'legal' && (
        <div className="space-y-4">
          {legalResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <ul className="space-y-2">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-600"></div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Contacts */}
      {activeSection === 'contacts' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Emergency Situations</h3>
                <p className="text-sm text-red-700">
                  If you're in immediate danger, call 999 first. Use other contacts for reporting and support.
                </p>
              </div>
            </div>
          </div>

          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                <span className="text-sm text-gray-600">{contact.available}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">{contact.number}</span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Documents */}
      {activeSection === 'documents' && (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-gray-600 mb-2">{doc.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Support Groups */}
      {activeSection === 'support' && (
        <div className="space-y-4">
          {supportGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Contact:</span>
                  <p className="font-medium text-gray-900">{group.contact}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium text-gray-900">{group.location}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                  <ExternalLink className="w-4 h-4" />
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;