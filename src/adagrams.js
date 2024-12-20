const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};
const SCORE_CHART = {A: 1,
  E: 1,
  I: 1,
  O: 1, 
  U: 1,
  L: 1,
  N: 1,
  R: 1, 
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10};
export const drawLetters = () => {
  const letterPool = [];
  const handBank = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      letterPool.push(letter);
    }
  }
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * letterPool.length);
    handBank.push(letterPool[randomIndex]);
    letterPool.splice(randomIndex, 1); 
  }

  return handBank;
};


export const usesAvailableLetters = (input, lettersInHand) => {
  for (let letter of input) {
    letter = letter.toUpperCase();

    if (!lettersInHand.includes(letter)) {
        return false;
    }

    const index = lettersInHand.indexOf(letter);
    lettersInHand.splice(index, 1);
}

  return true;
};

export const scoreWord = (word) => {
        word = word.toUpperCase();
        let points = 0;

        for (let letter of word) {
          points += SCORE_CHART[letter];
        }

        if (word.length > 6 && word.length < 11) {
          points += 8;
        }

        return points;

        };

export const highestScoreFrom = (words) => {
            let scoreMax = 0;
            let wordMin = "ZZZZZZZZZZZZZZZZZ";
            let wordsPosWin = [];

            for (let word of words) {
                const wordScore = scoreWord(word);
                if (wordScore > scoreMax) {
                    scoreMax = wordScore;
                }
            }

            for (let word of words) {
                const wordScore = scoreWord(word);
                if (wordScore === scoreMax) {
                  wordsPosWin.push(word);
                }
            }

            if (wordsPosWin.length === 1) {
                return {word: wordsPosWin[0], score: scoreMax};
            }
          
            for (let word of wordsPosWin) {
                if (word.length === 10) {
                  return {word: word, score: scoreMax};
                }
                
                if (word.length < wordMin.length) {
                    wordMin = word;
                }
            }
            return {word: wordMin, score: scoreMax};

};
