import styles from "../../styles/TypingStats.module.css";
import { useMemo } from "react";

interface Props {
  correctText: string;
  userText: string;
  duration: number;
}

export default function TypingStats({
  correctText,
  userText,
  duration,
}: Props) {
  const correctWords = useMemo(() => {
    return correctText.split(" ");
  }, [correctText]);

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

  // count the number of words and determine how many were correct
  // remove any words that have a length of 0 which will happen in multiple spaces are inserted.
  const userWords = userText.split(" ").filter((s) => s.length !== 0);
  let numWordsCorrect = 0;

  for (let i = 0; i < userWords.length && i < correctWords.length; i++) {
    if (userWords[i] === correctWords[i]) {
      numWordsCorrect++;
    }
  }

  // calculate WPM
  const wpm = duration > 0 ? Math.floor(numWordsCorrect / (duration / 60)) : 0;

  return (
    <div className={styles.typingStatsContainer}>
      <div className={styles.typingStatsItem}>
        <span>
          WPM: <em>{wpm}</em>
        </span>
      </div>
      {/* <div className={styles.typingStatsItem}>
        <span>
          Total Characters Typed: <em>{totalCharactersTyped}</em>
        </span>
      </div>
      <div className={styles.typingStatsItem}>
        <span className="">
          Correct Characters Typed: <em>{correctCharactersTyped}</em>
        </span>
      </div> */}

      <div className={styles.typingStatsItem}>
        <span className="">
          Accuracy: <em>{accuracyPercentage}%</em>
        </span>
      </div>

      {/* <div className={styles.typingStatsItem}>
        <span className="">
          Correct Words:{" "}
          <em>
            {numWordsCorrect} / {correctWords.length}
          </em>
        </span>
      </div> */}
    </div>
  );
}
