export interface SEMFInput {
  GrammarVocabulary: number;
  ReadingWriting: number;
  Listening: number;
}

export interface SEMFSkillResult {
  skill: string;
  rawScore: number;
  normalizedScore: number;
  level: string;
  tieBreakerApplied: boolean;
}

export interface SEMFResult {
  skills: SEMFSkillResult[];
  tieBreakerSkill: {
    skill: string;
    rawScore: number;
    normalizedScore: number;
  };
  overallLevel: string;
  descriptions: Record<string, string>;
  summary: string;
}

export class SEMFScoringEngine {
  private static readonly LEVEL_DESCRIPTIONS = {
    S1: "Basic user - understands and uses simple expressions.",
    S2: "Elementary user - can handle short, routine exchanges.",
    S3: "Independent user - can deal with most everyday situations.",
    S4: "Proficient user - can interact fluently and spontaneously.",
    S5: "Mastery - can express ideas precisely in complex situations."
  };

  private static readonly LEVEL_CUTOFFS = {
    S1: { min: 0, max: 15 },
    S2: { min: 16, max: 25 },
    S3: { min: 26, max: 33 },
    S4: { min: 34, max: 42 },
    S5: { min: 43, max: 50 }
  };

  // Correct answers for validation
  private static readonly CORRECT_ANSWERS = {
    // Grammar & Vocabulary (Questions 1-20)
    1: 'B', 2: 'A', 3: 'C', 4: 'B', 5: 'C',
    6: 'C', 7: 'B', 8: 'A', 9: 'C', 10: 'A',
    11: 'B', 12: 'B', 13: 'C', 14: 'C', 15: 'C',
    16: 'B', 17: 'B', 18: 'B', 19: 'C', 20: 'B',
    
    // Story Continuation (Questions 21-35)
    21: 'C', 22: 'C', 23: 'B', 24: 'D', 25: 'B',
    26: 'C', 27: 'B', 28: 'B', 29: 'B', 30: 'B',
    31: 'B', 32: 'B', 33: 'C', 34: 'A', 35: 'C',
    
    // Sentence Ordering (Questions 36-40)
    36: 'B, C, D, A', 37: 'C, B, A, D', 38: 'A, C, D, B',
    39: 'B, C, D, A', 40: 'C, B, D, A',
    
    // Listening (Questions 45-56)
    45: 'B', 46: 'B', 47: 'C', 48: 'B', 49: 'B', 50: 'C',
    51: 'B', 52: 'B', 53: 'B', 54: 'B', 55: 'C', 56: 'B'
  };

  // Keywords for text answer validation
  private static readonly TEXT_ANSWER_KEYWORDS = {
    41: ['flexibility', 'commute', 'talent', 'global', 'reduced', 'access'], // Reading advantages
    42: ['isolation', 'culture', 'security', 'challenges', 'difficulties'], // Reading challenges
    43: ['maximize', 'benefits', 'mitigate', 'drawbacks', 'strategies', 'developing'] // Main goal
  };

