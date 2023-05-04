import styles from "../../styles/KeyboardDisplay.module.css";
interface Props {
  disabled: false;
}
import { useState, useEffect } from "react";
import useKeyboard from "../hooks/useKeyboard";

export function KeyboardDisplay({ disabled }: Props) {
  // the keyboard string has an extra 7 characters in the last row - 3 padding
  // on each side and 1 in the middle for the spacebar which is set to span
  // multiple rows with the grid style.

  const qwerty = "_qwertyuiop__asdfghjkl____zxcvbnm___________".split("");
  const spacebarPosition = 39; // 40th key is the spacebar

  const { pressedKeys } = useKeyboard();
  console.log(`Keys: ${pressedKeys}`);
  // highlight each key that is in the pressedKeys array by
  // changing the style. A special case is used for the space
  // because it needs to be styled differently.
  return (
    <div className={styles.keyboardDisplayContainer}>
      {qwerty.map((keyboardKey, index) => {
        const elementKey = `${keyboardKey + index}`;

        if (index === spacebarPosition) {
          if (pressedKeys.includes(" ")) {
            return (
              <span
                key={elementKey + "-selected"}
                className={`${styles.key} ${styles.selectedKey} ${styles.spacebar}`}
              ></span>
            );
          } else {
            return (
              <span
                key={elementKey}
                className={`${styles.key} ${styles.spacebar}`}
              ></span>
            );
          }
        } else if (pressedKeys.includes(keyboardKey)) {
          // A key that was pressed
          return (
            <span
              key={elementKey + "-selected"}
              className={`${styles.key} ${styles.selectedKey}`}
            >
              {keyboardKey}
            </span>
          );
        } else if (keyboardKey === "_") {
          // an empty key - just a blank key that we aren't tracking for this app
          // but it is there to make the keyboard display look better.
          return (
            <span
              key={elementKey + "-empty"}
              className={`${styles.key} ${styles.emptyKey}`}
            ></span>
          );
        } else {
          // a regular key that isn't being pressed
          return (
            <span key={elementKey} className={styles.key}>
              {keyboardKey}
            </span>
          );
        }
      })}
    </div>
  );
}
