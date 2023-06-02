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
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const duration = 20;
  // use this as the key to force a remount of the <TypingTimer> to reset the timer
  const [timerId, setTimerId] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);

  const inputGotFocus = () => {
    if (inputDisabled && !gameOver) {
      console.log("Game is starting");
      setInputDisabled(false);
      setTimerRunning(true);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerId(timerId + 1);
    setInputDisabled(true);
  };

  const gameEnding = () => {
    //resetTimer();
    setInputDisabled(true);
    setGameOver(true);
    console.log("Game over");
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <Input
        value={typedText}
        expectedText={currentText}
        onChange={(s) => setTypedText(s)}
        onFocus={() => inputGotFocus()}
        disabled={inputDisabled}
      />
      <KeyboardDisplay disabled={false} highlightCharacter={nextChar} />

      <TypingTimer
        key={timerId}
        running={timerRunning}
        onDone={gameEnding}
        duration={duration}
        onTick={(n) => setCurrentDuration(n)}
      />
      <button onClick={resetTimer}>Reset Timer</button>

      <TypingStats
        correctText={currentText}
        userText={typedText}
        duration={currentDuration}
      />
    </div>
  );
}
