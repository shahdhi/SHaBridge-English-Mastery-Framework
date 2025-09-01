import React from 'react';
import { BookOpen, FileText, Headphones } from 'lucide-react';

interface SectionProgressBarProps {
  currentSection: number;
  totalSections: number;
}

export const SectionProgressBar: React.FC<SectionProgressBarProps> = ({
  currentSection,
  totalSections
}) => {
  const sections = [
    { 
      id: 'grammar-vocabulary', 
      title: 'Core Grammar & Vocabulary', 
      icon: BookOpen,
      color: 'blue'
    },
    { 
      id: 'reading-writing', 
      title: 'Core Reading & Writing', 
      icon: FileText,
      color: 'purple'
    },
    { 
      id: 'listening', 
      title: 'Core Listening', 
      icon: Headphones,
      color: 'green'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === currentSection;
            const isCompleted = index < currentSection;
            
            return (
              <div key={section.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive
                      ? `bg-${section.color}-500 border-${section.color}-500 text-white`
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`font-medium transition-colors duration-300 ${
                      isActive ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {section.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Section {index + 1} of {totalSections}
                    </div>
                  </div>
                </div>
                
                {/* Progress line */}
                {index < sections.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};