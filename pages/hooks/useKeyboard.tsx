import { useState, useEffect, useCallback, useRef } from "react";

export default function useKeyboard() {
  const KEYBOARD_ACTIVE_BY_DEFAULT = true;

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [isKeyboardActive, setIsKeyboardActive] = useState(
    KEYBOARD_ACTIVE_BY_DEFAULT
  );
  const keyboardActiveRef = useRef(KEYBOARD_ACTIVE_BY_DEFAULT);

  const keyDownHandler = useCallback((e: KeyboardEvent) => {
    if (keyboardActiveRef.current) {
      // set the key that was pressed
      setPressedKeys((keysDown) => {
        if (e.key !== "Shift") {
          const typedKey = e.key.toLowerCase();
          if (!keysDown.includes(typedKey)) {
            return [...keysDown, typedKey];
          }
        }
        return keysDown;
      });
    }
  }, []);

  const keyUpHandler = useCallback((e: KeyboardEvent) => {
    if (keyboardActiveRef.current) {
      setPressedKeys((keysDown) => {
        if (e.key !== "Shift") {
          const releasedKey = e.key.toLowerCase();
          const pk = keysDown.filter((key) => key !== releasedKey);
          return pk;
        }
        return keysDown;
      });
    }
  }, []);

  const removeKeyboardListener = () => {
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    console.log("removing listeners");
  };

  const installKeyboardListener = () => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    console.log("adding listeners");
  };

  const disableKeyboard = () => {
    setIsKeyboardActive(false);
    keyboardActiveRef.current = false;
  };

  const enableKeyboard = () => {
    setIsKeyboardActive(true);
    keyboardActiveRef.current = true;
  };

  useEffect(() => {
    if (isKeyboardActive) {
      installKeyboardListener();
    } else {
      removeKeyboardListener();
    }
    return () => removeKeyboardListener();
  }, [isKeyboardActive]);

  return {
    pressedKeys,
    isKeyboardActive,
    disableKeyboard,
    enableKeyboard,
  };
}
