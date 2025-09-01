import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { Question } from '../types/test';
import { Timer } from './Timer';

interface AudioGroup {
  name: string;
  audioFile: string;
  questions: Question[];
  description: string;
}

interface ListeningQuestionViewProps {
  group: AudioGroup;
  groupNumber: number;
  totalGroups: number;
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const ListeningQuestionView: React.FC<ListeningQuestionViewProps> = ({
  group,
  groupNumber,
  totalGroups,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    hasPlayed: false,
    playCount: 0,
    currentTime: 0,
    duration: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxPlays = 2;
  const timeLimit = 300; // 5 minutes = 300 seconds
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isActive, setIsActive] = useState(true);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onNext();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, onNext]);

  // Reset timer when group changes
  useEffect(() => {
    setTimeLeft(timeLimit);
    setIsActive(true);
    setAudioState({
      isPlaying: false,
      hasPlayed: false,
      playCount: 0,
      currentTime: 0,
      duration: 0
    });
  }, [group.name]);

  const handlePlayAudio = () => {
    if (audioRef.current && audioState.playCount < maxPlays && !audioState.isPlaying) {
      audioRef.current.play()
        .then(() => {
          setAudioState(prev => ({
            ...prev,
            isPlaying: true,
            hasPlayed: true,
            playCount: prev.playCount + 1
          }));
        })
        .catch(error => console.error('Error playing audio:', error));
    }
  };

  const handleResetAudio = () => {
    if (audioRef.current && audioState.playCount < maxPlays) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setAudioState(prev => ({
        ...prev,
        isPlaying: false
      }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioState(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime
      }));
      
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        setAudioState(prev => ({
          ...prev,
          isPlaying: false
        }));
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioState(prev => ({
        ...prev,
        duration: audioRef.current!.duration
      }));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Timer */}
      <div className="mb-6">
        <Timer timeLeft={timeLeft} totalTime={timeLimit} />
      </div>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Core Listening</h2>
        <p className="text-gray-600">Recording {groupNumber} of {totalGroups}: {group.name}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={group.audioFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setAudioState(prev => ({ ...prev, isPlaying: false }))}
        />

        {/* Audio Player Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-t-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">{group.name}</h3>
          <p className="text-blue-700 mb-4">
            {group.description}
            <strong> You can play the audio up to {maxPlays} times. Once started, the audio cannot be paused.</strong>
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePlayAudio}
              disabled={audioState.playCount >= maxPlays || audioState.isPlaying}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                audioState.playCount >= maxPlays
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : audioState.isPlaying
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {audioState.isPlaying ? (
                <>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  Playing...
                </>
              ) : audioState.playCount >= maxPlays ? (
                <>
                  <Volume2 className="w-5 h-5" />
                  No Plays Remaining
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Play Audio ({maxPlays - audioState.playCount} {maxPlays - audioState.playCount === 1 ? 'play' : 'plays'} remaining)
                </>
              )}
            </button>
            
            <button
              onClick={handleResetAudio}
              disabled={audioState.playCount >= maxPlays || audioState.isPlaying}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                audioState.playCount >= maxPlays || audioState.isPlaying
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            
            {audioState.isPlaying && (
              <div className="flex items-center gap-2 text-blue-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm">Audio is playing (cannot be paused)</span>
              </div>
            )}
          </div>

          {/* Play counter */}
          <div className="mb-3 text-sm text-blue-700">
            <strong>Plays used:</strong> {audioState.playCount} of {maxPlays}
          </div>

          {/* Audio progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${audioState.duration > 0 ? (audioState.currentTime / audioState.duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(audioState.currentTime)}</span>
            <span>{formatTime(audioState.duration)}</span>
          </div>
        </div>

        {/* Questions Section */}
        {audioState.hasPlayed ? (
          <div className="p-6 space-y-4">
            {group.questions.map((question, index) => (
              <MultipleChoiceQuestion
                key={question.id}
                question={question}
                selectedAnswer={answers[question.id] || ''}
                onAnswerChange={onAnswerChange}
                questionNumber={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Please play the audio first to access the questions</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={false}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {groupNumber >= totalGroups ? 'Complete Test' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};