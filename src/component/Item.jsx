export default function Item({ children, key, position, row, rIndex, it }) {
  return (
    <div class={position.formate((e) => { 
      let cl = it.type !== null ? `${it.type} `: "";

      if (e === key && row.value === rIndex) {
        cl += "item active";
        return cl;
      }
      cl += "item";
      return cl;
    })}>
      <div>{children}</div>
    </div>
  )
}