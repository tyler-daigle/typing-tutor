import styles from "../../styles/KeyboardDisplay.module.css";
interface Props {
  keys: string[];
}

export function KeyboardDisplay({ keys }: Props) {
  // the keyboard string has an extra 7 characters in the last row - 3 padding
  // on each side and 1 in the middle for the spacebar which is set to span
  // multiple rows with the grid style.

  const qwerty = "_qwertyuiop__asdfghjkl____zxcvbnm___________".split("");
  const spacebarPosition = 39; // 40th key is the spacebar

  return (
    <div className={styles.keyboardDisplayContainer}>
      {qwerty.map((key, index) => {
        if (index === spacebarPosition) {
          if (keys.indexOf(" ") >= 0) {
            return (
              <span
                className={`${styles.key} ${styles.selectedKey} ${styles.spacebar}`}
              ></span>
            );
          } else {
            return <span className={`${styles.key} ${styles.spacebar}`}></span>;
          }
        }
        if (keys.indexOf(key) >= 0) {
          return (
            <span className={`${styles.key} ${styles.selectedKey}`}>{key}</span>
          );
        } else if (key === "_") {
          return <span className={`${styles.key} ${styles.emptyKey}`}></span>;
        } else {
          return <span className={styles.key}>{key}</span>;
        }
      })}
    </div>
  );
}
