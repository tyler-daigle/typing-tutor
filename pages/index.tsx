import { useState, useEffect } from "react";
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

  const keyboardListener = (e: KeyboardEvent) => {
    setTypedChar({ key: e.key });
    console.log(e);
  };

  const backspaceListener = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setTypedChar({ key: e.key });
    }
  };

  useEffect(() => {
    const td = createCharData(currentText);
    setTextData(td);
    window.addEventListener("keypress", keyboardListener);
    window.addEventListener("keydown", backspaceListener);
    return () => {
      window.removeEventListener("keypress", keyboardListener);
      window.removeEventListener("keydown", backspaceListener);
    };
  }, []);

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
      console.log("bs");
      if (charIndex > 0) {
        setCharIndex(charIndex - 1);
      }
    } else {
      td[charIndex].typedChar = typedChar.key;
      setCharIndex(charIndex + 1);
    }
    console.log(typedChar);
    setTextData(td);
  }, [typedChar]);

  return (
    <div className={styles.mainContainer}>
      <h1>Typing Tutor!</h1>
      <TypingTutorText cursorPos={charIndex} textData={textData} />
      {/* {textData.length !== 0 && (
        <div>
          {textData.map((t) => (
            <span>{t.typedChar}</span>
          ))}
        </div>
      )} */}
    </div>
  );
}
