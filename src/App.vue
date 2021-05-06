<template>
  <div id="app">
    <Header/>
    <Chat/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import Chat from './components/Chat';

export default {
  name: 'App',
  components: {
    Header, Footer, Chat
  }
}
</script>
