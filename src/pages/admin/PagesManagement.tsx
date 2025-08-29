import React, { useState } from 'react';
import { 
  Plus, 
  Info, 
  Globe, 
  BarChart3,
  FileText,
  Users,
  Calendar,
  Eye
} from 'lucide-react';
import EnhancedPageManager from '../../components/EnhancedPageManager';
import PageInformationPanel from '../../components/PageInformationPanel';
import ModernCard from '../../components/ModernCard';
import { templatePagesInfo, getPageStats } from '../../utils/pageInformation';

const PagesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manager' | 'templates' | 'analytics'>('manager');
  const stats = getPageStats();

  const templateStats = {
    totalTemplates: templatePagesInfo.length,
    activeTemplates: templatePagesInfo.filter(p => p.status === 'active').length,
    categories: [...new Set(templatePagesInfo.map(p => p.category))].length,
    avgFeatures: Math.round(
      templatePagesInfo.reduce((sum, page) => sum + page.features.length, 0) / templatePagesInfo.length
    )
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-gray-600">Manage dynamic pages and template implementations</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ModernCard variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Template Pages</p>
              <p className="text-3xl font-bold text-gray-900">{templateStats.totalTemplates}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {templateStats.activeTemplates} active templates
          </div>
        </ModernCard>

        <ModernCard variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{templateStats.categories}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </ModernCard>

        <ModernCard variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Features</p>
              <p className="text-3xl font-bold text-gray-900">{templateStats.avgFeatures}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </ModernCard>

        <ModernCard variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AA Compliant</p>
              <p className="text-3xl font-bold text-gray-900">
                {templatePagesInfo.filter(p => p.accessibility.level === 'AA').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'manager', label: 'Page Manager', icon: FileText },
            { id: 'templates', label: 'Template Pages', icon: Globe },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'manager' && (
        <EnhancedPageManager variant="admin" showStats={true} />
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Template Pages Information</h3>
                <p className="text-blue-800 mb-4">
                  These are pre-built template pages that have been implemented from the Templates folder. 
                  Each page is fully functional, responsive, and production-ready.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Available Templates:</h4>
                    <ul className="space-y-1 text-blue-700">
                      {templatePagesInfo.map(page => (
                        <li key={page.id} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {page.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Categories:</h4>
                    <ul className="space-y-1 text-blue-700">
                      {[...new Set(templatePagesInfo.map(p => p.category))].map(category => (
                        <li key={category} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <PageInformationPanel variant="full" showStats={true} />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <ModernCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Pages Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{templateStats.totalTemplates}</div>
                <div className="text-sm text-gray-600">Total Template Pages</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{templateStats.activeTemplates}</div>
                <div className="text-sm text-gray-600">Active Templates</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{templateStats.categories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Template Categories Distribution</h4>
              <div className="space-y-3">
                {[...new Set(templatePagesInfo.map(p => p.category))].map(category => {
                  const count = templatePagesInfo.filter(p => p.category === category).length;
                  const percentage = Math.round((count / templatePagesInfo.length) * 100);
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{count} pages</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ModernCard>

          <ModernCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Mobile Optimization</h4>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {templatePagesInfo.filter(p => p.performance.mobileOptimized).length}/{templatePagesInfo.length}
                  </div>
                  <div className="text-sm text-gray-600">Pages Mobile Optimized</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Accessibility Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">WCAG AA:</span>
                    <span className="font-medium text-blue-600">
                      {templatePagesInfo.filter(p => p.accessibility.level === 'AA').length} pages
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">WCAG AAA:</span>
                    <span className="font-medium text-green-600">
                      {templatePagesInfo.filter(p => p.accessibility.level === 'AAA').length} pages
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default PagesManagement;