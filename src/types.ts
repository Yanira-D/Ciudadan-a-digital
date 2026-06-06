export interface UserProfile {
  name: string;
  grade: string;
  city: string;
  points: number;
  tenths: number;
  level: number;
  levelName: string;
  progressPercentage: number;
  avatarUrl: string;
}

export interface Badge {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  status: "unlocked" | "locked";
  borderCol: string;
  bgCol: string;
  iconCol: string;
}

export interface LessonNode {
  id: string;
  title: string;
  description: string;
  status: "current" | "locked" | "completed";
  progress: number;
  icon: string;
}

export interface QuizScenario {
  id: string;
  title: string;
  sender: string;
  messageText: string;
  questionText: string;
  options: {
    text: string;
    points: number;
    tenths: number;
    feedback: string;
    isCorrect: boolean;
  }[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  school: string;
  grade: string;
  points: number;
  tenths: number;
  level: string;
  avatarUrl: string;
}
