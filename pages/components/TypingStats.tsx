import styles from "../../styles/TypingStats.module.css";

interface Props {
  correctText: string;
  userText: string;
}

export default function TypingStats({ correctText, userText }: Props) {
  // count the number of correct characters typed

  //TODO: Count the number of words and the calculate WPM.

  const totalCharactersTyped = userText.length;
  let correctCharactersTyped = 0;
  let accuracyPercentage = 0;

  if (totalCharactersTyped > correctText.length) {
    throw new Error("More characters were typed than actually exist...");
  }

  for (let i = 0; i < totalCharactersTyped; i++) {
    if (userText.charAt(i) === correctText.charAt(i)) {
      correctCharactersTyped += 1;
    }
  }

  accuracyPercentage =
    totalCharactersTyped > 0
      ? Math.floor((correctCharactersTyped / totalCharactersTyped) * 100)
      : 0;

  return (
    <div className={styles.typingStatsContainer}>
      <div className={styles.typingStatsItem}>
        <span>
          Total Characters Typed: <em>{totalCharactersTyped}</em>
        </span>
      </div>
      <div className={styles.typingStatsItem}>
        <span className="">
          Correct Characters Typed: <em>{correctCharactersTyped}</em>
        </span>
      </div>

      <div className={styles.typingStatsItem}>
        <span className="">
          Accuracy: <em>{accuracyPercentage}%</em>
        </span>
      </div>
    </div>
  );
}
