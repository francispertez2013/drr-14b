// Page information and metadata for template pages

export interface PageInfo {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  features: string[];
  targetAudience: string[];
  lastUpdated: string;
  version: string;
  status: 'active' | 'maintenance' | 'beta';
  dependencies: string[];
  relatedPages: string[];
  seoKeywords: string[];
  accessibility: {
    level: 'AA' | 'AAA';
    features: string[];
  };
  performance: {
    loadTime: string;
    mobileOptimized: boolean;
    offlineSupport: boolean;
  };
  technicalSpecs: {
    framework: string;
    responsive: boolean;
    interactive: boolean;
    dataSource: string;
  };
}

export const templatePagesInfo: PageInfo[] = [
  {
    id: 'evacuation-generator',
    title: 'Emergency Evacuation Planning System',
    slug: 'evacuation-generator',
    description: 'Interactive tool for generating customized evacuation routes and comprehensive emergency plans for buildings and facilities.',
    category: 'Planning Tools',
    features: [
      'Interactive route generation',
      'Customizable building parameters',
      'PDF export functionality',
      'Safety compliance validation',
      'Real-time calculations',
      'Print-ready formats',
      'Share functionality'
    ],
    targetAudience: [
      'Building managers',
      'Safety officers',
      'Emergency coordinators',
      'Facility administrators',
      'DRRM planners'
    ],
    lastUpdated: '2025-01-21',
    version: '2.0.0',
    status: 'active',
    dependencies: [
      'jsPDF library',
      'html2canvas',
      'Modern browsers with SVG support'
    ],
    relatedPages: [
      'evacuation-centers',
      'disaster-planning',
      'emergency-procedures'
    ],
    seoKeywords: [
      'evacuation planning',
      'emergency routes',
      'building safety',
      'disaster preparedness',
      'evacuation generator',
      'emergency planning tool'
    ],
    accessibility: {
      level: 'AA',
      features: [
        'Keyboard navigation',
        'Screen reader support',
        'High contrast mode',
        'Focus indicators',
        'Alternative text for images'
      ]
    },
    performance: {
      loadTime: '< 2 seconds',
      mobileOptimized: true,
      offlineSupport: false
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Client-side calculations'
    }
  },
  {
    id: 'evacuation-centers',
    title: 'Evacuation Centers Directory',
    slug: 'evacuation-centers',
    description: 'Complete directory of designated evacuation centers in Pio Duran with capacity, location, and contact information.',
    category: 'Public Information',
    features: [
      'Interactive center listings',
      'Google Maps integration',
      'Search and filter functionality',
      'Capacity information',
      'Contact details',
      'Facility descriptions',
      'Barangay organization'
    ],
    targetAudience: [
      'General public',
      'Residents',
      'Tourists',
      'Emergency responders',
      'Local officials'
    ],
    lastUpdated: '2025-01-21',
    version: '1.5.0',
    status: 'active',
    dependencies: [
      'Google Maps API',
      'Geolocation services'
    ],
    relatedPages: [
      'evacuation-generator',
      'emergency-procedures',
      'disaster-planning'
    ],
    seoKeywords: [
      'evacuation centers',
      'emergency shelters',
      'Pio Duran',
      'disaster preparedness',
      'emergency facilities',
      'evacuation sites'
    ],
    accessibility: {
      level: 'AA',
      features: [
        'Keyboard navigation',
        'Screen reader support',
        'Alternative text',
        'Focus management',
        'Color contrast compliance'
      ]
    },
    performance: {
      loadTime: '< 1.5 seconds',
      mobileOptimized: true,
      offlineSupport: true
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Static data with external map integration'
    }
  },
  {
    id: 'iec-materials',
    title: 'IEC Materials & Downloads',
    slug: 'iec-materials',
    description: 'Information, Education, and Communication materials including safety guides, evacuation maps, and emergency procedures.',
    category: 'Resources',
    features: [
      'Document library',
      'Download tracking',
      'Search functionality',
      'Category filtering',
      'Featured materials',
      'File size information',
      'Update notifications'
    ],
    targetAudience: [
      'General public',
      'Students',
      'Educators',
      'Community leaders',
      'Emergency responders'
    ],
    lastUpdated: '2025-01-21',
    version: '3.0.0',
    status: 'active',
    dependencies: [
      'Supabase database',
      'File storage system',
      'Download manager'
    ],
    relatedPages: [
      'resources',
      'disaster-planning',
      'emergency-procedures'
    ],
    seoKeywords: [
      'IEC materials',
      'disaster preparedness',
      'safety guides',
      'evacuation maps',
      'emergency procedures',
      'educational materials'
    ],
    accessibility: {
      level: 'AAA',
      features: [
        'Full keyboard navigation',
        'Screen reader optimization',
        'Alternative formats',
        'High contrast support',
        'Text scaling support'
      ]
    },
    performance: {
      loadTime: '< 2 seconds',
      mobileOptimized: true,
      offlineSupport: true
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Supabase database with real-time updates'
    }
  },
  {
    id: 'council-staff',
    title: 'Council & Staff Directory',
    slug: 'council-staff',
    description: 'Meet the Municipal Disaster Risk Reduction and Management Council members and MDRRMO staff.',
    category: 'About',
    features: [
      'Organizational hierarchy',
      'Staff profiles',
      'Contact information',
      'Role descriptions',
      'Department structure',
      'Expandable details',
      'Photo gallery'
    ],
    targetAudience: [
      'General public',
      'Government officials',
      'Media',
      'Researchers',
      'Partner organizations'
    ],
    lastUpdated: '2025-01-21',
    version: '2.1.0',
    status: 'active',
    dependencies: [
      'Supabase database',
      'Image optimization',
      'Contact management system'
    ],
    relatedPages: [
      'about',
      'contact',
      'services-detail'
    ],
    seoKeywords: [
      'MDRRMC',
      'MDRRMO staff',
      'disaster management council',
      'Pio Duran officials',
      'emergency management team',
      'organizational structure'
    ],
    accessibility: {
      level: 'AA',
      features: [
        'Keyboard navigation',
        'Screen reader support',
        'Focus management',
        'Alternative text for photos',
        'Semantic HTML structure'
      ]
    },
    performance: {
      loadTime: '< 1.8 seconds',
      mobileOptimized: true,
      offlineSupport: true
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Supabase database with fallback data'
    }
  },
  {
    id: 'volunteer-program',
    title: 'Volunteer Program',
    slug: 'volunteer',
    description: 'Join the MDRRMO volunteer program and make a difference in disaster preparedness and emergency response.',
    category: 'Community Engagement',
    features: [
      'Volunteer application form',
      'Program benefits overview',
      'Role descriptions',
      'Training programs list',
      'Requirements checklist',
      'Contact integration',
      'Application tracking'
    ],
    targetAudience: [
      'Community volunteers',
      'Students',
      'Professionals',
      'Retirees',
      'Community organizations'
    ],
    lastUpdated: '2025-01-21',
    version: '1.8.0',
    status: 'active',
    dependencies: [
      'Form validation system',
      'Email notifications',
      'Database integration'
    ],
    relatedPages: [
      'about',
      'council-staff',
      'contact'
    ],
    seoKeywords: [
      'volunteer program',
      'MDRRMO volunteers',
      'disaster response volunteers',
      'emergency preparedness',
      'community service',
      'volunteer opportunities'
    ],
    accessibility: {
      level: 'AA',
      features: [
        'Form accessibility',
        'Keyboard navigation',
        'Screen reader support',
        'Error handling',
        'Progress indicators'
      ]
    },
    performance: {
      loadTime: '< 1.5 seconds',
      mobileOptimized: true,
      offlineSupport: false
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Form submission to database'
    }
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    slug: 'faq',
    description: 'Find answers to common questions about disaster preparedness, emergency response, and MDRRMO services.',
    category: 'Support',
    features: [
      'Categorized questions',
      'Search functionality',
      'Expandable answers',
      'Contact form integration',
      'Emergency contacts',
      'Quick tips section',
      'Mobile-optimized interface'
    ],
    targetAudience: [
      'General public',
      'New residents',
      'Students',
      'Researchers',
      'Media'
    ],
    lastUpdated: '2025-01-21',
    version: '2.2.0',
    status: 'active',
    dependencies: [
      'Search functionality',
      'Contact form system',
      'Content management'
    ],
    relatedPages: [
      'contact',
      'emergency-procedures',
      'disaster-planning'
    ],
    seoKeywords: [
      'FAQ',
      'disaster preparedness',
      'emergency response',
      'MDRRMO services',
      'frequently asked questions',
      'help center'
    ],
    accessibility: {
      level: 'AAA',
      features: [
        'Full keyboard navigation',
        'Screen reader optimization',
        'High contrast support',
        'Text scaling',
        'Focus management'
      ]
    },
    performance: {
      loadTime: '< 1.2 seconds',
      mobileOptimized: true,
      offlineSupport: true
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Static content with dynamic search'
    }
  },
  {
    id: 'go-bag-builder',
    title: 'Go-Bag Builder - Emergency Kit Planner',
    slug: 'go-bag-builder',
    description: 'Interactive tool for building personalized 72-hour emergency go-bags based on household size and special needs.',
    category: 'Planning Tools',
    features: [
      'Household profiling',
      'Customizable calculations',
      'Multi-language support',
      'Special needs considerations',
      'Hazard-specific add-ons',
      'PDF export',
      'Checklist generation',
      'Weight estimation'
    ],
    targetAudience: [
      'Families',
      'Individuals',
      'Community groups',
      'Emergency preparedness educators',
      'Disaster response teams'
    ],
    lastUpdated: '2025-01-21',
    version: '3.1.0',
    status: 'active',
    dependencies: [
      'Local storage',
      'PDF generation',
      'Multi-language support'
    ],
    relatedPages: [
      'emergency-procedures',
      'disaster-planning',
      'iec-materials'
    ],
    seoKeywords: [
      'go bag',
      'emergency kit',
      'disaster preparedness',
      '72 hour kit',
      'emergency supplies',
      'family preparedness',
      'emergency planning'
    ],
    accessibility: {
      level: 'AA',
      features: [
        'Keyboard navigation',
        'Screen reader support',
        'Language switching',
        'Form accessibility',
        'Visual indicators'
      ]
    },
    performance: {
      loadTime: '< 1.8 seconds',
      mobileOptimized: true,
      offlineSupport: true
    },
    technicalSpecs: {
      framework: 'React + TypeScript',
      responsive: true,
      interactive: true,
      dataSource: 'Client-side calculations with local storage'
    }
  }
];

