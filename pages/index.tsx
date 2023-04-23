import { useState, useEffect, useCallback } from "react";
import { CharData, UserStats } from "./types/types";
import { TypingTutorText } from "./components/TypingTutor";
import { KeyboardDisplay } from "./components/KeyboardDisplay";

import styles from "../styles/Home.module.css";
import TypingStats from "./components/TypingStats";
import useTimer from "./hooks/useTimer";

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
  const [keyDownKeys, setKeyDownKeys] = useState<string[]>([]);
  const userStats: UserStats = { totalWords: 10, correctWords: 7, wpm: 30 };

  // there are two listeners for keypresses because 'keypress' event doesn't catch backspace.
  // using keypress event also ignores other keypresses, such as arrow keys.
  const keyboardListener = useCallback((e: KeyboardEvent) => {
    setTypedChar({ key: e.key });
  }, []);

  /*
    keydown event listener 

    It takes care of the backspace character being typed and also adds the 
    keys to the keyDownKeys array while the key is being held down. It
    does NOT actually set the typedChar - that is handled by the keypress event
    listener which is keyboardListener().

    TODO: shift bug:
    There is a problem: If you type shift + a letter key, they will be added to the array.
    If you release the letter key first it will work fine. If you release shift first
    then the capitalized letter will stay in the array until it is typed again.
  */
  const keydownListener = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Backspace") {
      setTypedChar({ key: e.key });
    } else {
      setKeyDownKeys((keys) => {
        if (keys.indexOf(e.key) !== -1) {
          // don't add the same key twice if it is being held down
          return keys;
        }
        return [...keys, e.key];
      });
    }
  }, []);

  /*
    keyup event handler for when a key is released - it will be removed from
    the array.
  */
  const keyupListener = useCallback((e: KeyboardEvent) => {
    //remove the key from the array
    setKeyDownKeys((keys) => keys.filter((key) => key !== e.key));
  }, []);

  const initListeners = () => {
    window.addEventListener("keypress", keyboardListener);
    window.addEventListener("keydown", keydownListener);
    window.addEventListener("keyup", keyupListener);
  };

  const killListeners = () => {
    window.removeEventListener("keypress", keyboardListener);
    window.removeEventListener("keydown", keydownListener);
    window.removeEventListener("keyup", keyupListener);
  };

  useEffect(() => {
    const td = createCharData(currentText);
    setTextData(td);
    // initListeners();
    setIsKeyboardActive(true);
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

  const { currentTime } = useTimer(5);
  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <TypingTutorText cursorPos={charIndex} textData={textData} />
      <KeyboardDisplay keys={keyDownKeys} />
      <TypingStats stats={userStats} />
      <button
        type="button"
        onClick={() => setIsKeyboardActive(!isKeyboardActive)}
      >
        Toggle
      </button>
      <p>{currentTime}</p>
    </div>
  );
}