  static calculateActualScores(answers: Record<number, string>): SEMFInput {
    let grammarScore = 0;
    let readingWritingScore = 0;
    let listeningScore = 0;

    // Score Grammar & Vocabulary (Questions 1-20)
    for (let i = 1; i <= 20; i++) {
      const userAnswer = answers[i]?.trim().toUpperCase();
      const correctAnswer = this.CORRECT_ANSWERS[i as keyof typeof this.CORRECT_ANSWERS];
      if (userAnswer === correctAnswer) {
        grammarScore++;
      }
    }

    // Score Reading & Writing section
    // Story Continuation (Questions 21-35) - 15 questions
    for (let i = 21; i <= 35; i++) {
      const userAnswer = answers[i]?.trim().toUpperCase();
      const correctAnswer = this.CORRECT_ANSWERS[i as keyof typeof this.CORRECT_ANSWERS];
      if (userAnswer === correctAnswer) {
        readingWritingScore++;
      }
    }

    // Sentence Ordering (Questions 36-40) - 5 questions
    for (let i = 36; i <= 40; i++) {
      const userAnswer = answers[i]?.trim();
      const correctAnswer = this.CORRECT_ANSWERS[i as keyof typeof this.CORRECT_ANSWERS];
      if (userAnswer === correctAnswer) {
        readingWritingScore++;
      }
    }

    // Text Questions (Questions 41-43) - 3 questions, 1 point each
    for (let i = 41; i <= 43; i++) {
      const userAnswer = answers[i]?.toLowerCase() || '';
      const keywords = this.TEXT_ANSWER_KEYWORDS[i as keyof typeof this.TEXT_ANSWER_KEYWORDS];
      
      // Award point if answer contains at least 2 relevant keywords and is substantial
      const keywordMatches = keywords.filter(keyword => 
        userAnswer.includes(keyword.toLowerCase())
      ).length;
      
      if (keywordMatches >= 2 && userAnswer.length >= 20) {
        readingWritingScore++;
      }
    }

    // Essay Question (Question 44) - 1 point
    const essayAnswer = answers[44]?.trim() || '';
    const wordCount = essayAnswer ? essayAnswer.split(/\s+/).length : 0;
    
    // Award point for essay if it meets basic criteria
    if (wordCount >= 80 && wordCount <= 200 && essayAnswer.length > 0) {
      // Check for basic argument structure
      const hasArgument = essayAnswer.toLowerCase().includes('advantage') || 
                         essayAnswer.toLowerCase().includes('disadvantage') ||
                         essayAnswer.toLowerCase().includes('benefit') ||
                         essayAnswer.toLowerCase().includes('challenge');
      
      if (hasArgument) {
        readingWritingScore++;
      }
    }

    // Score Listening (Questions 45-56)
    for (let i = 45; i <= 56; i++) {
      const userAnswer = answers[i]?.trim().toUpperCase();
      const correctAnswer = this.CORRECT_ANSWERS[i as keyof typeof this.CORRECT_ANSWERS];
      if (userAnswer === correctAnswer) {
        listeningScore++;
      }
    }

    return {
      GrammarVocabulary: grammarScore,
      ReadingWriting: readingWritingScore,
      Listening: listeningScore
    };
  }