export const getPageInfo = (slug: string): PageInfo | null => {
  return templatePagesInfo.find(page => page.slug === slug) || null;
};

export const getPagesByCategory = (category: string): PageInfo[] => {
  return templatePagesInfo.filter(page => page.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(templatePagesInfo.map(page => page.category))];
};

export const getRelatedPages = (slug: string): PageInfo[] => {
  const page = getPageInfo(slug);
  if (!page) return [];
  
  return templatePagesInfo.filter(p => 
    page.relatedPages.includes(p.slug) || 
    p.relatedPages.includes(slug) ||
    (p.category === page.category && p.slug !== slug)
  );
};

export const searchPages = (query: string): PageInfo[] => {
  const searchTerm = query.toLowerCase();
  return templatePagesInfo.filter(page =>
    page.title.toLowerCase().includes(searchTerm) ||
    page.description.toLowerCase().includes(searchTerm) ||
    page.seoKeywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
    page.features.some(feature => feature.toLowerCase().includes(searchTerm))
  );
};

export const getPageStats = () => {
  const totalPages = templatePagesInfo.length;
  const activePages = templatePagesInfo.filter(p => p.status === 'active').length;
  const categories = getAllCategories().length;
  const avgFeatures = Math.round(
    templatePagesInfo.reduce((sum, page) => sum + page.features.length, 0) / totalPages
  );

  return {
    totalPages,
    activePages,
    categories,
    avgFeatures,
    lastUpdated: Math.max(...templatePagesInfo.map(p => new Date(p.lastUpdated).getTime())),
    accessibilityCompliance: templatePagesInfo.filter(p => p.accessibility.level === 'AA').length
  };
};