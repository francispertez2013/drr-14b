import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, Phone, Mail, MapPin, Users, Calendar, FileText, HelpCircle, Search, Filter, Send } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';
import { useData } from '../../contexts/DataContext';

const FAQ: React.FC = () => {
  const { addIncident } = useData();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit contact form as an incident report
      const contactData = {
        reporter_name: contactForm.name,
        contact_number: contactForm.email,
        location: 'FAQ Contact Form',
        incident_type: 'General Inquiry',
        description: `FAQ Contact Form Submission:

Name: ${contactForm.name}
Email: ${contactForm.email}
Message: ${contactForm.message}`,
        urgency: 'LOW' as const,
        status: 'pending' as const
      };

      await addIncident(contactData);
      alert('Message sent successfully! We will respond soon.');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqCategories = [
    {
      id: 1,
      title: "General Information",
      icon: HelpCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      questions: [
        {
          id: 1,
          question: "What is MDRRMO and what does it do?",
          answer: "The Municipal Disaster Risk Reduction and Management Office (MDRRMO) is responsible for implementing disaster risk reduction and management programs, ensuring community preparedness, coordinating emergency response efforts, and facilitating recovery operations during and after disasters.",
          tags: ["mdrrmo", "general", "purpose"]
        },
        {
          id: 2,
          question: "Who leads the MDRRMO?",
          answer: "The MDRRMO is headed by the Municipal Mayor who serves as the Chairman, with the Municipal Administrator or designated officer serving as the Vice Chairman. The office is managed by a dedicated MDRRMO Officer.",
          tags: ["leadership", "organization", "structure"]
        },
        {
          id: 3,
          question: "What are the operating hours of MDRRMO?",
          answer: "The MDRRMO operates 24/7 for emergency response. Regular office hours are from 8:00 AM to 5:00 PM, Monday through Friday. During typhoon season or when alerts are raised, the office operates on extended hours.",
          tags: ["hours", "schedule", "availability"]
        }
      ]
    },
    {
      id: 2,
      title: "Emergency Response",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      questions: [
        {
          id: 4,
          question: "What should I do during a typhoon warning?",
          answer: "Stay informed through official channels, secure loose items outside your home, prepare emergency supplies (water, food, medications), identify safe areas in your home, and follow evacuation orders if issued. Never attempt to cross flooded areas.",
          tags: ["typhoon", "warning", "safety", "preparation"]
        },
        {
          id: 5,
          question: "How do I report an emergency?",
          answer: "Call our 24/7 Emergency Hotline at 911 or (052) 234-5678. You can also report emergencies through our barangay disaster risk reduction and management committees or visit our office in person during regular hours.",
          tags: ["emergency", "reporting", "hotline", "contact"]
        },
        {
          id: 6,
          question: "When should I evacuate?",
          answer: "Evacuate immediately when ordered by local authorities. Early evacuation is recommended when: a storm signal #3 or higher is raised, floodwaters reach knee level, landslides are imminent, or when authorities issue a mandatory evacuation order.",
          tags: ["evacuation", "when", "orders", "safety"]
        }
      ]
    },
    {
      id: 3,
      title: "Preparedness & Training",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      questions: [
        {
          id: 7,
          question: "How can I prepare my family for disasters?",
          answer: "Create a family emergency plan, assemble an emergency kit with essentials (water, food, medications, flashlight, radio), identify evacuation routes and meeting points, and stay informed about local hazards and warning systems.",
          tags: ["family", "preparation", "planning", "kit"]
        },
        {
          id: 8,
          question: "Does MDRRMO conduct training programs?",
          answer: "Yes, we regularly conduct disaster preparedness training, first aid certification courses, emergency response drills, and community awareness programs. Check our announcements for upcoming training schedules or contact us to request training for your organization.",
          tags: ["training", "programs", "courses", "education"]
        },
        {
          id: 9,
          question: "What is included in an emergency kit?",
          answer: "An emergency kit should include: 1 gallon of water per person per day for at least 3 days, non-perishable food for 3 days, battery-powered radio, flashlight with extra batteries, first aid kit, medications, copies of important documents, cash, and emergency contact information.",
          tags: ["emergency kit", "supplies", "preparation", "essentials"]
        }
      ]
    },
    {
      id: 4,
      title: "Community Involvement",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      questions: [
        {
          id: 10,
          question: "How can I volunteer with MDRRMO?",
          answer: "We welcome volunteers with various skills including medical professionals, engineers, logistics coordinators, and community organizers. Contact our office to inquire about current volunteer opportunities and requirements. Volunteers must attend orientation and training programs.",
          tags: ["volunteer", "community", "involvement", "opportunities"]
        },
        {
          id: 11,
          question: "Can our organization partner with MDRRMO?",
          answer: "Yes, we actively seek partnerships with NGOs, private organizations, schools, and community groups. Partnerships can involve training programs, resource sharing, emergency response coordination, and community awareness campaigns. Contact us to discuss potential collaboration opportunities.",
          tags: ["partnership", "collaboration", "organizations", "cooperation"]
        },
        {
          id: 12,
          question: "How can barangays improve disaster preparedness?",
          answer: "Barangays can establish Barangay Disaster Risk Reduction and Management Committees (BDRRMC), conduct regular drills, maintain evacuation centers, update community hazard maps, ensure early warning systems are functional, and coordinate with MDRRMO for training and resources.",
          tags: ["barangay", "preparedness", "bdrrmc", "community"]
        }
      ]
    },
    {
      id: 5,
      title: "Contact & Services",
      icon: Phone,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      questions: [
        {
          id: 13,
          question: "Where is the MDRRMO office located?",
          answer: "Our office is located at the Municipal Hall Complex, Ground Floor, Barangay Caratagan, Pio Duran, Albay. We are open Monday through Friday from 8:00 AM to 5:00 PM. During emergencies, we operate 24/7 from our Emergency Operations Center.",
          tags: ["location", "office", "address", "hours"]
        },
        {
          id: 14,
          question: "How can I request disaster-related documents?",
          answer: "You can request certificates, clearances, and other disaster-related documents by visiting our office during regular hours, calling our main line at (052) 234-5678, or sending an email to mdrrmo@pioduran.gov.ph. Some documents may be available online through our portal.",
          tags: ["documents", "certificates", "requests", "services"]
        },
        {
          id: 15,
          question: "What emergency alerts and warnings do you provide?",
          answer: "We provide typhoon warnings, flood alerts, landslide advisories, earthquake information, fire safety notices, and other hazard-specific alerts through our hotline, text alerts, social media, local radio stations, and barangay alert systems. We follow PAGASA and PHIVOLCS advisories.",
          tags: ["alerts", "warnings", "notifications", "information"]
        }
      ]
    }
  ];

  // Flatten all questions for search
  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, categoryId: category.id, categoryTitle: category.title }))
  );

  // Filter questions based on search and category
  const filteredQuestions = allQuestions.filter(question => {
    const matchesSearch = searchTerm === '' || 
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || question.categoryId.toString() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const emergencyContacts = [
    {
      service: "Emergency Hotline",
      number: "911",
      icon: Phone,
      description: "24/7 Emergency Response"
    },
    {
      service: "MDRRMO Office",
      number: "(052) 234-5678",
      icon: Phone,
      description: "General Inquiries"
    },
    {
      service: "Email",
      number: "mdrrmo@pioduran.gov.ph",
      icon: Mail,
      description: "Non-urgent Communications"
    },
    {
      service: "Office Location",
      number: "Municipal Hall, Pio Duran",
      icon: MapPin,
      description: "Visit Us"
    }
  ];

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions - MDRRMO Pio Duran"
        description="Find answers to common questions about disaster preparedness, emergency response, and MDRRMO services in Pio Duran, Albay."
        keywords="FAQ, disaster preparedness, emergency response, MDRRMO services, Pio Duran, frequently asked questions"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
            <div className="absolute -bottom-10 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-4"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 mb-6 animate-pulse-glow">
              <HelpCircle className="w-10 h-10 text-blue-950" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-text-glow">
              Frequently Asked <span className="text-yellow-500">Questions</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers to common questions about disaster preparedness, emergency response, and MDRRMO services.
            </p>
            
            {/* Emergency Contacts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {emergencyContacts.map((contact, index) => (
                <ModernCard key={index} variant="glass" className="p-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-3 mx-auto">
                    <contact.icon className="w-5 h-5 text-blue-950" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{contact.service}</h3>
                  <p className="text-yellow-300 text-xs mb-1">{contact.number}</p>
                  <p className="text-blue-200 text-xs">{contact.description}</p>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <ModernCard variant="glass" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                >
                  <option value="all">All Categories</option>
                  {faqCategories.map(category => (
                    <option key={category.id} value={category.id.toString()}>{category.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-4 text-center text-white">
                {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} found
              </div>
            </ModernCard>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {searchTerm || selectedCategory !== 'all' ? (
              // Show filtered results
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
                  <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
                </div>
                
                {filteredQuestions.map((faq) => (
                  <ModernCard key={faq.id} variant="interactive" className="overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full p-6 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {faq.categoryTitle}
                          </span>
                        </div>
                        <span className="text-gray-900 text-lg">{faq.question}</span>
                      </div>
                      {openQuestion === faq.id ? (
                        <ChevronUp size={20} className="text-blue-600 ml-4" />
                      ) : (
                        <ChevronDown size={20} className="text-blue-600 ml-4" />
                      )}
                    </button>
                    {openQuestion === faq.id && (
                      <div className="px-6 pb-6 text-gray-700 bg-gray-50 leading-relaxed animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </ModernCard>
                ))}
                
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                    <p className="text-blue-200 mb-6">Try adjusting your search terms or browse all categories</p>
                    <ModernButton
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      variant="warning"
                    >
                      Clear Search
                    </ModernButton>
                  </div>
                )}
              </div>
            ) : (
              // Show categories
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Disaster Preparedness <span className="text-yellow-500">Resources</span>
                  </h2>
                  <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                    Browse our comprehensive FAQ sections to learn more about disaster risk reduction and emergency management.
                  </p>
                </div>

                {faqCategories.map((category) => (
                  <ModernCard key={category.id} variant="interactive" className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6">
                      <div className="flex items-center gap-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.bgColor}`}>
                          <category.icon className={category.color} size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-yellow-500">{category.title}</h3>
                          <p className="text-blue-200">{category.questions.length} questions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {category.questions.map((faq) => (
                          <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                            <button
                              onClick={() => toggleQuestion(faq.id)}
                              className="w-full py-4 text-left font-semibold flex justify-between items-center hover:bg-blue-50 rounded-lg px-4 transition-colors"
                            >
                              <span className="text-lg text-gray-900 flex-1 mr-4">
                                {faq.question}
                              </span>
                              <div className="text-blue-600">
                                {openQuestion === faq.id ? 
                                  <ChevronUp className="w-6 h-6" /> : 
                                  <ChevronDown className="w-6 h-6" />
                                }
                              </div>
                            </button>
                            
                            {openQuestion === faq.id && (
                              <div className="px-4 pb-6 -mt-4 animate-fade-in">
                                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-yellow-500">
                                  <p className="text-blue-900 leading-relaxed">{faq.answer}</p>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {faq.tags.map((tag, tagIndex) => (
                                      <span key={tagIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ModernCard>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Emergency Preparedness Tips */}
        <section className="py-16 px-4 bg-blue-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quick <span className="text-yellow-500">Preparedness Tips</span>
              </h2>
              <p className="text-xl text-blue-200">
                Essential reminders for staying safe during emergencies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-950 flex-shrink-0">
                    <Calendar className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Stay Informed</h3>
                    <p className="text-blue-900">
                      Monitor official weather advisories and emergency alerts. Keep a battery-powered radio for updates during power outages.
                    </p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Emergency Kit</h3>
                    <p className="text-blue-900">
                      Prepare a 72-hour emergency kit with water, non-perishable food, medications, flashlight, and important documents.
                    </p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Evacuation Plan</h3>
                    <p className="text-blue-900">
                      Identify evacuation routes and meeting points with your family. Know the location of your nearest evacuation center.
                    </p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-950 flex-shrink-0">
                    <Users className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Community Network</h3>
                    <p className="text-blue-900">
                      Stay connected with neighbors and community emergency response teams. Help vulnerable members of your community.
                    </p>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <ModernCard variant="gradient" className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-950 mb-6">
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-blue-950 mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-blue-800 mb-6">
                  Our team is ready to help you with any disaster preparedness or emergency management concerns.
                </p>
                <div className="flex flex-col gap-3">
                  <ModernButton
                    onClick={() => window.open('tel:(052)234-5678', '_self')}
                    variant="primary"
                    size="md"
                    icon={Phone}
                    className="w-full"
                  >
                    Call (052) 234-5678
                  </ModernButton>
                  <ModernButton
                    onClick={() => window.open('mailto:mdrrmo@pioduran.gov.ph', '_self')}
                    variant="secondary"
                    size="md"
                    icon={Mail}
                    className="w-full"
                  >
                    Email Us
                  </ModernButton>
                </div>
              </ModernCard>

              {/* Quick Contact Form */}
              <ModernCard variant="glass" className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/90 backdrop-blur-sm resize-none"
                      placeholder="Your question or message"
                    />
                  </div>
                  <ModernButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    variant="warning"
                    size="lg"
                    icon={Send}
                    className="w-full"
                  >
                    Send Message
                  </ModernButton>
                </form>
              </ModernCard>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;