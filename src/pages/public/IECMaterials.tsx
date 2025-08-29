import React, { useState } from 'react';
import { Download, FileText, Map, Shield, Phone, Waves, Wind, Earth, Flame, CloudRain, Search, Filter, Eye, Star, Calendar, Users } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';
import DownloadButton from '../../components/DownloadButton';
import { usePages } from '../../contexts/PagesContext';
import { Link } from 'react-router-dom';

const IECMaterials: React.FC = () => {
  const { resources } = usePages();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Use actual resources if available, otherwise use sample data
  const publishedResources = resources.filter(resource => resource.status === 'published');
  
  const downloadMaterials = [
    {
      id: 1,
      title: "Evacuation Routes Map",
      description: "Detailed evacuation routes for all barangay zones with assembly points and emergency contacts",
      icon: Map,
      category: "maps",
      fileUrl: "https://example.com/evacuation-routes-map.pdf",
      size: "2.4 MB",
      updated: "2024-01-15",
      downloads: 1234,
      featured: true,
      tags: ["evacuation", "routes", "emergency", "safety"]
    },
    {
      id: 2,
      title: "Emergency Contact List",
      description: "Complete directory of emergency hotlines, government agencies, and local responders",
      icon: Phone,
      category: "guides",
      fileUrl: "https://example.com/emergency-contacts.pdf",
      size: "1.1 MB",
      updated: "2024-01-10",
      downloads: 987,
      featured: true,
      tags: ["contacts", "hotlines", "emergency", "directory"]
    },
    {
      id: 3,
      title: "Disaster Preparedness Brochure",
      description: "Essential tips for family emergency preparedness including kit checklists and planning guides",
      icon: Shield,
      category: "guides",
      fileUrl: "https://example.com/disaster-preparedness.pdf",
      size: "3.7 MB",
      updated: "2024-01-12",
      downloads: 756,
      featured: true,
      tags: ["preparedness", "family", "planning", "checklist"]
    },
    {
      id: 4,
      title: "Flood Safety Guidelines",
      description: "Comprehensive flood response procedures, safety measures, and recovery protocols",
      icon: Waves,
      category: "guides",
      fileUrl: "https://example.com/flood-safety.pdf",
      size: "2.9 MB",
      updated: "2024-01-08",
      downloads: 654,
      featured: false,
      tags: ["flood", "safety", "response", "recovery"]
    },
    {
      id: 5,
      title: "Typhoon Preparedness Manual",
      description: "Step-by-step typhoon preparation checklist and safety protocols for households",
      icon: Wind,
      category: "guides",
      fileUrl: "https://example.com/typhoon-manual.pdf",
      size: "4.2 MB",
      updated: "2024-01-14",
      downloads: 543,
      featured: false,
      tags: ["typhoon", "preparation", "manual", "safety"]
    },
    {
      id: 6,
      title: "Earthquake Response Plan",
      description: "Community earthquake safety protocols and building evacuation procedures",
      icon: Earth,
      category: "plans",
      fileUrl: "https://example.com/earthquake-plan.pdf",
      size: "3.5 MB",
      updated: "2024-01-11",
      downloads: 432,
      featured: false,
      tags: ["earthquake", "response", "evacuation", "safety"]
    },
    {
      id: 7,
      title: "Fire Safety Handbook",
      description: "Fire prevention strategies, emergency response, and evacuation procedures",
      icon: Flame,
      category: "guides",
      fileUrl: "https://example.com/fire-safety.pdf",
      size: "2.8 MB",
      updated: "2024-01-09",
      downloads: 321,
      featured: false,
      tags: ["fire", "safety", "prevention", "evacuation"]
    },
    {
      id: 8,
      title: "Rainfall Monitoring Guide",
      description: "Understanding local rainfall patterns, warning systems, and flood risk indicators",
      icon: CloudRain,
      category: "guides",
      fileUrl: "https://example.com/rainfall-monitoring.pdf",
      size: "1.9 MB",
      updated: "2024-01-13",
      downloads: 298,
      featured: false,
      tags: ["rainfall", "monitoring", "flood", "warning"]
    },
    {
      id: 9,
      title: "Community Emergency Plan Template",
      description: "Template for barangays to develop their own emergency response plans",
      icon: FileText,
      category: "templates",
      fileUrl: "https://example.com/community-plan-template.pdf",
      size: "2.1 MB",
      updated: "2024-01-16",
      downloads: 187,
      featured: false,
      tags: ["template", "community", "planning", "barangay"]
    },
    {
      id: 10,
      title: "First Aid Quick Reference",
      description: "Essential first aid procedures and emergency medical response guidelines",
      icon: Shield,
      category: "guides",
      fileUrl: "https://example.com/first-aid-guide.pdf",
      size: "1.5 MB",
      updated: "2024-01-07",
      downloads: 876,
      featured: true,
      tags: ["first aid", "medical", "emergency", "health"]
    },
    {
      id: 11,
      title: "Hazard Mapping Guide",
      description: "Understanding local hazard maps and risk assessment information",
      icon: Map,
      category: "maps",
      fileUrl: "https://example.com/hazard-mapping.pdf",
      size: "5.2 MB",
      updated: "2024-01-05",
      downloads: 234,
      featured: false,
      tags: ["hazard", "mapping", "risk", "assessment"]
    },
    {
      id: 12,
      title: "Emergency Communication Plan",
      description: "Family communication strategies and contact information templates",
      icon: Phone,
      category: "templates",
      fileUrl: "https://example.com/communication-plan.pdf",
      size: "1.8 MB",
      updated: "2024-01-18",
      downloads: 345,
      featured: false,
      tags: ["communication", "family", "emergency", "contacts"]
    }
  ];

  // Use real resources if available, otherwise use sample materials
  const materialsToShow = publishedResources.length > 0 
    ? publishedResources.map(resource => ({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        icon: getIconForCategory(resource.category),
        category: resource.category,
        fileUrl: resource.file_url,
        size: resource.file_size ? formatFileSize(resource.file_size) : 'Unknown',
        updated: new Date(resource.updated_at).toISOString().split('T')[0],
        downloads: resource.download_count,
        featured: resource.featured,
        tags: resource.tags
      }))
    : downloadMaterials;

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'map': return Map;
      case 'guide': return Shield;
      case 'form': return FileText;
      case 'plan': return FileText;
      default: return FileText;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categories = [
    { id: 'all', name: 'All Materials', count: materialsToShow.length },
    { id: 'guides', name: 'Safety Guides', count: materialsToShow.filter(m => m.category === 'guides').length },
    { id: 'maps', name: 'Maps & Routes', count: materialsToShow.filter(m => m.category === 'maps').length },
    { id: 'plans', name: 'Response Plans', count: materialsToShow.filter(m => m.category === 'plans').length },
    { id: 'templates', name: 'Templates', count: materialsToShow.filter(m => m.category === 'templates').length }
  ];

  const filteredMaterials = materialsToShow
    .filter(material => {
      const matchesSearch = 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'updated':
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const featuredMaterials = materialsToShow.filter(m => m.featured);
  const totalDownloads = materialsToShow.reduce((sum, m) => sum + m.downloads, 0);

  // If no resources available, show admin link
  if (publishedResources.length === 0) {
    return (
      <>
        <SEOHead
          title="IEC Materials & Downloads - MDRRMO Pio Duran"
          description="Download essential Information, Education, and Communication materials for disaster preparedness."
        />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-900 mb-8">IEC Materials & Downloads</h1>
              <div className="bg-white rounded-xl shadow-lg p-12">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Materials Available</h2>
                <p className="text-gray-600 mb-6">IEC materials will appear here once uploaded by the admin.</p>
                <Link 
                  to="/admin/resources"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Users className="mr-2" size={16} />
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
        title="IEC Materials & Downloads - MDRRMO Pio Duran"
        description="Download essential Information, Education, and Communication materials for disaster preparedness. Access safety guides, evacuation maps, and emergency procedures."
        keywords="IEC materials, disaster preparedness, safety guides, evacuation maps, emergency procedures, MDRRMO, Pio Duran"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
            <div className="absolute -bottom-10 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-4"></div>
          </div>
          
          <div className="container mx-auto px-6">
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-8 animate-pulse-glow">
                <FileText className="text-blue-950" size={40} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-text-glow">
                IEC Materials & <span className="text-yellow-500">Downloads</span>
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-8"></div>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                Access essential Information, Education, and Communication materials including brochures, guides, and evacuation routes
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <ModernCard variant="glass" className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                    <FileText className="w-6 h-6 text-blue-950" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{materialsToShow.length}</h3>
                  <p className="text-blue-200">Available Materials</p>
                </ModernCard>
                
                <ModernCard variant="glass" className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                    <Download className="w-6 h-6 text-blue-950" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{totalDownloads.toLocaleString()}</h3>
                  <p className="text-blue-200">Total Downloads</p>
                </ModernCard>
                
                <ModernCard variant="glass" className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                    <Star className="w-6 h-6 text-blue-950" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{featuredMaterials.length}</h3>
                  <p className="text-blue-200">Featured Items</p>
                </ModernCard>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-16">
          {/* Search and Filter */}
          <ModernCard variant="glass" className="p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm"
                />
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="title">Sort by Title</option>
                <option value="downloads">Most Downloaded</option>
                <option value="updated">Recently Updated</option>
                <option value="size">File Size</option>
              </select>

              <div className="text-sm text-gray-600 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg px-4">
                {filteredMaterials.length} materials found
              </div>
            </div>
          </ModernCard>

          {/* Featured Materials */}
          {featuredMaterials.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Materials</h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Most important and frequently accessed emergency preparedness materials
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredMaterials.map((material) => {
                  const IconComponent = material.icon;
                  return (
                    <ModernCard key={material.id} variant="interactive" hover className="overflow-hidden">
                      {/* Thumbnail Preview */}
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 text-center">
                        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                          <FileText className="text-blue-950/50" size={32} />
                        </div>
                        <div className="inline-flex items-center gap-1 bg-yellow-500 px-3 py-1 rounded-full">
                          <Star className="w-3 h-3 text-blue-950" />
                          <span className="text-xs font-bold text-blue-950">Featured</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <IconComponent className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-blue-950 leading-tight line-clamp-2">{material.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-blue-950/50">{material.size}</span>
                              <span className="text-xs text-blue-950/50">•</span>
                              <span className="text-xs text-blue-950/50">Updated {material.updated}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-blue-950/70 text-sm mb-6 leading-relaxed line-clamp-3">{material.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Download size={14} />
                            <span>{material.downloads.toLocaleString()} downloads</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                            {material.category}
                          </span>
                        </div>
                        
                        <DownloadButton
                          resourceId={material.id.toString()}
                          resourceTitle={material.title}
                          fileUrl={material.fileUrl}
                          variant="primary"
                          size="md"
                          className="w-full"
                        />
                      </div>
                    </ModernCard>
                  );
                })}
              </div>
            </section>
          )}

          {/* All Materials Grid */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">All IEC Materials</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Complete collection of information, education, and communication materials for disaster preparedness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map((material) => {
                const IconComponent = material.icon;
                return (
                  <ModernCard key={material.id} variant="interactive" hover className="overflow-hidden">
                    {/* Thumbnail Preview */}
                    <div className="bg-gray-100 p-6 text-center">
                      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        <FileText className="text-blue-950/50" size={32} />
                      </div>
                      <p className="text-sm text-blue-950/60 font-medium">PDF Preview</p>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <IconComponent className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-950 leading-tight line-clamp-2">{material.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-blue-950/50">{material.size}</span>
                            <span className="text-xs text-blue-950/50">•</span>
                            <span className="text-xs text-blue-950/50">Updated {material.updated}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-blue-950/70 text-sm mb-6 leading-relaxed line-clamp-3">{material.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Download size={14} />
                          <span>{material.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {material.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                            {material.category}
                          </span>
                        </div>
                      </div>
                      
                      <DownloadButton
                        resourceId={material.id.toString()}
                        resourceTitle={material.title}
                        fileUrl={material.fileUrl}
                        variant="primary"
                        size="md"
                        className="w-full"
                      />
                    </div>
                  </ModernCard>
                );
              })}
            </div>

            {filteredMaterials.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <ModernButton
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  variant="secondary"
                >
                  Clear Filters
                </ModernButton>
              </div>
            )}
          </section>

          {/* Additional Information */}
          <section className="mt-16">
            <ModernCard variant="gradient" className="p-8 text-center">
              <h2 className="text-2xl font-bold text-blue-950 mb-4">Need More Information?</h2>
              <p className="text-blue-950/70 text-lg mb-6 max-w-2xl mx-auto">
                These materials are regularly updated to ensure you have the most current information for community preparedness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ModernButton
                  variant="primary"
                  size="lg"
                  icon={Phone}
                >
                  Request Additional Materials
                </ModernButton>
                <ModernButton
                  variant="secondary"
                  size="lg"
                  icon={Eye}
                >
                  View All Resources
                </ModernButton>
              </div>
            </ModernCard>
          </section>
        </div>
      </div>
    </>
  );
};

export default IECMaterials;