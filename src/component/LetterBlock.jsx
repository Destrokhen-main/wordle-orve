import Item from "./Item";

export default function ({array, row, position}){
  return (
    <div class="wrapper">
      <div class="block-i">
      {
        array.map((e, rIndex) => {
          return (
            <div class="line">
              {
                e.forList((n, i) => {
                  return <Item key={i} row={row} rIndex={rIndex} position={position} it={n}>{n.value.toUpperCase()}</Item>
                })
              }
            </div>
          )
        })
      }
      </div>
    </div>
  )
}