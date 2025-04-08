import { SlabStatus } from "../Types/types";

export function validarPalabra(guess: string, word: string): SlabStatus[] {
  const guessArray = guess.toLowerCase().split('');
  const wordArray = word.toLowerCase().split('');
  const status: SlabStatus[] = Array(guess.length).fill('absent');
  const usedIndices: boolean[] = Array(word.length).fill(false);


  guessArray.forEach((letter, i) => {
    if (letter === wordArray[i]) {
      status[i] = 'correct';
      usedIndices[i] = true;
    }
  });

  guessArray.forEach((letter, i) => {
    if (status[i] !== 'correct') {
      const index = wordArray.findIndex((l, j) => l === letter && !usedIndices[j]);
      if (index !== -1) {
        status[i] = 'present';
        usedIndices[index] = true;
      }
    }
  });

  return status;
}
