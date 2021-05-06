<template>
  <div class="custom-page">
    <div class="container medium">
      <WelcomeMessage/>
    </div>
    <div class="custom-page__chat" id="scrollingBlock">
      <div class="container medium">
        <div class="chat-box">
          <div class="chat-box__messages">
            <template v-for="(messageBody, index) in messages">
              <div :key="index">
                <div class="clear"></div>
                <Message :message-body="messageBody" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="container medium custom-page__input">
      <MessageInput ref="input" @send="sendMessage"/>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message";
import WelcomeMessage from "@/components/WelcomeMessage";
import MessageInput from "@/components/MessageInput";

export default {
  name: "Chat",
  components: {MessageInput, WelcomeMessage, Message},
  data() {
    return {
      connection: null,
      messages: [],
      hasError: false,
      closed: true,
    }
  },
  created() {
    this.connect();
  },
  methods: {
    sendMessage(message) {
      if (message.length) {
        const ourMessage = {
          isOwn: true,
          name: 'Имя клиента',
          message: message,
          time: Date.now(),
        }
        this.connection.send(JSON.stringify(ourMessage));
        this.messages.push(ourMessage)
        this.$refs.input.clearMessage();
        this.scrollTOBottom();
      }
    },
    scrollTOBottom() {
      const element = document.getElementById("scrollingBlock");
      element.scrollTop = element.scrollHeight;
    },
    connect() {
      this.connection = new WebSocket("ws://skade.cc:38080/");

      this.connection.onopen = (event) => {
        console.log('opened -', event.composedPath());
        this.hasError = false;
        this.closed = false;
      }

      this.connection.onclose = (event) => {
        console.log('closed -', event);
        this.closed = true;
      }

      this.connection.onerror = (event) => {
        console.log('error -', event);
        this.connection = null;
        this.hasError = true;
        this.connect();
      }

      this.connection.onmessage = ({data}) => {
        data = JSON.parse(data);
        console.log('onmessage - ', data);
        this.messages.push({
          isOwn: false,
          name: data?.name,
          message: data?.message,
          time: data?.time,
        })
      }
    }
  }
}
</script>

<style>
.custom-page {
  position: relative;
}

.custom-page__chat {
  overflow: scroll;
  position: relative;
  min-height: 0;
  max-height: 500px;
}

.custom-page__input {
  margin-top: 24px;
}
</style>
