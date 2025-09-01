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
    S1: "Basic user — understands and uses simple expressions.",
    S2: "Elementary user — can handle short, routine exchanges.",
    S3: "Independent user — can deal with most everyday situations.",
    S4: "Proficient user — can interact fluently and spontaneously.",
    S5: "Mastery — can express ideas precisely in complex situations."
  };

  private static readonly LEVEL_CUTOFFS = {
    S1: { min: 0, max: 15 },
    S2: { min: 16, max: 25 },
    S3: { min: 26, max: 33 },
    S4: { min: 34, max: 42 },
    S5: { min: 43, max: 50 }
  };

  static calculateSEMFLevel(input: SEMFInput): SEMFResult {
    // Step 1: Normalize scores to 0-50 scale
    const grammarVocabNorm = (input.GrammarVocabulary / 20) * 50;
    const readingWritingNorm = (input.ReadingWriting / 24) * 50;
    const listeningNorm = (input.Listening / 12) * 50;

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
      
      // Check if within 1 point of a cut-off
      for (const [level, range] of Object.entries(this.LEVEL_CUTOFFS)) {
        const lowerBoundary = range.min;
        const upperBoundary = range.max;
        
        // Check if within 1 point of lower boundary (could move to higher level)
        if (Math.abs(normalizedScore - lowerBoundary) <= 1 && normalizedScore >= lowerBoundary - 1) {
          if (grammarVocabNorm >= 35) {
            // Award higher level
            const levelIndex = Object.keys(this.LEVEL_CUTOFFS).indexOf(level);
            if (levelIndex > 0) {
              const higherLevel = Object.keys(this.LEVEL_CUTOFFS)[levelIndex];
              return { level: higherLevel, tieBreakerApplied: true };
            }
          }
        }
        
        // Check if within 1 point of upper boundary (could move to lower level)
        if (Math.abs(normalizedScore - upperBoundary) <= 1 && normalizedScore <= upperBoundary + 1) {
          if (grammarVocabNorm < 35) {
            // Keep lower level (which is the base level in this case)
            return { level: baseLevel, tieBreakerApplied: true };
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
        rawScore: input.ReadingWriting,
        normalizedScore: Math.round(readingWritingNorm * 10) / 10,
        level: readingWritingResult.level,
        tieBreakerApplied: readingWritingResult.tieBreakerApplied
      },
      {
        skill: "Listening",
        rawScore: input.Listening,
        normalizedScore: Math.round(listeningNorm * 10) / 10,
        level: listeningResult.level,
        tieBreakerApplied: listeningResult.tieBreakerApplied
      }
    ];

    const tieBreakerSkill = {
      skill: "GrammarVocabulary",
      rawScore: input.GrammarVocabulary,
      normalizedScore: Math.round(grammarVocabNorm * 10) / 10
    };

    // Get descriptions for levels present
    const levelsPresent = new Set([readingWritingResult.level, listeningResult.level, overallLevel]);
    const descriptions: Record<string, string> = {};
    levelsPresent.forEach(level => {
      descriptions[level] = this.LEVEL_DESCRIPTIONS[level as keyof typeof this.LEVEL_DESCRIPTIONS];
    });

    // Generate motivational message
    const getMotivationalMessage = (level: string): string => {
      switch (level) {
        case 'S1':
          return "You're building a solid foundation! Focus on expanding your vocabulary and basic grammar structures to progress to S2.";
        case 'S2':
          return "Great progress! Continue practicing everyday conversations and reading simple texts to reach S3.";
        case 'S3':
          return "Well done! You're becoming independent in English. Work on complex grammar and academic vocabulary to achieve S4.";
        case 'S4':
          return "Excellent work! You're a proficient user. Refine your skills with advanced texts and nuanced expressions to reach S5 mastery.";
        case 'S5':
          return "Outstanding! You've achieved mastery level. Continue using English in complex, professional contexts to maintain your expertise.";
        default:
          return "Keep practicing and you'll continue to improve!";
      }
    };

    const summary = `Reading & Writing: ${input.ReadingWriting}/24 → ${readingWritingResult.level} (${Math.round(readingWritingNorm * 10) / 10})\nListening: ${input.Listening}/12 → ${listeningResult.level} (${Math.round(listeningNorm * 10) / 10})\nOverall SEMF Level: ${overallLevel} — ${getMotivationalMessage(overallLevel)}`;

    return {
      skills,
      tieBreakerSkill,
      overallLevel,
      descriptions,
      summary
    };
  }
}