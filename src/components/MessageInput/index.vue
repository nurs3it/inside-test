<template>
  <form @keydown.enter.prevent="send" class="chat-box__form main-form">
    <textarea v-model="message" class="input-style" rows="7"/>
    <div class="row">
      <label class="main-form__item file-field"></label>
      <div class="main-form__submit">
        <button @click.prevent="send" class="radius-button standart rounded">Отправить</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "MessageInput",
  data() {
    return {
      message: ''
    }
  },
  methods: {
    send() {
      this.$emit('send', this.message);
    },
    clearMessage() {
      this.message = ''
    }
  }
}
</script>
