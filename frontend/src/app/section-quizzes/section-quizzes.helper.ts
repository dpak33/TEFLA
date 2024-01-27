interface LevelMappings {
  [key: string]: { [key: number]: string };
}

function calculateNewLevel(quizScore: number, currentLevel: string, levelMappings: LevelMappings): string {
  const thresholds = levelMappings[currentLevel];

  if (thresholds) {
    for (const threshold in thresholds) {
      if (quizScore >= +threshold) {
        return thresholds[threshold];
      }
    }
  }

  return 'unchanged';
}


const levelMappings: LevelMappings = {
  'beginner': {
    70: 'A2',
    90: 'B2',
  },
  'intermediate': {
    70: 'B2',
    90: 'C1',
  },
  'advanced': {
    90: 'C2',
  },
  // Add more levels as needed
};

const newLevel = calculateNewLevel(80, "beginner", levelMappings);
console.log(newLevel);
