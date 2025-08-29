import React, { useState } from 'react';
import { 
  Info, 
  Users, 
  Calendar, 
  Tag, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  Code, 
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { templatePagesInfo, getPageInfo, getPagesByCategory, getAllCategories, getPageStats } from '../utils/pageInformation';
import type { PageInfo } from '../utils/pageInformation';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

interface PageInformationPanelProps {
  currentPage?: string;
  variant?: 'full' | 'compact' | 'sidebar';
  showStats?: boolean;
}

const PageInformationPanel: React.FC<PageInformationPanelProps> = ({
  currentPage,
  variant = 'full',
  showStats = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'accessibility'>('overview');

  const pageInfo = currentPage ? getPageInfo(currentPage) : null;
  const categories = getAllCategories();
  const stats = getPageStats();

  const filteredPages = templatePagesInfo.filter(page => {
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.seoKeywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessibilityColor = (level: string) => {
    return level === 'AAA' ? 'text-green-600' : 'text-blue-600';
  };

  if (variant === 'compact' && pageInfo) {
    return (
      <ModernCard variant="glass" className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Info className="w-6 h-6 text-blue-950" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{pageInfo.title}</h3>
            <p className="text-blue-200 text-sm mb-3">{pageInfo.description}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(pageInfo.status)}`}>
                {pageInfo.status}
              </span>
              <span className="text-xs text-blue-300">v{pageInfo.version}</span>
              <span className="text-xs text-blue-300">Updated {pageInfo.lastUpdated}</span>
            </div>
          </div>
        </div>
      </ModernCard>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-6">
        {/* Current Page Info */}
        {pageInfo && (
          <ModernCard variant="glass" className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Current Page</h3>
            <div className="space-y-3">
              <div>
                <span className="text-blue-300 text-sm">Category:</span>
                <p className="text-white font-medium">{pageInfo.category}</p>
              </div>
              <div>
                <span className="text-blue-300 text-sm">Version:</span>
                <p className="text-white font-medium">v{pageInfo.version}</p>
              </div>
              <div>
                <span className="text-blue-300 text-sm">Status:</span>
                <span className={`text-xs px-2 py-1 rounded ml-2 ${getStatusColor(pageInfo.status)}`}>
                  {pageInfo.status}
                </span>
              </div>
              <div>
                <span className="text-blue-300 text-sm">Accessibility:</span>
                <span className={`font-medium ml-2 ${getAccessibilityColor(pageInfo.accessibility.level)}`}>
                  WCAG {pageInfo.accessibility.level}
                </span>
              </div>
            </div>
          </ModernCard>
        )}

        {/* Quick Stats */}
        {showStats && (
          <ModernCard variant="glass" className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Page Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300">Total Pages:</span>
                <span className="text-white font-bold">{stats.totalPages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Active:</span>
                <span className="text-green-400 font-bold">{stats.activePages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Categories:</span>
                <span className="text-white font-bold">{stats.categories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Avg Features:</span>
                <span className="text-white font-bold">{stats.avgFeatures}</span>
              </div>
            </div>
          </ModernCard>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Template Pages Information</h1>
          <p className="text-blue-200">Comprehensive overview of all template pages and their specifications</p>
        </div>
      </div>

      {/* Stats Overview */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ModernCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Total Pages</p>
                <p className="text-3xl font-bold text-white">{stats.totalPages}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </ModernCard>

          <ModernCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Active Pages</p>
                <p className="text-3xl font-bold text-green-400">{stats.activePages}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </ModernCard>

          <ModernCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Categories</p>
                <p className="text-3xl font-bold text-white">{stats.categories}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Tag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </ModernCard>

          <ModernCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">AA Compliant</p>
                <p className="text-3xl font-bold text-white">{stats.accessibilityCompliance}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Filters */}
      <ModernCard variant="glass" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/90 backdrop-blur-sm"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/90 backdrop-blur-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="text-sm text-white flex items-center justify-center">
            {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </ModernCard>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPages.map((page) => (
          <ModernCard key={page.id} variant="interactive" hover className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{page.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="text-blue-200 text-sm mb-3">{page.description}</p>
                  <div className="flex items-center gap-4 text-xs text-blue-300">
                    <span>v{page.version}</span>
                    <span>•</span>
                    <span>{page.category}</span>
                    <span>•</span>
                    <span>Updated {page.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <ModernButton
                    onClick={() => window.open(`/${page.slug}`, '_blank')}
                    variant="ghost"
                    size="sm"
                    icon={ExternalLink}
                  />
                  <button
                    onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
                    className="text-white hover:text-yellow-500 transition-colors"
                  >
                    {expandedPage === page.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{page.features.length}</div>
                  <div className="text-xs text-blue-300">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{page.targetAudience.length}</div>
                  <div className="text-xs text-blue-300">Audiences</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getAccessibilityColor(page.accessibility.level)}`}>
                    {page.accessibility.level}
                  </div>
                  <div className="text-xs text-blue-300">WCAG</div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedPage === page.id && (
                <div className="border-t border-blue-700 pt-4 animate-fade-in">
                  {/* Tabs */}
                  <div className="flex space-x-4 mb-4">
                    {[
                      { id: 'overview', label: 'Overview', icon: Info },
                      { id: 'technical', label: 'Technical', icon: Code },
                      { id: 'accessibility', label: 'Accessibility', icon: Shield }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-yellow-500 text-blue-950'
                            : 'text-blue-300 hover:text-white hover:bg-blue-700'
                        }`}
                      >
                        <tab.icon size={14} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-4">
                    {activeTab === 'overview' && (
                      <>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {page.features.map((feature, index) => (
                              <span key={index} className="text-xs bg-blue-700 text-blue-200 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Target Audience</h4>
                          <div className="flex flex-wrap gap-2">
                            {page.targetAudience.map((audience, index) => (
                              <span key={index} className="text-xs bg-yellow-500 text-blue-950 px-2 py-1 rounded">
                                {audience}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'technical' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2">Performance</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-blue-300">Load Time:</span>
                                <span className="text-white">{page.performance.loadTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">Mobile:</span>
                                <span className={page.performance.mobileOptimized ? 'text-green-400' : 'text-red-400'}>
                                  {page.performance.mobileOptimized ? 'Yes' : 'No'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">Offline:</span>
                                <span className={page.performance.offlineSupport ? 'text-green-400' : 'text-red-400'}>
                                  {page.performance.offlineSupport ? 'Yes' : 'No'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-white mb-2">Technical</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-blue-300">Framework:</span>
                                <span className="text-white">{page.technicalSpecs.framework}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">Responsive:</span>
                                <span className={page.technicalSpecs.responsive ? 'text-green-400' : 'text-red-400'}>
                                  {page.technicalSpecs.responsive ? 'Yes' : 'No'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">Interactive:</span>
                                <span className={page.technicalSpecs.interactive ? 'text-green-400' : 'text-red-400'}>
                                  {page.technicalSpecs.interactive ? 'Yes' : 'No'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'accessibility' && (
                      <>
                        <div>
                          <h4 className="font-semibold text-white mb-2">
                            WCAG {page.accessibility.level} Compliance
                          </h4>
                          <div className="space-y-2">
                            {page.accessibility.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-blue-200 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ModernCard>
        ))}
      </div>

      {/* All Pages Directory */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">All Template Pages</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredPages.map((page) => (
            <ModernCard key={page.id} variant="interactive" className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{page.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      v{page.version}
                    </span>
                  </div>
                  
                  <p className="text-blue-200 mb-3">{page.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-blue-300">
                    <span className="flex items-center gap-1">
                      <Tag size={14} />
                      {page.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {page.targetAudience.length} audiences
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={14} />
                      {page.features.length} features
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {page.lastUpdated}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <ModernButton
                    onClick={() => window.open(`/${page.slug}`, '_blank')}
                    variant="warning"
                    size="sm"
                    icon={ExternalLink}
                  >
                    Visit
                  </ModernButton>
                  <button
                    onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
                    className="text-white hover:text-yellow-500 transition-colors"
                  >
                    {expandedPage === page.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageInformationPanel;