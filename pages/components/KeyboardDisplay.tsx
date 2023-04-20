import styles from "../../styles/KeyboardDisplay.module.css";
interface Props {
  keys: string[];
}

export function KeyboardDisplay({ keys }: Props) {
  const qwerty = "_qwertyuiop__asdfghjkl____zxcvbnm___".split("");

  return (
    <div className={styles.keyboardDisplayContainer}>
      {qwerty.map((key) => {
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
