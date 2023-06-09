export interface CharData {
  expectedChar: string;
  typedChar: string;
}

export interface UserStats {
  totalWords: number;
  correctWords: number;
  wpm: number;
}

export type TimerStatus = "running" | "paused" | "stopped";
