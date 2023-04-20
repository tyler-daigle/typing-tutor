import { useState, useEffect, useCallback } from "react";
import { CharData } from "./types/types";
import { TypingTutorText } from "./components/TypingTutor";
import styles from "../styles/Home.module.css";

function createCharData(text: string): CharData[] {
  const charData: CharData[] = [];

  if (text.length !== 0) {
    text.split("").forEach((char) => {
      charData.push({ expectedChar: char, typedChar: "" });
    });
  }

  return charData;
}

export default function Index() {
  const currentText = "This is some random text that you have to type.";
  const [textData, setTextData] = useState<CharData[]>([]);
  const [typedChar, setTypedChar] = useState({ key: "" });
  const [charIndex, setCharIndex] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(true);

  // there are two listeners for keypresses because 'keypress' event doesn't catch backspace.
  // using keypress event also ignores other keypresses, such as arrow keys.
  const keyboardListener = useCallback((e: KeyboardEvent) => {
    setTypedChar({ key: e.key });
  }, []);

  const backspaceListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setTypedChar({ key: e.key });
    }
  }, []);

  const initListeners = () => {
    window.addEventListener("keypress", keyboardListener);
    window.addEventListener("keydown", backspaceListener);
  };

  const killListeners = () => {
    window.removeEventListener("keypress", keyboardListener);
    window.removeEventListener("keydown", backspaceListener);
  };

  useEffect(() => {
    const td = createCharData(currentText);
    setTextData(td);
    initListeners();
    return () => {
      killListeners();
    };
  }, []);

  useEffect(() => {
    console.log("toggling keyboard input");
    if (isKeyboardActive === false) {
      killListeners();
    } else {
      initListeners();
    }
  }, [isKeyboardActive]);

  useEffect(() => {
    // check for end of the text
    if (charIndex === currentText.length - 1 && typedChar.key !== "Backspace") {
      return;
    }

    const td = [...textData];

    if (textData.length === 0) {
      return;
    }

    if (typedChar.key === "Backspace" && charIndex > 0) {
      td[charIndex - 1].typedChar = "";
      if (charIndex > 0) {
        setCharIndex(charIndex - 1);
      }
    } else {
      td[charIndex].typedChar = typedChar.key;
      setCharIndex(charIndex + 1);
    }
    setTextData(td);
  }, [typedChar]);

  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <TypingTutorText cursorPos={charIndex} textData={textData} />
      <button
        type="button"
        onClick={() => setIsKeyboardActive(!isKeyboardActive)}
      >
        Toggle
      </button>
    </div>
  );
}
