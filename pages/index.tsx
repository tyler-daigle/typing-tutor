import { useState, useEffect, useCallback } from "react";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import Input from "./components/Input";
import styles from "../styles/Home.module.css";
import TypingStats from "./components/TypingStats";
import TypingTimer from "./components/TypingTimer";

export default function Index() {
  const currentText = "This is some random text that you have to type. ";
  const [typedText, setTypedText] = useState<string>("");
  const [isKeyboardActive, setIsKeyboardActive] = useState(true);
  const [keyDownKeys, setKeyDownKeys] = useState<string[]>([]);

  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <Input
        value={typedText}
        expectedText={currentText}
        onChange={(s) => setTypedText(s)}
      />
      <KeyboardDisplay keys={keyDownKeys} />
      {/* <TypingStats stats={userStats} /> */}
      <TypingTimer />
    </div>
  );
}
