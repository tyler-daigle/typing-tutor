import { useState, useEffect, useCallback } from "react";
import { CharData, TypedWord, UserStats } from "./types/types";
import { TypingTutorText } from "./components/TypingTutor";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import { checkForWord } from "./util";

import styles from "../styles/Home.module.css";
import TypingStats from "./components/TypingStats";
import TypingTimer from "./components/TypingTimer";

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
  const currentText = "This is some text";
  const [textData, setTextData] = useState<CharData[]>([]);
  const [typedChar, setTypedChar] = useState({ key: "" });
  const [charIndex, setCharIndex] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(true);
  const [correctWords, setCorrectWords] = useState<TypedWord[]>([]);

  // keyDownKeys is an array of keys that are currently being held down
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
    keyupListener()
    keyup event handler for when a key is released - it will be removed from
    the array.
  */
  const keyupListener = useCallback((e: KeyboardEvent) => {
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

  // checkLastWord() is called when backspace is pressed and we might have
  // to remove a previously correct word from the array. It checks if the
  // current position of the cursor is inside the last correct word.
  const checkLastWord = () => {
    if (correctWords.length === 0) {
      return;
    }

    const lastWord = correctWords[correctWords.length - 1];
    if (lastWord && lastWord.endOfWord >= charIndex) {
      // correctWords.pop();
      setCorrectWords((words) => words.slice(0, words.length - 1));
      console.log("removing last correct word");
    }
    console.log(correctWords);
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
    // this is called after a key is pressed, so charIndex will actually be about to be moved
    // to the next space.

    // TODO: move the checking of the words to a separate useEffect()

    // check for end of the text - charIndex will be one past the end of the text
    if (charIndex === currentText.length - 1 && typedChar.key !== "Backspace") {
      console.log(`Done on ${charIndex} with length ${currentText.length}`);

      const foundWord = checkForWord(currentText, textData, charIndex);
      if (foundWord) {
        console.log(foundWord);
        correctWords.push(foundWord);
      }

      return;
    }

    const td = [...textData];

    if (textData.length === 0) {
      return;
    }

    console.log(charIndex, currentText.length);
    // check for correct words everytime a space is typed or at the end of the text
    if (typedChar.key === " ") {
      const foundWord = checkForWord(currentText, textData, charIndex);
      if (foundWord) {
        console.log(foundWord);
        correctWords.push(foundWord);
      }
    }

    if (typedChar.key === "Backspace" || typedChar.key === ".") {
      checkLastWord();
    }

    // handle backspace by deleting the previous character
    if (typedChar.key === "Backspace" && charIndex >= 0) {
      // remove the first character but don't go below 0
      const tempIndex = charIndex > 0 ? charIndex - 1 : 0;

      td[tempIndex].typedChar = "";
      setCharIndex(tempIndex);
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
      <KeyboardDisplay keys={keyDownKeys} />
      <TypingStats stats={userStats} correctWordCount={correctWords.length} />
      <TypingTimer />
    </div>
  );
}
