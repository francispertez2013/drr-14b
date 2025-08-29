import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Heart, Shield, Users, Award, CheckCircle, Send, Clock, Star, Target, FileText } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';

const VolunteerProgram: React.FC = () => {
  const { addIncident } = useData();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    skills: '',
    motivation: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit volunteer application as an incident report
      const volunteerData = {
        reporter_name: `${formData.firstName} ${formData.lastName}`,
        contact_number: formData.phone,
        location: formData.address,
        incident_type: 'Volunteer Application',
        description: `Volunteer Application:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Availability: ${formData.availability}
Skills: ${formData.skills}
Motivation: ${formData.motivation}
Emergency Contact: ${formData.emergencyContact} (${formData.emergencyPhone})`,
        urgency: 'LOW' as const,
        status: 'pending' as const
      };

      await addIncident(volunteerData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          availability: '',
          skills: '',
          motivation: '',
          emergencyContact: '',
          emergencyPhone: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: "Community Impact",
      description: "Make a real difference in your community's disaster preparedness and response efforts.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work alongside dedicated professionals and fellow volunteers in meaningful initiatives.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Award,
      title: "Skill Development",
      description: "Gain valuable experience and training in emergency management and disaster response.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Heart,
      title: "Personal Fulfillment",
      description: "Experience the satisfaction of helping others and contributing to public safety.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const requirements = [
    "Must be at least 18 years old",
    "Valid government-issued ID",
    "Good physical and mental health",
    "Willingness to undergo training programs",
    "Ability to commit to regular activities",
    "Pass background check (if required)",
    "Complete volunteer orientation program",
    "Maintain confidentiality of sensitive information"
  ];

  const volunteerRoles = [
    {
      title: "Emergency Response Volunteer",
      description: "Assist in emergency operations, evacuation procedures, and disaster response activities",
      requirements: ["First Aid certification", "Physical fitness", "Communication skills"],
      commitment: "On-call basis during emergencies"
    },
    {
      title: "Community Education Volunteer",
      description: "Help conduct training sessions, workshops, and awareness campaigns in barangays",
      requirements: ["Public speaking skills", "Teaching experience preferred", "Patience with diverse groups"],
      commitment: "2-4 hours per week"
    },
    {
      title: "Administrative Support Volunteer",
      description: "Assist with office tasks, data entry, documentation, and event coordination",
      requirements: ["Computer literacy", "Organizational skills", "Attention to detail"],
      commitment: "4-8 hours per week"
    },
    {
      title: "Technical Support Volunteer",
      description: "Support IT systems, website maintenance, and digital communication platforms",
      requirements: ["Technical skills", "IT experience", "Problem-solving abilities"],
      commitment: "Flexible schedule"
    }
  ];

  const trainingPrograms = [
    "Basic Disaster Risk Reduction and Management",
    "First Aid and CPR Certification",
    "Search and Rescue Techniques",
    "Emergency Communication Protocols",
    "Community Mobilization Strategies",
    "Psychological First Aid",
    "Incident Command System (ICS)",
    "Volunteer Leadership Development"
  ];

  return (
    <>
      <SEOHead
        title="Volunteer Program - MDRRMO Pio Duran"
        description="Join the MDRRMO volunteer program and make a difference in disaster preparedness and emergency response in Pio Duran, Albay."
        keywords="volunteer program, MDRRMO, disaster response volunteers, emergency preparedness, community service, Pio Duran"
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
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 mb-6 animate-pulse-glow">
              <Heart className="w-10 h-10 text-blue-950" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-text-glow">
              Become a <span className="text-yellow-500">Volunteer</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our dedicated team in protecting and serving our community through disaster risk reduction and emergency response efforts.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <ModernCard variant="glass" className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                  <Users className="w-6 h-6 text-blue-950" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
                <p className="text-blue-200">Active Volunteers</p>
              </ModernCard>
              
              <ModernCard variant="glass" className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                  <Shield className="w-6 h-6 text-blue-950" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-blue-200">Training Programs</p>
              </ModernCard>
              
              <ModernCard variant="glass" className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                  <Award className="w-6 h-6 text-blue-950" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
                <p className="text-blue-200">Years of Service</p>
              </ModernCard>
              
              <ModernCard variant="glass" className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 mb-4">
                  <Target className="w-6 h-6 text-blue-950" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">33</h3>
                <p className="text-blue-200">Barangays Served</p>
              </ModernCard>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-blue-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Volunteer with <span className="text-yellow-500">MDRRMO</span>?
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Our volunteer program offers unique opportunities to make a meaningful impact while gaining valuable experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <ModernCard
                  key={index}
                  variant="interactive"
                  hover
                  className="p-6 text-center"
                >
                  <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <benefit.icon className={`${benefit.color}`} size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-3">{benefit.title}</h3>
                  <p className="text-blue-800">{benefit.description}</p>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Roles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Volunteer Opportunities</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
              <p className="text-blue-200 max-w-3xl mx-auto">
                Choose from various volunteer roles that match your skills and availability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {volunteerRoles.map((role, index) => (
                <ModernCard key={index} variant="interactive" hover className="p-8">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">{role.title}</h3>
                  <p className="text-blue-200 mb-6">{role.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {role.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-blue-200 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-blue-700">
                      <div className="flex items-center gap-2 text-yellow-300">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Commitment: {role.commitment}</span>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="py-16 px-4 bg-blue-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Training Programs</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
              <p className="text-blue-200 max-w-3xl mx-auto">
                Comprehensive training programs to equip volunteers with essential skills and knowledge
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingPrograms.map((program, index) => (
                <ModernCard key={index} variant="glass" className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-950 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-white font-medium">{program}</span>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Volunteer <span className="text-yellow-500">Requirements</span>
                </h2>
                <p className="text-xl text-blue-200 mb-8">
                  We welcome passionate individuals who are committed to community service and disaster risk reduction.
                </p>
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-100 text-lg">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <ModernCard variant="gradient" className="p-8 shadow-2xl">
                  <div className="text-blue-950">
                    <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
                    <p className="text-blue-900 mb-6">
                      Join hundreds of volunteers who have already contributed to our community's safety and resilience.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-blue-900">
                        <Users className="w-5 h-5 mr-2" />
                        <span>500+ Active Volunteers</span>
                      </div>
                      <div className="flex items-center text-blue-900">
                        <Shield className="w-5 h-5 mr-2" />
                        <span>50+ Training Programs</span>
                      </div>
                      <div className="flex items-center text-blue-900">
                        <Award className="w-5 h-5 mr-2" />
                        <span>10+ Years of Service</span>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 px-4 bg-blue-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our <span className="text-yellow-500">Volunteer Team</span>
              </h2>
              <p className="text-xl text-blue-200">
                Fill out the form below to start your volunteer journey with MDRRMO
              </p>
            </div>

            <ModernCard variant="glass" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-white font-semibold mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white font-semibold mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-white font-semibold mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availability" className="block text-white font-semibold mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                    >
                      <option value="">Select your availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="flexible">Flexible</option>
                      <option value="emergency-only">Emergency Response Only</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-white font-semibold mb-2">
                      Relevant Skills or Experience
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="e.g., First Aid, Communication, Logistics"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-white font-semibold mb-2">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Emergency contact person"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-white font-semibold mb-2">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-white font-semibold mb-2">
                    Why do you want to volunteer with MDRRMO? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white/90 backdrop-blur-sm"
                    placeholder="Tell us about your motivation to volunteer..."
                  />
                </div>

                <div className="text-center">
                  <ModernButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    variant={isSubmitted ? "success" : "warning"}
                    size="lg"
                    icon={isSubmitted ? CheckCircle : Send}
                    className="px-12"
                  >
                    {isSubmitted ? 'Application Submitted!' : 'Submit Application'}
                  </ModernButton>
                </div>
              </form>
            </ModernCard>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ModernCard variant="gradient" className="p-8">
              <h2 className="text-2xl font-bold text-blue-950 mb-4">Questions About Volunteering?</h2>
              <p className="text-blue-900 mb-6">
                Contact our Volunteer Coordinator for more information about opportunities and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ModernButton
                  onClick={() => window.open('tel:(052)234-5678', '_self')}
                  variant="primary"
                  size="lg"
                  icon={Phone}
                >
                  Call (052) 234-5678
                </ModernButton>
                <ModernButton
                  onClick={() => window.open('mailto:volunteers@pioduran.gov.ph', '_self')}
                  variant="secondary"
                  size="lg"
                  icon={Mail}
                >
                  Email Us
                </ModernButton>
              </div>
            </ModernCard>
          </div>
        </section>
      </div>
    </>
  );
};

export default VolunteerProgram;