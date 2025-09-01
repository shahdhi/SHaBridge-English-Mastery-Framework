import React, { useState, useCallback, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StudentInfoForm } from './components/StudentInfoForm';
import { TestHeader } from './components/TestHeader';
import { SingleQuestionView } from './components/SingleQuestionView';
import { ListeningSection } from './components/ListeningSection';
import { ReadingPassageView } from './components/ReadingPassageView';
import { TestResults } from './components/TestResults';
import { SectionProgressBar } from './components/SectionProgressBar';
import { ListeningQuestionView } from './components/ListeningQuestionView';
import { useTimer } from './hooks/useTimer';
import { testSections } from './data/testData';
import { StudentInfo, Question } from './types/test';

type TestPhase = 'welcome' | 'student-info' | 'testing' | 'complete';

function App() {
  const [phase, setPhase] = useState<TestPhase>('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentListeningGroup, setCurrentListeningGroup] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  // Scroll to top when section or question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection, currentQuestion, currentListeningGroup, phase]);

  // Add warning message when user tries to refresh or close during test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phase === 'testing') {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
        return 'Are you sure you want to leave? Your test progress will be lost.';
      }
    };

    if (phase === 'testing') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [phase]);

  // Total test time: 70 minutes (4200 seconds)
  const handleTimeUp = useCallback(() => {
    setPhase('complete');
  }, []);

  const { timeLeft, isActive, start, reset } = useTimer(4200, handleTimeUp);

  const handleStartTest = () => {
    setPhase('student-info');
  };

  const handleStudentInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
    setPhase('testing');
    start();
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getCurrentQuestion = (): Question | null => {
    const currentSectionData = testSections[currentSection];
    if (!currentSectionData) return null;

    // For reading passage section, handle differently
    if (currentSectionData.id === 'reading-writing' && currentQuestion >= 20) {
      return null; // Will show reading passage view
    }

    return currentSectionData.questions[currentQuestion] || null;
  };

  const handleNextQuestion = () => {
    const currentSectionData = testSections[currentSection];
    
    // Special handling for listening section
    if (currentSectionData.id === 'listening') {
      if (currentListeningGroup < 3) { // 4 groups total (0-3)
        setCurrentListeningGroup(currentListeningGroup + 1);
      } else {
        handleNextSection();
      }
      return;
    }
    
    // Special handling for reading-writing section
    if (currentSectionData.id === 'reading-writing') {
      if (currentQuestion < 19) {
        // Still in individual questions (story continuation + sentence ordering)
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentQuestion === 19) {
        // Move to reading passage view
        setCurrentQuestion(20);
      } else {
        // From reading passage, move to next section
        handleNextSection();
      }
    } else {
      // Regular section handling
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < currentSectionData.questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        handleNextSection();
      }
    }
  };

  const handlePreviousQuestion = () => {
    const currentSectionData = testSections[currentSection];
    
    // Special handling for listening section
    if (currentSectionData.id === 'listening') {
      if (currentListeningGroup > 0) {
        setCurrentListeningGroup(currentListeningGroup - 1);
      } else {
        handlePreviousSection();
      }
      return;
    }
    
    // Special handling for reading-writing section
    if (currentSectionData.id === 'reading-writing') {
      if (currentQuestion === 20) {
        // From reading passage back to last individual question
        setCurrentQuestion(19);
      } else if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        handlePreviousSection();
      }
    } else {
      // Regular section handling
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        handlePreviousSection();
      }
    }
  };

  const handleNextSection = () => {
    if (currentSection < testSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      setCurrentListeningGroup(0);
    } else {
      setPhase('complete');
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const prevSectionData = testSections[currentSection - 1];
      setCurrentQuestion(prevSectionData.questions.length - 1);
      setCurrentListeningGroup(0);
    }
  };

  const handleSubmitTest = () => {
    setPhase('complete');
  };

  const handleRestart = () => {
    setPhase('welcome');
    setCurrentSection(0);
    setCurrentQuestion(0);
    setCurrentListeningGroup(0);
    setAnswers({});
    setStudentInfo(null);
    reset();
  };

  if (phase === 'welcome') {
    return <WelcomeScreen onStart={handleStartTest} />;
  }

  if (phase === 'student-info') {
    return <StudentInfoForm onSubmit={handleStudentInfoSubmit} />;
  }

  if (phase === 'complete') {
    return <TestResults answers={answers} studentInfo={studentInfo} onRestart={handleRestart} />;
  }

  const currentSectionData = testSections[currentSection];
  const currentQuestionData = getCurrentQuestion();

  // Special handling for reading passage view
  if (currentSectionData.id === 'reading-writing' && currentQuestion >= 20) {
    const readingQuestions = currentSectionData.questions.slice(20, 23); // Questions 41-43
    const writingQuestions = currentSectionData.questions.slice(23); // Question 44

    return (
      <div className="min-h-screen bg-gray-50">
        <TestHeader
          currentSection={currentSection}
          totalSections={testSections.length}
          sectionTitle={currentSectionData.title}
        />
        <SectionProgressBar currentSection={currentSection} totalSections={testSections.length} />
        
        <ReadingPassageView
          questions={[...readingQuestions, ...writingQuestions]}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onNext={handleNextSection}
          canGoNext={true}
        />
      </div>
    );
  }

  // Individual question view for all other questions
  if (!currentQuestionData) {
    return <div>Loading...</div>;
  }

  // Calculate display question number based on section and position
  const getDisplayQuestionNumber = () => {
    if (currentSectionData.id === 'grammar-vocabulary') {
      // Questions 1-20: no change (1-20)
      return currentQuestion + 1;
    } else if (currentSectionData.id === 'reading-writing') {
      if (currentQuestion < 15) {
        // Questions 21-35: change to 1-15
        return currentQuestion + 1;
      } else {
        // Questions 36-40: change to 1-5
        return currentQuestion - 15 + 1;
      }
    }
    return currentQuestion + 1;
  };
  const totalQuestionsInSection = currentSectionData.questions.length;
  const canGoNext = currentQuestion < totalQuestionsInSection - 1 || currentSection < testSections.length - 1;
  const canGoPrevious = currentQuestion > 0 || currentSection > 0;

  // Handle listening questions with individual audio players
  if (currentSectionData.id === 'listening') {
    const audioGroups = [
      {
        name: 'Library Announcement',
        audioFile: '/audio/library-announcement.mp3',
        questions: currentSectionData.questions.slice(0, 3),
        description: 'You will hear a library announcement about a heating system issue.'
      },
      {
        name: 'Museum Announcement',
        audioFile: '/audio/museum-announcement.mp3',
        questions: currentSectionData.questions.slice(3, 6),
        description: 'You will hear a museum announcement about closing time.'
      },
      {
        name: 'Voicemail Message',
        audioFile: '/audio/voicemail-message.mp3',
        questions: currentSectionData.questions.slice(6, 9),
        description: 'You will hear a voicemail message from a veterinary clinic.'
      },
      {
        name: 'Travel Report',
        audioFile: '/audio/travel-report.mp3',
        questions: currentSectionData.questions.slice(9, 12),
        description: 'You will hear a radio travel report about traffic conditions.'
      }
    ];

    const currentGroup = audioGroups[currentListeningGroup];

    return (
      <div className="min-h-screen bg-gray-50">
        <TestHeader
          currentSection={currentSection}
          totalSections={testSections.length}
          sectionTitle={currentSectionData.title}
        />
        <SectionProgressBar currentSection={currentSection} totalSections={testSections.length} />
        
        <ListeningQuestionView
          group={currentGroup}
          groupNumber={currentListeningGroup + 1}
          totalGroups={audioGroups.length}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onNext={handleNextQuestion}
          canGoNext={currentListeningGroup < audioGroups.length - 1 || currentSection < testSections.length - 1}
        />
      </div>
    );
  }

  // Regular individual question view for grammar/vocab and reading/writing individual questions
  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader
        currentSection={currentSection}
        totalSections={testSections.length}
        sectionTitle={currentSectionData.title}
      />
      <SectionProgressBar currentSection={currentSection} totalSections={testSections.length} />
      
      <SingleQuestionView
        question={currentQuestionData}
        questionNumber={getDisplayQuestionNumber()}
        totalQuestions={totalQuestionsInSection}
        answer={answers[currentQuestionData.id] || ''}
        onAnswerChange={handleAnswerChange}
        onNext={handleNextQuestion}
        canGoNext={canGoNext}
        sectionTitle={currentSectionData.title}
      />
    </div>
  );
}

export default App;
