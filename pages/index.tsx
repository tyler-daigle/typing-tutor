import { useState, useEffect, useCallback } from "react";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import Input from "./components/Input";
import styles from "../styles/Home.module.css";
import TypingStats from "./components/TypingStats";
import TypingTimer from "./components/TypingTimer";

export default function Index() {
  const currentText =
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet. However, some letters appear more frequently than others. For example, the letter 'e' is the most commonly used letter in English, while the letters 'q', 'x', and 'z' are relatively rare. Learning to type efficiently requires practice, but it can greatly improve your productivity and reduce the risk of repetitive strain injuries.";
  const [typedText, setTypedText] = useState<string>("");
  const nextChar = currentText.charAt(typedText.length).toLowerCase();

  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <Input
        value={typedText}
        expectedText={currentText}
        onChange={(s) => setTypedText(s)}
      />
      <KeyboardDisplay disabled={false} highlightCharacter={nextChar} />
      {/* <TypingStats stats={userStats} /> */}
      <TypingTimer />
    </div>
  );
}
