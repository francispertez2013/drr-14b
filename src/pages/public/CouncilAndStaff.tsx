import React, { useState } from 'react';
import { User, Users, MapPin, Award, ChevronDown, ChevronUp, Building, Shield, Mail, Phone, Calendar, FileText, Newspaper } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const CouncilAndStaff: React.FC = () => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'council' | 'staff'>('council');
  const [organizationalHierarchy, setOrganizationalHierarchy] = useState<any[]>([]);
  const [keyPersonnel, setKeyPersonnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'council' | 'staff'>('council');

  React.useEffect(() => {
    fetchOrganizationalData();
  }, []);

  const fetchOrganizationalData = async () => {
    try {
      const [hierarchyData, personnelData] = await Promise.all([
        supabase.from('organizational_hierarchy').select('*').eq('is_active', true).order('level').order('order_index'),
        supabase.from('key_personnel').select('*').eq('is_active', true).order('order_index')
      ]);

      setOrganizationalHierarchy(hierarchyData.data || []);
      setKeyPersonnel(personnelData.data || []);
    } catch (error) {
      console.error('Error fetching organizational data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const councilStructure = {
    mayor: { 
      name: "Hon. Juan Dela Cruz", 
      title: "Municipal Mayor & Chairman",
      email: "mayor@pioduran.gov.ph",
      phone: "(052) 234-5678",
      bio: "Leading the municipality with a focus on disaster resilience and community safety."
    },
    secretary: { 
      name: "Maria Santos", 
      title: "General Secretary",
      email: "secretary@pioduran.gov.ph", 
      phone: "(052) 234-5679",
      bio: "Coordinating council activities and maintaining official records."
    },
    members: [
      { 
        id: 1, 
        name: "Dr. Roberto Garcia", 
        agency: "Municipal Health Officer",
        email: "mho@pioduran.gov.ph",
        phone: "(052) 234-5680",
        bio: "Overseeing health-related disaster preparedness and medical emergency response."
      },
      { 
        id: 2, 
        name: "Carlos Rivera", 
        agency: "Municipal Agriculturist",
        email: "agri@pioduran.gov.ph",
        phone: "(052) 234-5681",
        bio: "Managing agricultural disaster risk reduction and food security programs."
      },
      { 
        id: 3, 
        name: "Ana Rodriguez", 
        agency: "Municipal Social Welfare Officer",
        email: "mswd@pioduran.gov.ph",
        phone: "(052) 234-5682",
        bio: "Coordinating social services and vulnerable population protection during disasters."
      },
      { 
        id: 4, 
        name: "Pedro Martinez", 
        agency: "Municipal Engineer",
        email: "engineer@pioduran.gov.ph",
        phone: "(052) 234-5683",
        bio: "Ensuring infrastructure resilience and coordinating engineering response during emergencies."
      },
      { 
        id: 5, 
        name: "Luisa Fernandez", 
        agency: "Municipal Treasurer",
        email: "treasurer@pioduran.gov.ph",
        phone: "(052) 234-5684",
        bio: "Managing financial resources for disaster preparedness and emergency response."
      },
      { 
        id: 6, 
        name: "Ramon Castillo", 
        agency: "Punong Barangay Representative",
        email: "barangay@pioduran.gov.ph",
        phone: "(052) 234-5685",
        bio: "Representing barangay interests and coordinating community-level disaster management."
      },
      { 
        id: 7, 
        name: "Elena Torres", 
        agency: "Municipal Education Officer",
        email: "education@pioduran.gov.ph",
        phone: "(052) 234-5686",
        bio: "Implementing disaster education programs in schools and educational institutions."
      },
      { 
        id: 8, 
        name: "David Cruz", 
        agency: "Municipal Environment Officer",
        email: "environment@pioduran.gov.ph",
        phone: "(052) 234-5687",
        bio: "Managing environmental aspects of disaster risk reduction and climate adaptation."
      }
    ]
  };

  const organizationalStructure = {
    mayor: { 
      name: "Hon. Juan Dela Cruz", 
      title: "Municipal Mayor & Chairman",
      department: "Office of the Mayor"
    },
    head: { 
      name: "Engr. Maria Santos", 
      title: "MDRRMO Head",
      department: "MDRRMO"
    },
    coreOfficers: [
      {
        id: 1,
        name: "Administrative and Training Officer",
        department: "Administration & Training",
        personnel: [
          { 
            id: 1, 
            name: "Ana Reyes", 
            designation: "Chief Administrative Officer", 
            email: "ana.reyes@pioduran.gov.ph",
            certifications: ["Emergency Management Certification", "Public Administration", "Disaster Risk Management"],
            experience: "8 years in public administration and emergency management"
          },
          { 
            id: 2, 
            name: "Carlos Gomez", 
            designation: "Training Coordinator", 
            email: "carlos.gomez@pioduran.gov.ph",
            certifications: ["First Aid Instructor", "Emergency Response Training", "Community Preparedness"],
            experience: "6 years in training and capacity building"
          },
          { 
            id: 3, 
            name: "Elena Torres", 
            designation: "Administrative Assistant", 
            email: "elena.torres@pioduran.gov.ph",
            certifications: ["Records Management", "Office Administration", "Crisis Communication"],
            experience: "4 years in administrative support"
          },
          { 
            id: 4, 
            name: "David Cruz", 
            designation: "Logistics Officer", 
            email: "david.cruz@pioduran.gov.ph",
            certifications: ["Supply Chain Management", "Emergency Procurement", "Resource Mobilization"],
            experience: "5 years in logistics and supply management"
          }
        ]
      },
      {
        id: 2,
        name: "Operations and Warning Officer",
        department: "Operations & Warning",
        personnel: [
          { 
            id: 1, 
            name: "Roberto Lim", 
            designation: "Chief Operations Officer", 
            email: "roberto.lim@pioduran.gov.ph",
            certifications: ["Incident Command System", "Emergency Operations", "Search and Rescue"],
            experience: "10 years in emergency operations and incident management"
          },
          { 
            id: 2, 
            name: "Sofia Chen", 
            designation: "Warning Systems Officer", 
            email: "sofia.chen@pioduran.gov.ph",
            certifications: ["Early Warning Systems", "Meteorology Basics", "Communication Systems"],
            experience: "7 years in weather monitoring and early warning"
          },
          { 
            id: 3, 
            name: "Miguel Santos", 
            designation: "Operations Assistant", 
            email: "miguel.santos@pioduran.gov.ph",
            certifications: ["Emergency Response", "Disaster Assessment", "Field Operations"],
            experience: "3 years in field operations and assessment"
          },
          { 
            id: 4, 
            name: "Isabela Rivera", 
            designation: "Communications Officer", 
            email: "isabela.rivera@pioduran.gov.ph",
            certifications: ["Public Information", "Media Relations", "Crisis Communication"],
            experience: "5 years in public information and media relations"
          }
        ]
      },
      {
        id: 3,
        name: "Research and Planning Officer",
        department: "Research & Planning",
        personnel: [
          { 
            id: 1, 
            name: "Dr. Patricia Yang", 
            designation: "Chief Planning Officer", 
            email: "patricia.yang@pioduran.gov.ph",
            certifications: ["Disaster Risk Assessment", "Urban Planning", "Climate Change Adaptation"],
            experience: "12 years in disaster risk assessment and urban planning"
          },
          { 
            id: 2, 
            name: "Fernando Lopez", 
            designation: "Research Analyst", 
            email: "fernando.lopez@pioduran.gov.ph",
            certifications: ["Data Analysis", "GIS Mapping", "Risk Assessment"],
            experience: "6 years in research and data analysis"
          },
          { 
            id: 3, 
            name: "Carmen Valdez", 
            designation: "Planning Assistant", 
            email: "carmen.valdez@pioduran.gov.ph",
            certifications: ["Community Planning", "Project Development", "Monitoring and Evaluation"],
            experience: "4 years in planning and project development"
          },
          { 
            id: 4, 
            name: "Alberto Ruiz", 
            designation: "Database Manager", 
            email: "alberto.ruiz@pioduran.gov.ph",
            certifications: ["Information Systems", "Data Management", "Statistical Analysis"],
            experience: "8 years in database management and information systems"
          }
        ]
      }
    ]
  };

  // Use database data if available, otherwise use defaults
  const displayHierarchy = organizationalHierarchy.length > 0 ? organizationalHierarchy : [];
  const displayPersonnel = keyPersonnel.length > 0 ? keyPersonnel : [];

  // If no data available, show admin link
  if (!loading && organizationalHierarchy.length === 0 && keyPersonnel.length === 0) {
    return (
      <>
        <SEOHead
          title="Council & Staff - MDRRMO Pio Duran"
          description="Meet the Municipal Disaster Risk Reduction and Management Council members and MDRRMO staff."
        />
        <div className="min-h-screen py-20 bg-gray-50">
          <div className="container px-6 mx-auto">
            <div className="text-center">
              <h1 className="mb-8 text-4xl font-bold text-blue-900">Council & Staff</h1>
              <div className="p-12 bg-white shadow-lg rounded-xl">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="mb-2 text-2xl font-bold text-gray-900">No Staff Information Available</h2>
                <p className="mb-6 text-gray-600">Staff information will appear here once added by the admin.</p>
                <Link 
                  to="/admin/about"
                  className="inline-flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <FileText className="mr-2" size={16} />
                  Go to Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Council & Staff - MDRRMO Pio Duran"
        description="Meet the Municipal Disaster Risk Reduction and Management Council members and MDRRMO staff of Pio Duran, Albay."
        keywords="MDRRMC, MDRRMO staff, disaster management council, Pio Duran officials, emergency management team"
      />
      
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-48 h-48 bg-yellow-500 rounded-full top-10 left-10 mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute w-48 h-48 bg-purple-400 rounded-full top-20 right-10 mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
            <div className="absolute w-64 h-64 bg-blue-400 rounded-full -bottom-10 left-20 mix-blend-multiply filter blur-3xl animate-float stagger-4"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-yellow-500 rounded-full animate-pulse-glow">
              <Shield className="w-10 h-10 text-blue-950" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-yellow-500 md:text-6xl animate-text-glow">MDRRMC & Staff</h1>
            <p className="max-w-3xl mx-auto mb-8 text-lg font-medium leading-relaxed text-white md:text-xl">
              Municipal Disaster Risk Reduction and Management Council & Office Personnel
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="p-2 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20">
                <button
                  onClick={() => setActiveTab('council')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'council'
                      ? 'bg-yellow-500 text-blue-950 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  MDRRM Council
                </button>
                <button
                  onClick={() => setActiveTab('staff')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'staff'
                      ? 'bg-yellow-500 text-blue-950 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  MDRRMO Staff
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* MDRRM Council Members */}
        {activeTab === 'council' && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center gap-4 mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Users className="text-blue-950" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">MDRRM Council Members</h2>
              </div>
              
              {/* Mayor Level */}
              <div className="flex justify-center mb-12">
                <ModernCard variant="gradient" className="w-full max-w-md p-8 text-center transition-transform duration-300 hover:scale-105">
                  <img 
                    src="https://res.cloudinary.com/dedcmctqk/image/upload/v1749381954/samples/smile.jpg"
                    alt={councilStructure.mayor.name}
                    className="object-cover w-24 h-24 mx-auto mb-4 border-4 rounded-full border-blue-950"
                  />
                  <h3 className="mb-2 text-xl font-bold text-blue-950">{councilStructure.mayor.name}</h3>
                  <p className="mb-4 font-semibold text-blue-900">{councilStructure.mayor.title}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-blue-800">
                      <Mail size={14} />
                      <span>{councilStructure.mayor.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-blue-800">
                      <Phone size={14} />
                      <span>{councilStructure.mayor.phone}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-blue-900">{councilStructure.mayor.bio}</p>
                </ModernCard>
              </div>

              {/* Secretary Level */}
              <div className="flex justify-center mb-12">
                <ModernCard variant="glass" className="w-full max-w-md p-8 text-center transition-transform duration-300 border-2 border-yellow-500 hover:scale-105">
                  <img 
                    src="https://res.cloudinary.com/dedcmctqk/image/upload/v1749381954/samples/smile.jpg"
                    alt={councilStructure.secretary.name}
                    className="object-cover w-24 h-24 mx-auto mb-4 border-4 border-yellow-500 rounded-full"
                  />
                  <h3 className="mb-2 text-xl font-bold text-yellow-500">{councilStructure.secretary.name}</h3>
                  <p className="mb-4 font-semibold text-yellow-200">{councilStructure.secretary.title}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-yellow-200">
                      <Mail size={14} />
                      <span>{councilStructure.secretary.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-yellow-200">
                      <Phone size={14} />
                      <span>{councilStructure.secretary.phone}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-yellow-200">{councilStructure.secretary.bio}</p>
                </ModernCard>
              </div>

              {/* Council Members */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {councilStructure.members.map((member) => (
                  <ModernCard key={member.id} variant="interactive" hover className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img 
                        src="https://res.cloudinary.com/dedcmctqk/image/upload/v1749381954/samples/smile.jpg"
                        alt={member.name}
                        className="object-cover w-20 h-20 mb-4 border-2 rounded-full border-blue-950"
                      />
                      <h3 className="mb-2 font-bold text-blue-950 line-clamp-2">{member.name}</h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-blue-50">
                        <Building className="w-3 h-3 text-blue-950" />
                        <p className="text-xs font-medium text-blue-950">{member.agency}</p>
                      </div>
                      
                      <button
                        onClick={() => toggleMember(`council-${member.id}`)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {expandedMember === `council-${member.id}` ? 'Show Less' : 'View Details'}
                      </button>
                      
                      {expandedMember === `council-${member.id}` && (
                        <div className="w-full pt-4 mt-4 border-t border-gray-200 animate-fade-in">
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail size={12} />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={12} />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-700">{member.bio}</p>
                        </div>
                      )}
                    </div>
                  </ModernCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Organizational Structure and Staff */}
        <section id="council-staff" className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white">Meet the Council & Staff</h2>
              <p className="max-w-3xl mx-auto mt-4 text-lg text-blue-200">
                The dedicated individuals leading our disaster preparedness and response efforts.
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex justify-center max-w-md p-2 mx-auto mb-8 rounded-lg bg-blue-900/50">
              <ModernButton 
                onClick={() => setView('council')} 
                variant={view === 'council' ? 'primary' : 'ghost'}
                className="flex-1"
              >
                MDRRM Council
              </ModernButton>
              <ModernButton 
                onClick={() => setView('staff')} 
                variant={view === 'staff' ? 'primary' : 'ghost'}
                className="flex-1"
              >
                MDRRMO Staff
              </ModernButton>
            </div>

            {view === 'council' ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {councilMembers.map((member) => (
                  <ModernCard key={member.id} variant="interactive" hover className="p-6 text-center">
                    <img src={member.photo} alt={member.name} className="object-cover w-24 h-24 mx-auto mb-4 border-4 border-yellow-500 rounded-full"/>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="font-semibold text-yellow-500">{member.position}</p>
                    <p className="mt-1 text-sm text-blue-200">{member.agency}</p>
                  </ModernCard>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {displayHierarchy
                  .filter(person => person.level > 2)
                  .reduce((groups, person) => {
                    const dept = person.department;
                    if (!groups[dept]) groups[dept] = [];
                    groups[dept].push(person);
                    return groups;
                  }, {} as Record<string, any[]>)
                }
                {Object.entries(
                  displayHierarchy
                    .filter(person => person.level > 2)
                    .reduce((groups, person) => {
                      const dept = person.department;
                      if (!groups[dept]) groups[dept] = [];
                      groups[dept].push(person);
                      return groups;
                    }, {} as Record<string, any[]>)
                ).map(([department, personnel]) => (
                  <ModernCard key={department} variant="interactive" className="overflow-hidden">
                    <div className="p-6 text-center bg-gradient-to-r from-blue-950 to-blue-900">
                      <h3 className="text-lg font-bold text-yellow-500">{department}</h3>
                    </div>
                    <div className="p-6">
                      {personnel.map((person) => (
                        <div 
                          key={person.id} 
                          className="px-2 py-4 transition-colors border-b border-gray-200 rounded-lg cursor-pointer last:border-b-0 hover:bg-blue-50"
                          onClick={() => toggleMember(`hierarchy-${person.id}`)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <img 
                                src={person.photo || 'https://res.cloudinary.com/dedcmctqk/image/upload/v1749381954/samples/smile.jpg'}
                                alt={person.name}
                                className="flex-shrink-0 object-cover w-12 h-12 border-2 rounded-full border-blue-950"
                              />
                              <div className="flex-1">
                                <h4 className="mb-1 font-bold text-blue-950">{person.name}</h4>
                                <p className="mb-2 text-sm text-gray-600">{person.designation}</p>
                                
                                {expandedMember === `hierarchy-${person.id}` && (
                                  <div className="p-3 mt-3 rounded-lg bg-blue-50 animate-fade-in">
                                    <div className="space-y-2 text-sm text-gray-700">
                                      <p><strong>Department:</strong> {person.department}</p>
                                      <p><strong>Level:</strong> {person.level}</p>
                                      <p><strong>Order:</strong> {person.order_index}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button className="self-start mt-1 ml-2 transition-colors text-blue-950 hover:text-yellow-500">
                              {expandedMember === `hierarchy-${person.id}` ? 
                                <ChevronUp size={20} /> : 
                                <ChevronDown size={20} />
                              }
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ModernCard>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-blue-900">
          <div className="max-w-4xl mx-auto text-center">
            <ModernCard variant="glass" className="p-10">
              <h3 className="mb-4 text-3xl font-extrabold text-white">Our Mission</h3>
              <p className="text-xl italic text-blue-200">
                "To build a resilient and disaster-prepared community through proactive leadership, comprehensive planning, and collaborative action. We are committed to safeguarding lives, protecting property, and ensuring the well-being of every citizen of Pio Duran."
              </p>
            </ModernCard>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">
              Get Involved & Stay Informed
            </h2>
            <p className="mb-8 text-lg text-blue-200">
              Your participation is crucial for community resilience. Learn how you can contribute or get the latest safety updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ModernButton
                onClick={() => window.location.href='/volunteer'}
                variant="primary"
                size="lg"
                icon={Users}
              >
                Volunteer Program
              </ModernButton>
              <ModernButton
                onClick={() => window.location.href='/news'}
                variant="secondary"
                size="lg"
                icon={Newspaper}
              >
                News & Updates
              </ModernButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CouncilAndStaff;