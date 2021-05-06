<template>
  <div class="chat-box__message" :class="{ 'own' : messageBody.isOwn }">
    <div class="name" v-if="!messageBody.isOwn">{{ messageBody.name }}</div>
    <div class="message">
      {{ messageBody.message }}
      <div class="time">{{ getTime(messageBody.time) }}</div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ['messageBody'],
  methods: {
    getTime(duration) {
      let minutes = parseInt((duration / (1000 * 60)) % 60),
          hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;

      return `${hours}:${minutes}`;
    }
  }
}
</script>
