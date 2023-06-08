export default function({ arKeys, getLoger }) {
  return (
    <div class="keyboard">
      {
        arKeys.map((e, i) => {
          return (
            <div class="keys">
              {e.forList((k) => {
                const st = ["key-item"];
                if (k.type !== null) {
                  st.push(k.type);
                }

                return (
                  <div class={st.join(" ")} onClick={() => { getLoger({ key: k.name }) }}>
                    <div>
                      {k.name.toUpperCase()}
                    </div>
                  </div>
                )
              })}
              { i === 0 ? <div class="key-item ent" onClick={() => { getLoger({ key: "backspace" }) }}>Del</div> : "" }
              { i === arKeys.length - 1 ? <div class="key-item ent" onClick={() => { getLoger({ key: "enter" }) }}>Enter</div> : "" }
            </div>
          )
        })
      }
    </div>
  )
}