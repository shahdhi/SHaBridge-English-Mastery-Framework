import React from 'react';
import { Clock, GraduationCap } from 'lucide-react';

interface TestHeaderProps {
  currentSection: number;
  totalSections: number;
  sectionTitle: string;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  currentSection,
  totalSections,
  sectionTitle
}) => {
  return (
    <div className="bg-white border-b-2 border-blue-800 px-6 py-5 sticky top-0 z-10 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              src="https://copilot.microsoft.com/th/id/BCO.1671fab5-16d2-493f-999e-daadcc92b63b.png" 
              alt="Sha Bridge College Logo" 
              className="w-12 h-12" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} 
            />
            <GraduationCap className="w-8 h-8 text-blue-900 hidden" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sha Bridge College</h1>
              <p className="text-sm text-gray-600">English Proficiency Assessment</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-gray-700">
            <span className="text-lg font-medium">Section {currentSection + 1} of {totalSections}:</span>
            <span className="text-lg font-bold text-blue-800">{sectionTitle}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-600 font-medium">Progress</div>
            <div className="text-lg font-bold text-gray-800">{currentSection + 1}/{totalSections}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
