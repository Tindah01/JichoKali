import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Filter } from 'lucide-react';

interface PoliceStation {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
}

const PoliceStationMap = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedStation, setSelectedStation] = useState<PoliceStation | null>(null);
  const [filterRadius, setFilterRadius] = useState(10); // km
  const [loading, setLoading] = useState(true);

  // Mock police stations data - in real app, this would come from your backend/API
  const policeStations: PoliceStation[] = [
    {
      id: 1,
      name: 'Central Police Station',
      address: 'University Way, Nairobi CBD',
      phone: '+254 20 222 2222',
      hours: '24/7',
      rating: 4.2,
      distance: 2.5,
      coordinates: { lat: -1.2864, lng: 36.8172 },
      services: ['Emergency Response', 'Criminal Investigation', 'Traffic Police']
    },
    {
      id: 2,
      name: 'Kilimani Police Station',
      address: 'Argwings Kodhek Road, Kilimani',
      phone: '+254 20 271 4673',
      hours: '24/7',
      rating: 3.8,
      distance: 4.2,
      coordinates: { lat: -1.2921, lng: 36.7856 },
      services: ['Emergency Response', 'Community Policing', 'Crime Prevention']
    },
    {
      id: 3,
      name: 'Westlands Police Station',
      address: 'Waiyaki Way, Westlands',
      phone: '+254 20 374 4020',
      hours: '24/7',
      rating: 4.0,
      distance: 6.8,
      coordinates: { lat: -1.2676, lng: 36.8108 },
      services: ['Emergency Response', 'Traffic Police', 'Criminal Investigation']
    },
    {
      id: 4,
      name: 'Kasarani Police Station',
      address: 'Thika Road, Kasarani',
      phone: '+254 20 802 0000',
      hours: '24/7',
      rating: 3.5,
      distance: 12.3,
      coordinates: { lat: -1.2297, lng: 36.8975 },
      services: ['Emergency Response', 'Community Policing']
    },
    {
      id: 5,
      name: 'Lang\'ata Police Station',
      address: 'Lang\'ata Road, Lang\'ata',
      phone: '+254 20 891 0000',
      hours: '24/7',
      rating: 3.9,
      distance: 8.7,
      coordinates: { lat: -1.3515, lng: 36.7519 },
      services: ['Emergency Response', 'Wildlife Crime Unit', 'Traffic Police']
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Nairobi coordinates if location access is denied
          setUserLocation({ lat: -1.2921, lng: 36.8219 });
          setLoading(false);
        }
      );
    } else {
      // Default location if geolocation is not supported
      setUserLocation({ lat: -1.2921, lng: 36.8219 });
      setLoading(false);
    }
  }, []);

  const filteredStations = policeStations.filter(station => station.distance <= filterRadius);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getDirections = (station: PoliceStation) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${station.coordinates.lat},${station.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600">Loading nearby police stations...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-6 h-6 text-red-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nearest Police Stations</h2>
            <p className="text-gray-600">Find the closest police station to your location</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Radius:</label>
            <select
              value={filterRadius}
              onChange={(e) => setFilterRadius(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
          <span className="text-sm text-gray-500">
            Found {filteredStations.length} stations within {filterRadius}km
          </span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
              <p className="text-gray-700 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-500">Police stations near your location</p>
            </div>
          </div>
          
          {/* Mock map markers */}
          <div className="absolute top-4 left-4 bg-red-600 text-white p-2 rounded-full">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="absolute top-12 right-8 bg-blue-600 text-white p-2 rounded-full">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="absolute bottom-8 left-12 bg-green-600 text-white p-2 rounded-full">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="absolute bottom-4 right-4 bg-purple-600 text-white p-2 rounded-full">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Location Info */}
      {userLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Navigation className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Your Location</h3>
              <p className="text-sm text-blue-800">
                Latitude: {userLocation.lat.toFixed(4)}, Longitude: {userLocation.lng.toFixed(4)}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Location services enabled. Showing stations near you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Police Stations List */}
      <div className="space-y-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all ${
              selectedStation?.id === station.id
                ? 'border-red-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => setSelectedStation(selectedStation?.id === station.id ? null : station)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{station.name}</h3>
                  <p className="text-gray-600 mb-2">{station.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{station.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Navigation className="w-4 h-4" />
                      <span>{station.distance} km away</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {getRatingStars(station.rating)}
                  <span className="text-sm text-gray-600 ml-1">({station.rating})</span>
                </div>
                <span className="text-sm font-medium text-green-600">Open 24/7</span>
              </div>
            </div>

            {selectedStation?.id === station.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{station.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{station.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Services Available</h4>
                    <div className="flex flex-wrap gap-1">
                      {station.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => getDirections(station)}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredStations.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Police Stations Found</h3>
          <p className="text-gray-600 mb-4">
            No police stations found within {filterRadius}km of your location.
          </p>
          <button
            onClick={() => setFilterRadius(50)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Expand Search to 50km
          </button>
        </div>
      )}

      {/* Emergency Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Emergency Situations</h3>
            <p className="text-sm text-red-700 mb-2">
              If you're in immediate danger, call <strong>999</strong> for emergency services.
              Use this map to find the nearest station for non-emergency situations.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Call 999 Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceStationMap;