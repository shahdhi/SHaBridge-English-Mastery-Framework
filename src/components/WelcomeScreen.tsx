import React, { useState } from 'react';
import { BookOpen, Clock, Users, Shield, CheckCircle2, GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
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
              <p className="text-sm text-gray-600">English Language Assessment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          {/* Removed the center logo container */}
          <h1 className="text-5xl font-bold text-white mb-6">Core Skills English Proficiency Test</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A comprehensive assessment of your English language skills including grammar, vocabulary, 
            listening, reading, and writing components designed to evaluate your academic readiness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">60 Minutes Total</h3>
            <p className="text-gray-600 leading-relaxed">
              Three carefully timed sections with automatic progression and secure submission protocols
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">3 Core Sections</h3>
            <p className="text-gray-600 leading-relaxed">
              Grammar & Vocabulary, Reading & Writing Assessment, Listening Comprehension
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Academic Integrity</h3>
            <p className="text-gray-600 leading-relaxed">
              Secure testing environment with comprehensive academic honesty protocols
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Test Structure & Requirements</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Core Grammar & Vocabulary</h3>
                <p className="text-blue-700 font-medium mb-3">20 minutes • 20 questions</p>
                <p className="text-gray-700 leading-relaxed">
                  Multiple choice assessment covering essential grammar structures and professional vocabulary. 
                  Tests conditional forms, tenses, prepositions, and workplace terminology critical for academic and professional success.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Core Reading & Writing</h3>
                <p className="text-purple-700 font-medium mb-3">35 minutes • 24 questions</p>
                <p className="text-gray-700 leading-relaxed">
                  Story continuation, sentence ordering, reading comprehension, and structured written responses 
                  showcasing critical thinking and argumentation skills in academic and professional contexts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Core Listening</h3>
                <p className="text-green-700 font-medium mb-3">10 minutes • 12 questions</p>
                <p className="text-gray-700 leading-relaxed">
                  Listen to various audio recordings including library announcements, conversations, voicemails, and travel reports. 
                  Demonstrate comprehension of key information, main ideas, and specific details in different contexts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-8 mb-10">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-amber-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-4">Sha Bridge College Academic Integrity Statement</h3>
              <div className="text-amber-800 space-y-3 leading-relaxed">
                <p className="font-medium">By proceeding with this assessment, I hereby declare that:</p>
                <ul className="list-disc list-inside space-y-2 ml-6 text-amber-700">
                  <li>I will complete this test independently without assistance from others</li>
                  <li>I will not use any unauthorized materials, including AI writing tools or translation software</li>
                  <li>My responses will be my own original work and reflect my current English proficiency</li>
                  <li>I understand that academic dishonesty may result in test invalidation and disciplinary action</li>
                  <li>I will not share test content with others or discuss questions during or after the assessment</li>
                  <li>I acknowledge that this test is being conducted under Sha Bridge College academic standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center gap-4 justify-center mb-8">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-6 h-6 text-blue-800 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="agree" className="text-white text-lg font-medium">
              I have read and agree to the academic integrity statement and testing conditions
            </label>
          </div>

          <button
            onClick={onStart}
            disabled={!agreed}
            className={`px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 ${
              agreed
                ? 'bg-white hover:bg-gray-50 text-blue-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed shadow-md'
            }`}
          >
            {agreed ? (
              <span className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7" />
                Begin English Proficiency Assessment
              </span>
            ) : (
              'Please accept the academic integrity terms to continue'
            )}
          </button>

          <p className="text-blue-200 mt-6 text-sm">
            Administered by Sha Bridge College • Academic Year 2025
          </p>
        </div>
      </div>
    </div>
  );
};
