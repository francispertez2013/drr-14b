import React, { useState } from 'react';
import { MapPin, Users, Phone, Search, Filter, ChevronDown, ChevronUp, Home, Navigation, ExternalLink } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('all');
  const [sortOrder, setSortOrder] = useState('name');
  const [expandedCenter, setExpandedCenter] = useState(null);

  const evacuationCenters = [
    { id: 1, name: "SLTCFPDI", capacity: 190, lat: 13.03076, lng: 123.446605, barangay: "Poblacion" },
    { id: 2, name: "West Coast College", capacity: 250, lat: 13.037648, lng: 123.450466, barangay: "Poblacion" },
    { id: 3, name: "Pio Duran National High School", capacity: 200, lat: 13.066302, lng: 123.459913, barangay: "Poblacion" },
    { id: 4, name: "Binodegahan Elementary School", capacity: 200, lat: 13.061385, lng: 123.458171, barangay: "Binodegahan" },
    { id: 5, name: "San Lorenzo Academy", capacity: 200, lat: 13.044291, lng: 123.45316, barangay: "San Lorenzo" },
    { id: 6, name: "Pio Duran East Central School", capacity: 250, lat: 13.044403, lng: 123.457286, barangay: "Poblacion" },
    { id: 7, name: "La Medalla Elementary School", capacity: 140, lat: 13.047211, lng: 123.444675, barangay: "La Medalla" },
    { id: 8, name: "Sukip Elementary School", capacity: 80, lat: 13.067618, lng: 123.514811, barangay: "Sukip" },
    { id: 9, name: "Malapay Elementary School", capacity: 125, lat: 13.072097, lng: 123.490586, barangay: "Malapay" },
    { id: 10, name: "Agol Elementary School", capacity: 100, lat: 13.086464, lng: 123.461864, barangay: "Agol" },
    { id: 11, name: "Mamlad Elementary School", capacity: 100, lat: 13.026739, lng: 123.500205, barangay: "Mamlad" },
    { id: 12, name: "Alabangpuro Elementary School", capacity: 100, lat: 13.049767, lng: 123.485905, barangay: "Alabangpuro" },
    { id: 13, name: "Basicao Coastal Elementary School", capacity: 120, lat: 13.047222, lng: 123.404682, barangay: "Basicao" },
    { id: 14, name: "Rawis Elementary School", capacity: 90, lat: 13.040754, lng: 123.511542, barangay: "Rawis" },
    { id: 15, name: "Macasitas Elementary School", capacity: 80, lat: 13.05592, lng: 123.496518, barangay: "Macasitas" },
    { id: 16, name: "Salvacion Elementary School", capacity: 70, lat: 13.083624, lng: 123.505548, barangay: "Salvacion" },
    { id: 17, name: "Tibabo Elementary School", capacity: 140, lat: 13.102897, lng: 123.491935, barangay: "Tibabo" },
    { id: 18, name: "Panganiran Elementary School", capacity: 150, lat: 13.087033, lng: 123.410157, barangay: "Panganiran" },
    { id: 19, name: "Buyo Elementary School", capacity: 55, lat: 13.050375, lng: 123.529638, barangay: "Buyo" },
    { id: 20, name: "Nablangbulod Elementary School", capacity: 55, lat: 13.059784, lng: 123.476396, barangay: "Nablangbulod" },
    { id: 21, name: "Flores Elementary School", capacity: 80, lat: 13.091788, lng: 123.439386, barangay: "Flores" },
    { id: 22, name: "Basicao Interior Elementary School", capacity: 80, lat: 13.080943, lng: 123.487848, barangay: "Basicao" },
    { id: 23, name: "Palapas Elementary School", capacity: 80, lat: 13.111998, lng: 123.469715, barangay: "Palapas" },
    { id: 24, name: "Lawinon Elementary School", capacity: 70, lat: 13.011444, lng: 123.491552, barangay: "Lawinon" },
    { id: 25, name: "Matanglad Elementary School", capacity: 80, lat: 13.077718, lng: 123.532203, barangay: "Matanglad" },
    { id: 26, name: "Buenavista Evac. Center", capacity: 120, lat: 12.989386, lng: 123.480805, barangay: "Buenavista" },
    { id: 27, name: "Sitio Papantayan (Palapas) DDC", capacity: 100, lat: 13.109744, lng: 123.458335, barangay: "Palapas" },
    { id: 28, name: "Caratagan Barangay Hall", capacity: 30, lat: 13.043625, lng: 123.453052, barangay: "Caratagan" },
    { id: 29, name: "Seventh Day Adventist Church", capacity: 70, lat: 13.046383, lng: 123.455219, barangay: "Poblacion" },
    { id: 30, name: "Mormons", capacity: 60, lat: 13.043838, lng: 123.453556, barangay: "Poblacion" },
    { id: 31, name: "Our Lady Of Salvation Parish", capacity: 50, lat: 13.028495, lng: 123.446361, barangay: "Poblacion" },
    { id: 32, name: "Sukip Day Care Center", capacity: 20, lat: 13.066563, lng: 123.517172, barangay: "Sukip" },
    { id: 33, name: "Sukip Barangay Hall", capacity: 45, lat: 13.066594, lng: 123.517455, barangay: "Sukip" },
    { id: 34, name: "Basicao Coastal Day Care Center", capacity: 20, lat: 13.046048, lng: 123.404362, barangay: "Basicao" },
    { id: 35, name: "Macasitas Day care", capacity: 35, lat: 13.056612, lng: 123.495147, barangay: "Macasitas" },
    { id: 36, name: "Municipal Multi-Purpose Hall", capacity: 120, lat: 13.044222, lng: 123.456376, barangay: "Poblacion" }
  ];

  const barangays = [...new Set(evacuationCenters.map(center => center.barangay))].sort();

  const filteredCenters = evacuationCenters
    .filter(center => 
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBarangay === 'all' || center.barangay === selectedBarangay)
    )
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'capacity') {
        return b.capacity - a.capacity;
      } else {
        return a.barangay.localeCompare(b.barangay);
      }
    });

  const toggleCenter = (id) => {
    setExpandedCenter(expandedCenter === id ? null : id);
  };

  const openInGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const totalCapacity = evacuationCenters.reduce((sum, center) => sum + center.capacity, 0);
  const totalCenters = evacuationCenters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 mb-6">
            <Home className="w-10 h-10 text-blue-950" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Evacuation <span className="text-yellow-500">Centers</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            List of designated evacuation centers in our municipality. Find your nearest center and prepare for emergencies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                <Home className="w-6 h-6 text-blue-950" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{totalCenters}</h3>
              <p className="text-blue-200">Total Centers</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                <Users className="w-6 h-6 text-blue-950" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{totalCapacity.toLocaleString()}</h3>
              <p className="text-blue-200">Total Capacity</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                <MapPin className="w-6 h-6 text-blue-950" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{barangays.length}</h3>
              <p className="text-blue-200">Barangays Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search evacuation centers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedBarangay}
                  onChange={(e) => setSelectedBarangay(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Barangays</option>
                  {barangays.map(barangay => (
                    <option key={barangay} value={barangay}>{barangay}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="capacity">Sort by Capacity</option>
                  <option value="barangay">Sort by Barangay</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-blue-900 font-medium">
                Showing {filteredCenters.length} of {totalCenters} evacuation centers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evacuation Centers List */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <div key={center.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-yellow-500">{center.name}</h3>
                    <div className="inline-flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded-full">
                      <Users className="w-3 h-3 text-blue-950" />
                      <span className="text-xs font-bold text-blue-950">{center.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-4 h-4 text-yellow-300" />
                    <p className="text-yellow-200 text-sm">{center.barangay}</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => openInGoogleMaps(center.lat, center.lng)}
                      className="flex items-center gap-2 text-blue-950 hover:text-yellow-500 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">View on Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleCenter(center.id)}
                      className="text-blue-950 hover:text-yellow-500 transition-colors"
                    >
                      {expandedCenter === center.id ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </button>
                  </div>
                  
                  {expandedCenter === center.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Navigation className="w-4 h-4 text-blue-950" />
                        <span className="text-sm font-semibold text-blue-950">Directions</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        This evacuation center is located in {center.barangay}. In case of emergency, 
                        follow the designated evacuation routes and bring your emergency kit.
                      </p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-950" />
                        <span className="text-sm text-gray-600">Contact: (046) 123-4567</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 mb-4">
                <Search className="w-8 h-8 text-blue-950" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No centers found</h3>
              <p className="text-blue-200">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Emergency Preparedness Tips */}
      <section className="py-16 px-4 bg-blue-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Emergency <span className="text-yellow-500">Preparedness Tips</span>
            </h2>
            <p className="text-xl text-blue-200">
              Essential information for staying safe during emergencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-950 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-950 mb-2">Know Your Center</h3>
                  <p className="text-blue-900">
                    Familiarize yourself with the location and capacity of your nearest evacuation center. 
                    Visit during non-emergency times to understand the layout.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-950" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">Emergency Kit</h3>
                  <p className="text-yellow-100">
                    Prepare a 72-hour emergency kit with water, non-perishable food, medications, 
                    flashlight, and important documents. Keep it accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;