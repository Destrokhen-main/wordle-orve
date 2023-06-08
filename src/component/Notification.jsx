import { oif, ref } from "orve"

export default function() {
  this.$modal = {
    show: ref(false),
    text: ref(""),
    title: ref("Error"),
    timer: null,
    showModal: function(text, title = null, timer = 3000) {
      if (title !== null) {
        this.title.value = title;
      }
      this.show.value = true;
      this.text.value = text;

      if (this.timer !== null) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show.value = false;
      }, timer)
    },
    disabledWindow: function() {
      if (this.timer !== null)
        clearTimeout(this.timer)
      
      this.show.value = false;
    }
  }

  return (
    <>
      {
        oif(() => this.$modal.show.value, [this.$modal.show], 
          <div class="toast">
            <div class="toast__head">
              <div class="toast__head__title">{this.$modal.title}</div>
              <div class="toast__head__exit" onClick={() => this.$modal.disabledWindow()}>+</div>
            </div>
            <div class="toast__body">{this.$modal.text}</div>
          </div>
        )
      }
    </>
  )
}