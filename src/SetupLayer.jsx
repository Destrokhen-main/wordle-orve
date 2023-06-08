import { getRandomWord, checkExistWord } from "./assets/words";

export default function({ children }) {
  this.$word = {
    currentWord: getRandomWord(),
    exist: (word) => checkExistWord(word)
  }

  return (
    <div>
      <div>
        <h1 style="text-align:center;margin-bottom: 20px">WORDLE</h1>
      </div>
      {children}
    </div>
  )
}