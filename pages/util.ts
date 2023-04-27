import { CharData } from "./types/types";

import { TypedWord } from "./types/types";

export function checkForWord(fullText: string, charData: CharData[], index: number): TypedWord | null {
  if(index !== fullText.length - 1 && fullText.charAt(index) !== " " && index !== 0) {
    return null;
  }

  const endOfWord = index - 1;
  const startOfWord = fullText.lastIndexOf(" ", endOfWord - 1) + 1;
  const typedWord = charData.slice(startOfWord, endOfWord + 1).map((char) => char.typedChar).join("");

  if(typedWord === fullText.slice(startOfWord, endOfWord + 1)) {
    return {
      startOfWord,
      endOfWord,
      word: typedWord
    };
  }
  return null;
}