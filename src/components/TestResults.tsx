import React from 'react';
import { Download, RotateCcw, GraduationCap, BookOpen, Headphones, PenTool, MessageSquare } from 'lucide-react';
import { StudentInfo } from '../types/test';
import { SEMFScoringEngine } from '../utils/semfScoring';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TestResultsProps {
  answers: Record<number, string>;
  studentInfo: StudentInfo | null;
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ answers, studentInfo, onRestart }) => {
  const calculateRawScores = () => {
    // Grammar & Vocabulary (Questions 1-20) - tie-breaker only
    const grammarAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 1 && parseInt(id) <= 20);
    const grammarScore = Math.floor(grammarAnswers.length * 0.8); // Simulate 80% score
    
    // Reading & Writing (Questions 21-44)
    const readingWritingAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 21 && parseInt(id) <= 44);
    const readingWritingScore = Math.floor(readingWritingAnswers.length * 0.75); // Simulate 75% score
    
    // Listening (Questions 45-56)
    const listeningAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 45 && parseInt(id) <= 56);
    const listeningScore = Math.floor(listeningAnswers.length * 0.8); // Simulate 80% score
    
    return {
      GrammarVocabulary: Math.min(grammarScore, 20),
      ReadingWriting: Math.min(readingWritingScore, 24),
      Listening: Math.min(listeningScore, 12)
    };
  };

  const rawScores = calculateRawScores();
  const semfResult = SEMFScoringEngine.calculateSEMFLevel(rawScores);

  const getSEMFLevelColor = (level: string) => {
    switch (level) {
      case 'S5': return { bg: 'bg-purple-500', text: 'text-purple-600', bgLight: 'bg-purple-50', border: 'border-purple-300' };
      case 'S4': return { bg: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-300' };
      case 'S3': return { bg: 'bg-teal-500', text: 'text-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-300' };
      case 'S2': return { bg: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-yellow-50', border: 'border-yellow-300' };
      case 'S1': return { bg: 'bg-red-500', text: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-300' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', bgLight: 'bg-gray-50', border: 'border-gray-300' };
    }
  };

  const overallLevelColor = getSEMFLevelColor(semfResult.overallLevel);

  const handleDownload = async () => {
    try {
      // Get the results container element (everything above the action buttons)
      const resultsElement = document.querySelector('.results-container');
      if (!resultsElement) {
        throw new Error('Results container not found');
      }

      // Get the actual dimensions of the results container
      const containerRect = resultsElement.getBoundingClientRect();
      const containerWidth = resultsElement.scrollWidth;
      const containerHeight = resultsElement.scrollHeight;

      // Create high-quality canvas from the results container
      const canvas = await html2canvas(resultsElement as HTMLElement, {
        scale: 2, // High resolution for crisp text
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f9fafb', // Match page background
        width: containerWidth,
        height: containerHeight,
        logging: false, // Reduce console output
        removeContainer: true // Clean capture
      });

      // Convert canvas dimensions to PDF points (72 points = 1 inch, 96 pixels = 1 inch)
      const pixelsToPoints = 72 / 96;
      const pdfWidth = (canvas.width * pixelsToPoints) / 2; // Divide by 2 because we used 2x scale
      const pdfHeight = (canvas.height * pixelsToPoints) / 2;
      
      // Add small margins for professional appearance
      const margin = 20; // 20 points margin
      const finalPdfWidth = pdfWidth + (margin * 2);
      const finalPdfHeight = pdfHeight + (margin * 2);
      
      // Create PDF with custom dimensions matching the screenshot area
      const pdf = new jsPDF({
        orientation: finalPdfWidth > finalPdfHeight ? 'landscape' : 'portrait',
        unit: 'pt', // Use points for precise control
        format: [finalPdfWidth, finalPdfHeight] // Custom page size
      });
      
      // Convert canvas to image and add to PDF at exact size
      const imgData = canvas.toDataURL('image/png', 0.95); // High quality PNG
      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
      
      // Save the PDF
      const fileName = `Sha_Bridge_College_SEMF_Assessment_${studentInfo?.lastName || 'Student'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or check your browser permissions.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="results-container">
          {/* Professional Header for PDF */}
          <div className="bg-white border-b-4 border-blue-800 mb-12">
            <div className="flex items-center justify-between px-8 py-8">
              <div className="flex items-center gap-6">
                <img 
                  src="https://copilot.microsoft.com/th/id/BCO.1671fab5-16d2-493f-999e-daadcc92b63b.png" 
                  alt="Sha Bridge College Logo" 
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }} 
                />
                <GraduationCap className="w-16 h-16 text-blue-900 hidden" />
                <div>
                  <h1 className="text-3xl font-bold text-blue-900 mb-1">Sha Bridge College</h1>
                  <p className="text-lg text-gray-700 font-medium">English Language Assessment Center</p>
                  <p className="text-sm text-gray-600">Official SEMF Proficiency Report</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Assessment Date</div>
                <div className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
                <div className="text-sm text-gray-600 mt-1">Academic Year 2025</div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Assessment Complete!</h2>
            <p className="text-xl text-gray-600">ShaBridge English Mastery Framework (SEMF) Results</p>
          </div>

          {/* Main Score Display */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10 mb-8 text-center">
            <div className="mb-6">
              <div className={`inline-block ${overallLevelColor.bg} text-white px-8 py-4 rounded-full font-bold text-3xl shadow-lg mb-4`}>
                SEMF {semfResult.overallLevel}
              </div>
              <div className="text-xl text-gray-600 max-w-2xl mx-auto">
                {semfResult.descriptions[semfResult.overallLevel]}
              </div>
            </div>

            {/* Skills Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {semfResult.skills.map((skill) => {
                const skillColor = getSEMFLevelColor(skill.level);
                return (
                  <div key={skill.skill} className={`${skillColor.bgLight} ${skillColor.border} border-2 rounded-xl p-6`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {skill.skill.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600">Raw Score: {skill.rawScore}</span>
                      <span className={`font-bold text-lg ${skillColor.text}`}>SEMF {skill.level}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Normalized: {skill.normalizedScore}/50
                      {skill.tieBreakerApplied && (
                        <span className="ml-2 text-amber-600 font-medium">(Tie-breaker applied)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tie-breaker Skill */}
            <div className="mt-6 bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-2">Tie-breaker Skill</h3>
              <div className="text-amber-700">
                <span className="font-medium">{semfResult.tieBreakerSkill.skill.replace(/([A-Z])/g, ' $1').trim()}: </span>
                {semfResult.tieBreakerSkill.rawScore}/20 (Normalized: {semfResult.tieBreakerSkill.normalizedScore}/50)
              </div>
              <p className="text-sm text-amber-600 mt-2">
                Used to determine final level when scores are near boundaries
              </p>
            </div>
          </div>

          {/* Student Information Display */}
          {studentInfo && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Name:</span> {studentInfo.firstName} {studentInfo.lastName}</div>
                  <div><span className="font-medium">Email:</span> {studentInfo.email}</div>
                  <div><span className="font-medium">Phone:</span> {studentInfo.phoneNumber}</div>
                  <div><span className="font-medium">Self-Assessed Level:</span> {studentInfo.level}</div>
                  <div><span className="font-medium">Test Date:</span> {new Date().toLocaleDateString()}</div>
                  <div><span className="font-medium">Assessment Type:</span> SEMF Core Skills</div>
                </div>
              </div>
            </div>
          )}

          {/* SEMF Level Guide */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">SEMF Level Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* S1 */}
              <div className={`border-2 rounded-xl p-6 transition-all ${
                semfResult.overallLevel === 'S1' ? 'border-red-400 bg-red-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-xl font-bold text-gray-800">S1</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold text-lg">Basic User</div>
                  <div className="text-sm">0-15 points</div>
                  <div className="text-xs mt-2">Understands and uses simple expressions</div>
                </div>
              </div>

              {/* S2 */}
              <div className={`border-2 rounded-xl p-6 transition-all ${
                semfResult.overallLevel === 'S2' ? 'border-yellow-400 bg-yellow-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-xl font-bold text-gray-800">S2</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold text-lg">Elementary User</div>
                  <div className="text-sm">16-25 points</div>
                  <div className="text-xs mt-2">Can handle short, routine exchanges</div>
                </div>
              </div>

              {/* S3 */}
              <div className={`border-2 rounded-xl p-6 transition-all ${
                semfResult.overallLevel === 'S3' ? 'border-teal-400 bg-teal-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                  <span className="text-xl font-bold text-gray-800">S3</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold text-lg">Independent User</div>
                  <div className="text-sm">26-33 points</div>
                  <div className="text-xs mt-2">Can deal with most everyday situations</div>
                </div>
              </div>

              {/* S4 */}
              <div className={`border-2 rounded-xl p-6 transition-all ${
                semfResult.overallLevel === 'S4' ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-xl font-bold text-gray-800">S4</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold text-lg">Proficient User</div>
                  <div className="text-sm">34-42 points</div>
                  <div className="text-xs mt-2">Can interact fluently and spontaneously</div>
                </div>
              </div>

              {/* S5 */}
              <div className={`border-2 rounded-xl p-6 transition-all ${
                semfResult.overallLevel === 'S5' ? 'border-purple-400 bg-purple-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-xl font-bold text-gray-800">S5</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold text-lg">Mastery</div>
                  <div className="text-sm">43-50 points</div>
                  <div className="text-xs mt-2">Can express ideas precisely in complex situations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src="https://copilot.microsoft.com/th/id/BCO.1671fab5-16d2-493f-999e-daadcc92b63b.png" alt="Sha Bridge College Logo" className="w-6 h-6" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
              <GraduationCap className="w-6 h-6 text-blue-900 hidden" />
              <span className="text-lg font-bold text-blue-900">Sha Bridge College SEMF Assessment Center</span>
            </div>
            <p className="text-blue-700">
              This SEMF assessment provides an indication of your current English proficiency level using our proprietary framework.
              For official certification or academic placement, please contact our Academic Affairs office.
            </p>
          </div>
        </div>

        {/* Action Buttons - Outside results container so they won't be captured in PDF */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            Take Test Again
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download SEMF Report
          </button>
        </div>
      </div>
    </div>
  );
};