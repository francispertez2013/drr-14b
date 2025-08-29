import React, { useState, useEffect } from 'react';
import { Backpack, Droplets, Utensils, Radio, Battery, Lightbulb, Shield, ChevronFirst as FirstAid, FileText, Phone, Coins, Clock, CheckCircle, User, Home, MapPin, Users, Baby, Accessibility, Dog, Calendar, Download, Printer, Share2, Plus, Minus, Languages, AlertTriangle, Wind, Waves, Mountain, CloudRain } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';

const GoBagBuilder: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [profile, setProfile] = useState({
    householdSize: 1,
    infants: 0,
    seniors: 0,
    pwd: 0,
    pets: 0,
    hazards: {
      typhoon: false,
      flood: false,
      earthquake: false,
      ashfall: false
    }
  });
  const [lastChecked, setLastChecked] = useState(new Date().toISOString().split('T')[0]);

  const t = {
    en: {
      title: "What's in your Go-Bag?",
      subtitle: "Prepare for emergencies with a well-stocked go-bag",
      essentials: "Essential Items",
      buildList: "Build My List",
      print: "Print",
      download: "Download PDF",
      tagalog: "Tagalog Version",
      householdSize: "Household Size",
      infants: "Infants/Toddlers",
      seniors: "Seniors",
      pwd: "Persons with Disabilities",
      pets: "Pets",
      hazards: "Hazard Add-Ons",
      typhoon: "Typhoon",
      flood: "Flood",
      earthquake: "Earthquake",
      ashfall: "Ashfall",
      calculate: "Calculate Quantities",
      checklist: "Personalized Checklist",
      estimatedWeight: "Estimated Pack Weight",
      reminders: "Set Reminders",
      lastChecked: "Last checked",
      saveProfile: "Save Profile",
      share: "Share",
      profile: "Profiles & Special Needs",
      infantsNeeds: "Infants/Toddlers Needs",
      seniorsNeeds: "Seniors/PWD Needs",
      petsNeeds: "Pets Needs"
    },
    tl: {
      title: "Ano ang nasa iyong Go-Bag?",
      subtitle: "Maghanda para sa mga emergency gamit ang maayos na go-bag",
      essentials: "Mahahalagang Bagay",
      buildList: "Gawin ang Aking Listahan",
      print: "I-print",
      download: "I-download ang PDF",
      tagalog: "Bersyon sa Tagalog",
      householdSize: "Laki ng Pamilya",
      infants: "Sanggol/Mga Bata",
      seniors: "Matatanda",
      pwd: "Mga May Kapansanan",
      pets: "Mga Alagang Hayop",
      hazards: "Mga Dagdag na Babala",
      typhoon: "Bagyo",
      flood: "Baha",
      earthquake: "Lindol",
      ashfall: "Abo",
      calculate: "Kalkulahin ang Dami",
      checklist: "Personalisadong Listahan",
      estimatedWeight: "Tinatayang Bigat ng Bag",
      reminders: "Itakda ang Paalala",
      lastChecked: "Huling tiningnan",
      saveProfile: "I-save ang Profile",
      share: "Ibahagi",
      profile: "Mga Profile at Espesyal na Pangangailangan",
      infantsNeeds: "Mga Pangangailangan ng Sanggol/Bata",
      seniorsNeeds: "Mga Pangangailangan ng Matatanda/May Kapansanan",
      petsNeeds: "Mga Pangangailangan ng Mga Alagang Hayop"
    }
  };

  const essentials = [
    { name: "Water", quantity: "3 L/day × 3 days", icon: <Droplets className="w-5 h-5" /> },
    { name: "Food", quantity: "2,100–2,400 kcal/day", icon: <Utensils className="w-5 h-5" /> },
    { name: "Medications", quantity: "7-day supply", icon: <FirstAid className="w-5 h-5" /> },
    { name: "IDs", quantity: "Photocopies", icon: <FileText className="w-5 h-5" /> },
    { name: "Cash", quantity: "Small bills/coins", icon: <Coins className="w-5 h-5" /> },
    { name: "Flashlight", quantity: "With batteries", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Powerbank", quantity: "Charged", icon: <Battery className="w-5 h-5" /> },
    { name: "Radio", quantity: "AM/FM", icon: <Radio className="w-5 h-5" /> },
    { name: "Whistle", quantity: "1 per person", icon: <Shield className="w-5 h-5" /> },
    { name: "Clothing", quantity: "2–3 sets", icon: <span className="text-lg">👕</span> }
  ];

  const specialNeeds = {
    infants: [
      "Diapers (12–18/day)", "Formula & scoops", "Bottles", "Pacifier", "Small toys", "Blanket"
    ],
    seniors: [
      "Week-long meds", "BP monitor", "Spare eyeglasses", "Assistive device batteries", "Hearing-aid batteries"
    ],
    pets: [
      "3-day food", "Extra water", "Leash/carrier", "Vaccine record", "Photo with owner"
    ]
  };

  const hazardAddOns = {
    typhoon: ["Tarpaulin sheet", "Extra duct tape", "Waterproof pouches"],
    flood: ["Dry bags", "Whistle", "Rope", "Float aid"],
    earthquake: ["Gloves", "Hard hat", "Shoes by bedside"],
    ashfall: ["N95 masks", "Goggles", "Plastic covers"]
  };

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleHazard = (hazard: string) => {
    setProfile(prev => ({
      ...prev,
      hazards: {
        ...prev.hazards,
        [hazard]: !prev.hazards[hazard as keyof typeof prev.hazards]
      }
    }));
  };

  const calculateQuantities = () => {
    const totalPeople = profile.householdSize + profile.infants + profile.seniors + profile.pwd;
    const waterQuantity = totalPeople * 3 * 3; // 3L/day * 3 days
    const foodCalories = totalPeople * 2250 * 3; // Average 2250 kcal/day * 3 days
    return { waterQuantity, foodCalories, totalPeople };
  };

  const { waterQuantity, foodCalories, totalPeople } = calculateQuantities();
  const estimatedWeight = waterQuantity * 1 + (foodCalories / 1000) * 0.5 + 5; // Approximate weight calculation

  const downloadChecklist = () => {
    const checklistContent = `
72-HOUR GO-BAG CHECKLIST
========================

Household Profile:
- Total People: ${totalPeople}
- Household Size: ${profile.householdSize}
- Infants/Toddlers: ${profile.infants}
- Seniors: ${profile.seniors}
- PWD: ${profile.pwd}
- Pets: ${profile.pets}

Essential Items:
${essentials.map(item => `- ${item.name}: ${item.quantity}`).join('\n')}

Calculated Quantities:
- Water: ${waterQuantity} L (for ${totalPeople} people)
- Food: ${Math.round(foodCalories)} kcal (3-day supply)
- Estimated Weight: ${Math.round(estimatedWeight)} kg per person

Special Needs Items:
${profile.infants > 0 ? `\nInfants/Toddlers:\n${specialNeeds.infants.map(item => `- ${item}`).join('\n')}` : ''}
${profile.seniors > 0 ? `\nSeniors/PWD:\n${specialNeeds.seniors.map(item => `- ${item}`).join('\n')}` : ''}
${profile.pets > 0 ? `\nPets:\n${specialNeeds.pets.map(item => `- ${item}`).join('\n')}` : ''}

Hazard-Specific Add-Ons:
${Object.entries(profile.hazards).filter(([_, enabled]) => enabled).map(([hazard, _]) => 
  `\n${hazard.charAt(0).toUpperCase() + hazard.slice(1)}:\n${hazardAddOns[hazard as keyof typeof hazardAddOns].map(item => `- ${item}`).join('\n')}`
).join('')}

Last Checked: ${lastChecked}
Generated: ${new Date().toLocaleString()}

---
MDRRMO Pio Duran - Emergency Preparedness Guide
    `;
    
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `go-bag-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHead
        title="Go-Bag Builder - Emergency Kit Planner | MDRRMO Pio Duran"
        description="Build your personalized 72-hour emergency go-bag with our interactive planner. Customize for your household size and special needs."
        keywords="go bag, emergency kit, disaster preparedness, 72 hour kit, emergency supplies, MDRRMO, Pio Duran"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-20">
        {/* Language Toggle */}
        <div className="fixed top-24 right-4 z-40">
          <ModernButton
            onClick={() => setLanguage(language === 'en' ? 'tl' : 'en')}
            variant="warning"
            size="sm"
            icon={Languages}
          >
            {language === 'en' ? 'TL' : 'EN'}
          </ModernButton>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
          </div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 mb-6 animate-pulse-glow">
              <Backpack className="w-10 h-10 text-blue-950" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-text-glow">
              {t[language].title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t[language].subtitle}
            </p>
            
            {/* Quick Essentials Checklist */}
            <ModernCard variant="glass" className="p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">{t[language].essentials}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {essentials.map((item, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 mb-2 mx-auto">
                      {item.icon}
                    </div>
                    <p className="text-white text-xs font-medium">{item.name}</p>
                  </div>
                ))}
              </div>
            </ModernCard>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <ModernButton variant="warning" size="lg" icon={Plus}>
                {t[language].buildList}
              </ModernButton>
              <ModernButton variant="secondary" size="lg" icon={Printer}>
                {t[language].print}
              </ModernButton>
              <ModernButton variant="secondary" size="lg" icon={Download} onClick={downloadChecklist}>
                {t[language].download}
              </ModernButton>
            </div>
          </div>
        </section>

        {/* Interactive Go-Bag Builder */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <ModernCard variant="glass" className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6">
                <h2 className="text-3xl font-bold text-yellow-500">72-Hour Go-Bag Builder</h2>
                <p className="text-yellow-200">Customize your emergency kit based on your household needs</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Household Profile */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Household Profile
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'householdSize', label: t[language].householdSize, min: 1 },
                        { key: 'infants', label: t[language].infants, min: 0 },
                        { key: 'seniors', label: t[language].seniors, min: 0 },
                        { key: 'pwd', label: t[language].pwd, min: 0 },
                        { key: 'pets', label: t[language].pets, min: 0 }
                      ].map(({ key, label, min }) => (
                        <div key={key}>
                          <label className="block text-white font-medium mb-2">
                            {label}: {profile[key as keyof typeof profile] as number}
                          </label>
                          <div className="flex items-center gap-3">
                            <ModernButton
                              onClick={() => updateProfile(key, Math.max(min, (profile[key as keyof typeof profile] as number) - 1))}
                              variant="secondary"
                              size="sm"
                              icon={Minus}
                            />
                            <span className="text-xl font-bold text-white w-8 text-center">
                              {profile[key as keyof typeof profile] as number}
                            </span>
                            <ModernButton
                              onClick={() => updateProfile(key, (profile[key as keyof typeof profile] as number) + 1)}
                              variant="secondary"
                              size="sm"
                              icon={Plus}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hazard Add-Ons */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {t[language].hazards}
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { key: 'typhoon', label: t[language].typhoon, icon: Wind },
                        { key: 'flood', label: t[language].flood, icon: Waves },
                        { key: 'earthquake', label: t[language].earthquake, icon: Mountain },
                        { key: 'ashfall', label: t[language].ashfall, icon: CloudRain }
                      ].map(({ key, label, icon: Icon }) => (
                        <label key={key} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={profile.hazards[key as keyof typeof profile.hazards]}
                            onChange={() => toggleHazard(key)}
                            className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
                          />
                          <Icon className="w-5 h-5 text-white" />
                          <span className="text-white font-medium">{label}</span>
                        </label>
                      ))}
                    </div>
                    
                    <ModernButton
                      variant="warning"
                      size="lg"
                      className="w-full mt-6"
                    >
                      {t[language].calculate}
                    </ModernButton>
                  </div>
                </div>
                
                {/* Results */}
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-950 mb-4">{t[language].checklist}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <ModernCard className="p-4">
                      <h4 className="font-bold text-blue-950 mb-2">Water</h4>
                      <p className="text-2xl font-bold text-yellow-500">{waterQuantity} L</p>
                      <p className="text-sm text-gray-600">for {totalPeople} people</p>
                    </ModernCard>
                    
                    <ModernCard className="p-4">
                      <h4 className="font-bold text-blue-950 mb-2">Food</h4>
                      <p className="text-2xl font-bold text-yellow-500">{Math.round(foodCalories)} kcal</p>
                      <p className="text-sm text-gray-600">3-day supply</p>
                    </ModernCard>
                    
                    <ModernCard className="p-4">
                      <h4 className="font-bold text-blue-950 mb-2">{t[language].estimatedWeight}</h4>
                      <p className="text-2xl font-bold text-yellow-500">{Math.round(estimatedWeight)} kg</p>
                      <p className="text-sm text-gray-600">per person</p>
                    </ModernCard>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-blue-900 font-medium mb-2">
                        {t[language].lastChecked}: {lastChecked}
                      </label>
                      <input
                        type="date"
                        value={lastChecked}
                        onChange={(e) => setLastChecked(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <ModernButton
                        variant="secondary"
                        size="sm"
                        icon={Calendar}
                      >
                        {t[language].reminders}
                      </ModernButton>
                      <ModernButton
                        variant="warning"
                        size="sm"
                        icon={Share2}
                      >
                        {t[language].share}
                      </ModernButton>
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        </section>

        {/* Profiles & Special Needs */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t[language].profile}
              </h2>
              <p className="text-xl text-blue-200">
                Special considerations for different household members
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Infants */}
              <ModernCard variant="interactive" className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
                      <Baby className="w-6 h-6 text-blue-950" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-500">{t[language].infantsNeeds}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {specialNeeds.infants.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModernCard>
              
              {/* Seniors/PWD */}
              <ModernCard variant="interactive" className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
                      <Accessibility className="w-6 h-6 text-blue-950" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-500">{t[language].seniorsNeeds}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {specialNeeds.seniors.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModernCard>
              
              {/* Pets */}
              <ModernCard variant="interactive" className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
                      <Dog className="w-6 h-6 text-blue-950" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-500">{t[language].petsNeeds}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {specialNeeds.pets.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModernCard>
            </div>
          </div>
        </section>

        {/* Hazard Add-Ons Details */}
        <section className="py-16 px-4 bg-blue-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hazard-Specific Add-Ons
              </h2>
              <p className="text-xl text-blue-200">
                Additional items for specific disaster scenarios
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(hazardAddOns).map(([hazard, items]) => (
                <ModernCard key={hazard} variant="interactive" className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {hazard === 'typhoon' && <Wind className="w-6 h-6 text-blue-900" />}
                    {hazard === 'flood' && <Waves className="w-6 h-6 text-blue-900" />}
                    {hazard === 'earthquake' && <Mountain className="w-6 h-6 text-blue-900" />}
                    {hazard === 'ashfall' && <CloudRain className="w-6 h-6 text-blue-900" />}
                    <h3 className="text-lg font-bold text-blue-900 capitalize">{t[language][hazard as keyof typeof t[typeof language]]}</h3>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-500">•</span>
                        <span className="text-blue-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Preparedness Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Emergency <span className="text-yellow-500">Preparedness Tips</span>
              </h2>
              <p className="text-xl text-blue-200">
                Essential recommendations for staying safe during emergencies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-950">
                    <User className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950">Family Plan</h3>
                </div>
                <p className="text-blue-900">
                  Create a family emergency plan with meeting points and communication strategies. Practice evacuation routes regularly.
                </p>
              </ModernCard>

              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500">
                    <Home className="w-5 h-5 text-blue-950" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950">Home Preparation</h3>
                </div>
                <p className="text-blue-900">
                  Secure heavy furniture and appliances to walls. Install smoke detectors and fire extinguishers in key locations.
                </p>
              </ModernCard>

              <ModernCard variant="gradient" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-950">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950">Know Your Area</h3>
                </div>
                <p className="text-blue-900">
                  Identify evacuation routes and flood zones in your area. Locate the nearest evacuation centers and emergency services.
                </p>
              </ModernCard>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GoBagBuilder;