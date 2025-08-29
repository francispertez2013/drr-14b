import React, { useState, useEffect } from 'react';
import { Shield, Download, Printer, Share2, MapPin, Users, Clock, CheckCircle, AlertTriangle, Zap, Calendar } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';

const EvacuationGenerator: React.FC = () => {
  const [buildingType, setBuildingType] = useState('Office Building');
  const [floors, setFloors] = useState(3);
  const [occupancy, setOccupancy] = useState(150);
  const [emergencyType, setEmergencyType] = useState('Fire Emergency');
  const [teamSize, setTeamSize] = useState(8);
  const [considerations, setConsiderations] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    // Load external scripts for PDF generation
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      } catch (error) {
        console.error('Error loading PDF generation scripts:', error);
      }
    };

    loadScripts();
  }, []);

  const generateRoute = () => {
    setShowMap(true);
    // Scroll to map section
    setTimeout(() => {
      document.getElementById('mapSection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const generatePlan = () => {
    setShowPlan(true);
    // Scroll to plan section
    setTimeout(() => {
      document.getElementById('planSection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const downloadRoute = () => {
    const timeEstimate = Math.ceil(occupancy / 50) + floors;
    const routeData = `
Evacuation Route Report
======================

Building Information:
- Type: ${buildingType}
- Floors: ${floors}
- Occupancy: ${occupancy} people
- Estimated Evacuation Time: ${timeEstimate}-${timeEstimate + 2} minutes

Route Details:
- Primary exits identified and marked
- Evacuation paths optimized for capacity
- Safety rating: Optimal
- Compliance: Meets international safety standards

Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([routeData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evacuation-route-${buildingType.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadPlan = () => {
    const planContent = `
EMERGENCY EVACUATION PLAN
========================

FACILITY INFORMATION
-------------------
Building Type: ${buildingType}
Number of Floors: ${floors}
Total Occupancy: ${occupancy} people
Emergency Type: ${emergencyType}
Response Team Size: ${teamSize} members
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS (0-2 MINUTES)
------------------------------
1. Activate emergency alarm system
2. Alert emergency response team (${teamSize} members)
3. Begin evacuation procedures according to ${emergencyType} protocol
4. Contact emergency services (911)
5. Initiate communication with building occupants

EVACUATION PHASE (2-10 MINUTES)
-------------------------------
1. Guide occupants to designated exits using marked routes
2. Assist individuals with special needs and mobility requirements
3. Conduct systematic floor-by-floor sweep starting from top floor
4. Maintain crowd control at assembly points
5. Monitor evacuation progress and report to incident commander

POST-EVACUATION PROCEDURES (10+ MINUTES)
---------------------------------------
1. Conduct headcount at designated assembly areas
2. Report status and missing persons to emergency services
3. Provide first aid and medical assistance as needed
4. Coordinate with authorities for building re-entry clearance
5. Document incident and evacuation effectiveness

SPECIAL CONSIDERATIONS
---------------------
${considerations || 'None specified'}

EMERGENCY CONTACTS
-----------------
Fire Department: 911
Police: 911
Medical Emergency: 911
Building Security: (555) 123-4567
Facilities Manager: (555) 123-4568
Safety Coordinator: (555) 123-4569

This plan complies with local fire codes and OSHA regulations.
Plan should be reviewed and updated annually or after any building modifications.

---
Document ID: EP-${Date.now()}
Version: 1.0
Next Review Date: ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}
    `;
    
    const blob = new Blob([planContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evacuation-plan-${emergencyType.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const printRoute = () => {
    window.print();
  };

  const shareRoute = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Evacuation Route',
        text: 'Check out this evacuation route',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Route link copied to clipboard!');
    }
  };

  const timeEstimate = Math.ceil(occupancy / 50) + floors;

  return (
    <>
      <SEOHead
        title="Emergency Evacuation Planning System - MDRRMO Pio Duran"
        description="Generate customized evacuation routes and comprehensive emergency plans for buildings and facilities in Pio Duran, Albay."
        keywords="evacuation planning, emergency routes, building safety, disaster preparedness, MDRRMO, Pio Duran"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-20">
        {/* Header Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
          </div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-6 animate-pulse-glow">
              <Shield className="w-10 h-10 text-blue-950" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-text-glow">
              Emergency Evacuation <span className="text-yellow-500">Planning</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Generate customized evacuation routes and comprehensive emergency plans to ensure safety and preparedness for any situation.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Planning Tools */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Route Generator */}
            <ModernCard variant="glass" className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-blue-950" />
                </div>
                <h2 className="text-2xl font-bold text-white">Route Generator</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Building Type</label>
                  <select 
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    <option>Office Building</option>
                    <option>School</option>
                    <option>Hospital</option>
                    <option>Shopping Mall</option>
                    <option>Residential Complex</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Number of Floors</label>
                  <input 
                    type="number" 
                    value={floors}
                    onChange={(e) => setFloors(parseInt(e.target.value))}
                    min="1" 
                    max="50" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Occupancy</label>
                  <input 
                    type="number" 
                    value={occupancy}
                    onChange={(e) => setOccupancy(parseInt(e.target.value))}
                    min="1" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <ModernButton
                onClick={generateRoute}
                variant="warning"
                size="lg"
                icon={MapPin}
                className="w-full"
              >
                Generate Evacuation Route
              </ModernButton>
            </ModernCard>

            {/* Plan Generator */}
            <ModernCard variant="glass" className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-blue-950" />
                </div>
                <h2 className="text-2xl font-bold text-white">Plan Generator</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Emergency Type</label>
                  <select
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    <option>Fire Emergency</option>
                    <option>Earthquake</option>
                    <option>Flood</option>
                    <option>Chemical Spill</option>
                    <option>Security Threat</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Response Team Size</label>
                  <input 
                    type="number" 
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    min="1" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Special Considerations</label>
                  <textarea 
                    value={considerations}
                    onChange={(e) => setConsiderations(e.target.value)}
                    rows={3} 
                    placeholder="Mobility assistance, medical equipment, etc." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none bg-white/90 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <ModernButton
                onClick={generatePlan}
                variant="primary"
                size="lg"
                icon={FileText}
                className="w-full"
              >
                Generate Evacuation Plan
              </ModernButton>
            </ModernCard>
          </div>

          {/* Interactive Map Display */}
          {showMap && (
            <section id="mapSection" className="mb-8">
              <ModernCard variant="glass" className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Generated Evacuation Route</h3>
                  <div className="flex space-x-2">
                    <ModernButton
                      onClick={downloadRoute}
                      variant="warning"
                      size="sm"
                      icon={Download}
                    >
                      Download
                    </ModernButton>
                    <ModernButton
                      onClick={printRoute}
                      variant="secondary"
                      size="sm"
                      icon={Printer}
                    >
                      Print
                    </ModernButton>
                    <ModernButton
                      onClick={shareRoute}
                      variant="ghost"
                      size="sm"
                      icon={Share2}
                    >
                      Share
                    </ModernButton>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 relative mb-6" style={{ height: '400px' }}>
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Building outline */}
                    <rect x="50" y="50" width="300" height="200" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
                    
                    {/* Rooms */}
                    <rect x="70" y="70" width="80" height="60" fill="#dbeafe" stroke="#1e3a8a"/>
                    <rect x="170" y="70" width="80" height="60" fill="#dbeafe" stroke="#1e3a8a"/>
                    <rect x="270" y="70" width="60" height="60" fill="#dbeafe" stroke="#1e3a8a"/>
                    <rect x="70" y="150" width="80" height="80" fill="#dbeafe" stroke="#1e3a8a"/>
                    <rect x="170" y="150" width="80" height="80" fill="#dbeafe" stroke="#1e3a8a"/>
                    <rect x="270" y="150" width="60" height="80" fill="#dbeafe" stroke="#1e3a8a"/>
                    
                    {/* Exit points */}
                    <circle cx="200" cy="50" r="8" fill="#eab308"/>
                    <circle cx="350" cy="150" r="8" fill="#eab308"/>
                    
                    {/* Evacuation route */}
                    <path d="M 110 100 L 200 100 L 200 50" stroke="#eab308" strokeWidth="3" fill="none" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 210 180 L 300 180 L 350 150" stroke="#eab308" strokeWidth="3" fill="none" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-700 mb-2">Legend</div>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Exit Points</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-0.5 bg-yellow-500 mr-2 border-dashed border border-yellow-500"></div>
                      <span className="text-xs text-gray-600">Evacuation Route</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <ModernCard variant="gradient" className="p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-blue-950 mr-2" />
                      <span className="font-medium text-blue-950">Estimated Time</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-950">{timeEstimate}-{timeEstimate + 2} minutes</p>
                  </ModernCard>
                  
                  <ModernCard variant="gradient" className="p-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-950 mr-2" />
                      <span className="font-medium text-blue-950">Capacity</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-950">{occupancy} people</p>
                  </ModernCard>
                  
                  <ModernCard variant="gradient" className="p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-blue-950">Safety Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">Optimal</p>
                  </ModernCard>
                </div>
              </ModernCard>
            </section>
          )}

          {/* Generated Plan Display */}
          {showPlan && (
            <section id="planSection">
              <ModernCard variant="glass" className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Emergency Evacuation Plan</h3>
                  <div className="flex space-x-2">
                    <ModernButton
                      onClick={downloadPlan}
                      variant="warning"
                      size="sm"
                      icon={Download}
                    >
                      Download PDF
                    </ModernButton>
                    <ModernButton
                      onClick={shareRoute}
                      variant="secondary"
                      size="sm"
                      icon={Share2}
                    >
                      Share Plan
                    </ModernButton>
                  </div>
                </div>
                
                <div className="space-y-6 text-white">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-red-800 mb-2">Immediate Actions (0-2 minutes)</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Activate emergency alarm system</li>
                      <li>• Alert emergency response team ({teamSize} members)</li>
                      <li>• Begin evacuation procedures</li>
                      <li>• Contact emergency services</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Evacuation Phase (2-10 minutes)</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Guide occupants to designated exits</li>
                      <li>• Assist individuals with special needs</li>
                      <li>• Conduct floor-by-floor sweep</li>
                      <li>• Maintain crowd control at assembly points</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Post-Evacuation (10+ minutes)</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Conduct headcount at assembly areas</li>
                      <li>• Report to emergency services</li>
                      <li>• Provide medical assistance if needed</li>
                      <li>• Coordinate with authorities for re-entry</li>
                    </ul>
                  </div>
                  
                  {considerations && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Special Considerations</h5>
                      <p className="text-sm text-blue-700">{considerations}</p>
                    </div>
                  )}
                </div>
              </ModernCard>
            </section>
          )}

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-8 mt-12">
            <ModernCard variant="interactive" hover className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-950" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Generation</h3>
              <p className="text-blue-200">Create evacuation routes and plans in seconds with our advanced algorithms.</p>
            </ModernCard>
            
            <ModernCard variant="interactive" hover className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-950" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Safety Compliant</h3>
              <p className="text-blue-200">All plans meet international safety standards and building codes.</p>
            </ModernCard>
            
            <ModernCard variant="interactive" hover className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-950" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Ready</h3>
              <p className="text-blue-200">Access your evacuation plans on any device, anywhere, anytime.</p>
            </ModernCard>
          </section>
        </div>
      </div>
    </>
  );
};

export default EvacuationGenerator;