  static calculateSEMFLevel(answers: Record<number, string>): SEMFResult {
    // Calculate actual scores based on correct answers
    const rawScores = this.calculateActualScores(answers);

    // Step 1: Normalize scores to 0-50 scale
    const grammarVocabNorm = (rawScores.GrammarVocabulary / 20) * 50;
    const readingWritingNorm = (rawScores.ReadingWriting / 24) * 50;
    const listeningNorm = (rawScores.Listening / 12) * 50;

    // Step 2: Map normalized scores to SEMF levels
    const mapToLevel = (normalizedScore: number): string => {
      for (const [level, range] of Object.entries(this.LEVEL_CUTOFFS)) {
        if (normalizedScore >= range.min && normalizedScore <= range.max) {
          return level;
        }
      }
      return 'S1'; // Default fallback
    };

    // Step 3: Apply tie-breaker logic
    const applyTieBreaker = (normalizedScore: number, grammarVocabNorm: number): { level: string; tieBreakerApplied: boolean } => {
      const baseLevel = mapToLevel(normalizedScore);
      
      // Check if within 2 points of a level boundary
      for (const [level, range] of Object.entries(this.LEVEL_CUTOFFS)) {
        const lowerBoundary = range.min;
        const upperBoundary = range.max;
        
        // Check if within 2 points of lower boundary (could move to higher level)
        if (normalizedScore >= lowerBoundary - 2 && normalizedScore < lowerBoundary) {
          if (grammarVocabNorm >= 35) {
            // Award higher level
            return { level, tieBreakerApplied: true };
          }
        }
        
        // Check if within 2 points of upper boundary (could move to lower level)
        if (normalizedScore > upperBoundary && normalizedScore <= upperBoundary + 2) {
          if (grammarVocabNorm < 35) {
            // Find the lower level
            const levelIndex = Object.keys(this.LEVEL_CUTOFFS).indexOf(level);
            if (levelIndex > 0) {
              const lowerLevel = Object.keys(this.LEVEL_CUTOFFS)[levelIndex - 1];
              return { level: lowerLevel, tieBreakerApplied: true };
            }
          }
        }
      }
      
      return { level: baseLevel, tieBreakerApplied: false };
    };

    // Calculate levels for main skills
    const readingWritingResult = applyTieBreaker(readingWritingNorm, grammarVocabNorm);
    const listeningResult = applyTieBreaker(listeningNorm, grammarVocabNorm);

    // Step 4: Determine overall level (lowest skill method)
    const levelToNumber = (level: string): number => {
      return parseInt(level.substring(1));
    };

    const readingWritingNumber = levelToNumber(readingWritingResult.level);
    const listeningNumber = levelToNumber(listeningResult.level);
    const overallNumber = Math.min(readingWritingNumber, listeningNumber);
    const overallLevel = `S${overallNumber}`;

    // Step 5: Build result object
    const skills: SEMFSkillResult[] = [
      {
        skill: "ReadingWriting",
        rawScore: rawScores.ReadingWriting,
        normalizedScore: Math.round(readingWritingNorm * 10) / 10,
        level: readingWritingResult.level,
        tieBreakerApplied: readingWritingResult.tieBreakerApplied
      },
      {
        skill: "Listening",
        rawScore: rawScores.Listening,
        normalizedScore: Math.round(listeningNorm * 10) / 10,
        level: listeningResult.level,
        tieBreakerApplied: listeningResult.tieBreakerApplied
      }
    ];

    const tieBreakerSkill = {
      skill: "GrammarVocabulary",
      rawScore: rawScores.GrammarVocabulary,
      normalizedScore: Math.round(grammarVocabNorm * 10) / 10
    };

    // Get descriptions for levels present
    const levelsPresent = new Set([readingWritingResult.level, listeningResult.level, overallLevel]);
    const descriptions: Record<string, string> = {};
    levelsPresent.forEach(level => {
      descriptions[level] = this.LEVEL_DESCRIPTIONS[level as keyof typeof this.LEVEL_DESCRIPTIONS];
    });

    // Generate detailed feedback based on actual performance
    const getDetailedFeedback = (level: string, scores: SEMFInput): string => {
      const totalAnswered = Object.keys(answers).length;
      const totalPossible = 56; // Total questions in test
      const completionRate = (totalAnswered / totalPossible) * 100;
      
      let feedback = `Overall SEMF Level: ${level}\n\n`;
      
      // Performance breakdown
      feedback += `Performance Breakdown:\n`;
      feedback += `• Grammar & Vocabulary: ${scores.GrammarVocabulary}/20 (${Math.round((scores.GrammarVocabulary/20)*100)}%)\n`;
      feedback += `• Reading & Writing: ${scores.ReadingWriting}/24 (${Math.round((scores.ReadingWriting/24)*100)}%)\n`;
      feedback += `• Listening: ${scores.Listening}/12 (${Math.round((scores.Listening/12)*100)}%)\n`;
      feedback += `• Test Completion: ${Math.round(completionRate)}%\n\n`;
      
      // Level-specific recommendations
      switch (level) {
        case 'S1':
          feedback += "Recommendations: Focus on basic vocabulary building, simple sentence structures, and everyday expressions. Practice listening to slow, clear speech.";
          break;
        case 'S2':
          feedback += "Recommendations: Expand vocabulary for common situations, practice past and future tenses, and work on basic conversation skills.";
          break;
        case 'S3':
          feedback += "Recommendations: Study complex grammar structures, academic vocabulary, and practice expressing opinions clearly in writing.";
          break;
        case 'S4':
          feedback += "Recommendations: Refine advanced grammar usage, expand professional vocabulary, and practice nuanced expression in complex topics.";
          break;
        case 'S5':
          feedback += "Recommendations: Maintain proficiency through exposure to complex texts, academic writing, and professional communication contexts.";
          break;
        default:
          feedback += "Continue practicing to improve your English proficiency.";
      }
      
      return feedback;
    };

    const summary = getDetailedFeedback(overallLevel, rawScores);

    return {
      skills,
      tieBreakerSkill,
      overallLevel,
      descriptions,
      summary
    };
  }
}
