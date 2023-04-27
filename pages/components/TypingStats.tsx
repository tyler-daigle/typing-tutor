import styles from "../../styles/TypingStats.module.css";
import { UserStats } from "../types/types";

interface Props {
  stats: UserStats;
  correctWordCount: number;
}

export default function TypingStats({ stats, correctWordCount }: Props) {
  const { totalWords, correctWords, wpm } = stats;

  return (
    <div className={styles.typingStatsContainer}>
      <h3>Stats</h3>
      <div className={styles.typingStatsItem}>
        <span className={styles.typingStatsLabel}>Total Words</span>
        <span className={styles.typingStatsValue}>{totalWords}</span>
      </div>
      <div className={styles.typingStatsItem}>
        <span className={styles.typingStatsLabel}>Correct Words</span>
        <span className={styles.typingStatsValue}>{correctWordCount}</span>
      </div>
      <div className={styles.typingStatsItem}>
        <span className={styles.typingStatsLabel}>WPM</span>
        <span className={styles.typingStatsValue}>{wpm}</span>
      </div>
    </div>
  );
}
