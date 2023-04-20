import { CharData } from "../types/types";
import styles from "../../styles/TypingTutor.module.css";

interface Props {
  textData: CharData[];
  cursorPos: number;
}

type CharStatus = "empty" | "correct" | "wrong";

export function TypingTutorText({ textData, cursorPos }: Props) {
  return (
    <div className={styles.typingInputContainer}>
      {textData.map((ch, index) => {
        let status: CharStatus = "empty";

        const { expectedChar, typedChar } = ch;

        if (typedChar !== "" && expectedChar === typedChar) {
          // correct letter typed
          status = "correct";
        } else if (typedChar !== "" && expectedChar !== typedChar) {
          // wrong character typed
          status = "wrong";
        } else {
          // nothing typed yet
          status = "empty";
        }

        return (
          <TypingTutorChar
            key={`${expectedChar + typedChar + index}`}
            charStatus={status}
            currentChar={ch.expectedChar}
            cursor={cursorPos === index}
          />
        );
      })}
    </div>
  );
}

function TypingTutorChar({
  currentChar,
  charStatus,
  cursor,
}: {
  currentChar: string;
  charStatus: CharStatus;
  cursor: boolean;
}) {
  let style = "";

  switch (charStatus) {
    case "correct":
      style = styles.correctLetter;
      break;
    case "wrong":
      style = styles.wrongLetter;
      if (currentChar === " ") {
        currentChar = "_";
      }
      break;
    case "empty":
      style = styles.emptyLetter;
      break;
  }

  if (cursor) {
    style += ` ${styles.cursor}`;
  }
  return <span className={`${style}`}>{currentChar}</span>;
}
