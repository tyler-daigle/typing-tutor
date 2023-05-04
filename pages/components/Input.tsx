interface Props {
  value: string;
  expectedText: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

import styles from "../../styles/Input.module.css";
import { useState } from "react";

export default function Input({
  value,
  expectedText,
  onChange,
  disabled,
}: Props) {
  const [hasFocus, setHasFocus] = useState(false);

  // split the text up into correct, wrong, and not yet typed characters
  const textOutput = expectedText.split("").map((char, index) => {
    if (index < value.length) {
      // if a character was typed at this position
      if (value.charAt(index) === char) {
        return <span className={styles.correctChar}>{char}</span>;
      } else {
        return <span className={styles.wrongChar}>{char}</span>;
      }
    } else {
      // place the cursor just after the last typed character
      // index will be === length of the typed string (since
      // index starts at 0)
      const lastChar = index === value.length;

      return (
        <span
          className={`${styles.expectedChar} ${
            lastChar && !disabled ? styles.cursor : ""
          }`}
        >
          {char}
        </span>
      );
    }
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const ignoreKeys = ["Shift", "Control", "Meta", "Alt"];
    if (disabled) return;

    if (e.key === "Backspace") {
      onChange(value.substring(0, value.length - 1));
      return;
    }

    if (ignoreKeys.includes(e.key)) {
      return;
    }

    // end of the text has been typed
    if (value.length === expectedText.length) return;

    onChange(value + e.key);
  };

  return (
    <div className={styles.inputContainer}>
      <div
        className={hasFocus ? styles.hasFocus : styles.blur}
        tabIndex={0}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onKeyDown={handleKeyPress}
      >
        {textOutput}
      </div>
    </div>
  );
}
