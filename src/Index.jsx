import "./style.scss";
import { ref } from "orve";

import LetterBlock from "./component/LetterBlock";
import Keyboard from "./component/Keyboard";

function setup() {
  const array = [
    ref(["", "", "", "", ""].map(() => ({ value: "", type: null }))),
    ref(["", "", "", "", ""].map(() => ({ value: "", type: null }))),
    ref(["", "", "", "", ""].map(() => ({ value: "", type: null }))),
    ref(["", "", "", "", ""].map(() => ({ value: "", type: null }))),
    ref(["", "", "", "", ""].map(() => ({ value: "", type: null })))
  ]
  const position = ref(0);
  const row = ref(0);

  const arKeys = [
    ref("qwertyuiop".split("").map((e) => {
      return {
        name: e,
        type: null
      }
    })),
    ref("asdfghjkl".split("").map((e) => {
      return {
        name: e,
        type: null
      }
    })),
    ref("zxcvbnm".split("").map((e) => {
      return {
        name: e,
        type: null
      }
    })),
  ]

  return {
    array,
    position,
    row,
    arKeys
  }
}

export default function Index() {
  const {
    array,
    position,
    row,
    arKeys
  } = setup();
  
  const getLoger = (e) => {
    const key = e.key.toLowerCase();
    const line = array[row.value];
    if (key === "enter") {
      const word = line.value.reduce((a,b) => a + b.value, "");
      if (word.length === 5) {
        if(this.$word.exist(word)) {
          if (row.value <= 4) {
            const guestWord = this.$word.currentWord;
            line.value = line.value.map((e, i) => {
              if (e.value === guestWord[i]) {
                return {...e, type: "done"}
              } else if (guestWord.includes(e.value)) {
                return {...e, type: "have"}
              } else {
                return {...e, type: "none"};
              }
            });

            line.value.forEach(key => {
              let indexAr;
              if ('qwertyuiop'.includes(key.value)) {
                indexAr = 0
              } else if ('asdfghjkl'.includes(key.value)) {
                indexAr = 1
              } else if ('zxcvbnm'.includes(key.value)) {
                indexAr = 2
              }
              const index = arKeys[indexAr].value.findIndex((i) => i.name === key.value);
              arKeys[indexAr].value[index] = { ...arKeys[indexAr].value[index], type: key.type}
            });

            if (line.value.reduce((a, b) => {
              if (b.type === "done") {
                a += 1;
              }
              return a;
            }, 0) === 5) {
              this.$modal.showModal(`WIN!!!!! reload after 3 seconds`, "WIN");
              hooks.unmounted();

              let c = 3;
              setInterval(() => {
                if (c > 0) {
                  c--;
                  this.$modal.showModal(`WIN!!!!! reload after ${c} seconds`, "WIN");
                } else {
                  window.location.reload();
                }
              }, 1000)
            } else if (row.value === 4) {
              this.$modal.showModal(`No! It was the word "${this.$word.currentWord.toUpperCase()}". Reload after 3 seconds`, "LOSE (");
              hooks.unmounted();

              let c = 3;
              setInterval(() => {
                if (c > 0) {
                  c--;
                  this.$modal.showModal(`No! It was the word "${this.$word.currentWord.toUpperCase()}". Reload after ${c} seconds`, "LOSE (");
                } else {
                  window.location.reload();
                }
              }, 1000)
            }

            if (row.value !== 4) {
              row.value += 1;
              position.value = 0;
            }
          }
        } else {
          this.$modal.showModal("This word could not be found in our database", "Error");
          line.value = [{value: "", type: null}, {value: "", type: null}, {value: "", type: null}, {value: "", type: null}, {value: "", type: null}]
          position.value = 0;
        }
      } else {
        this.$modal.showModal("All fields must be filled", "Error");
      }
      return;
    }

    if (key === "backspace" && position.value >= 0) {
      if (line.value[position.value].value !== "") {
        line.value[position.value] = { value: "", type: null };
      } else {
        if (position.value - 1 > -1)
          position.value -= 1;
        line.value[position.value] = { value: "", type: null };
      }
      return;
    } 

    if (key.length === 1 && /[a-z]/.test(key)) {
      if (position.value < 4) {
        line.value[position.value] = { ...line.value[position.value], value: key };
        position.value += 1;
      } else if (position.value === 4 && line.value[position.value].value === "") {
        line.value[position.value] = { ...line.value[position.value], value: key };
      }
    }
  }

  const hooks = {
    mounted() {
      document.addEventListener("keyup", getLoger);
    },
    unmounted() {
      document.removeEventListener("keyup", getLoger);
    }
  };
  return (
    <div o-hooks={hooks}>
      <LetterBlock array={array} row={row} position={position} />
      <Keyboard arKeys={arKeys} getLoger={getLoger} />
    </div>
  )
}