import React from 'react';
import { MapPin, Users, Phone, Search, Filter, ChevronDown, ChevronUp, Home, Navigation, ExternalLink, Shield, Clock, AlertTriangle } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import ModernCard from '../../components/ModernCard';
import ModernButton from '../../components/ModernButton';

// Import the existing component from Templates
import EvacuationListTemplate from '../../../Templates/EvacuationList';

const EvacuationList: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Evacuation Centers List - MDRRMO Pio Duran"
        description="Complete list of designated evacuation centers in Pio Duran, Albay. Find your nearest evacuation center with capacity, location, and contact information."
        keywords="evacuation centers, Pio Duran, emergency shelters, disaster preparedness, MDRRMO, Albay"
      />
      
      <div className="pt-20">
        <EvacuationListTemplate />
      </div>
    </>
  );
};

export default EvacuationList;