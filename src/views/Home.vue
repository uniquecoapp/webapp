<template>
  <div class="home">
    <div class="container home-divider">
      <div class="column">
        <h1>Welcome!</h1>
        <img src="../assets/large-logo.png" alt="" />
      </div>
      <div class="column">
        <img src="../assets/home-pic.png" style="margin: 0 auto" alt="" />
      </div>
    </div>
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from "../components/chat.vue";

export default {
  name: "Home",
  components: { Chat },
};
</script>

<style>
.home {
  background: #ff974c;
  height: 100vh;
}

.column {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

h1.welcome-text {
  padding-top: 170px;
  text-align: left;
  font-size: 55px;
  color: black;
  line-height: 0;
}
.container.home-divider {
  display: flex;
  height: 100%;
}
img {
  max-width: 100%;
}

img.next-btn {
  max-width: 100px;
  margin-top: 30px;
  margin: 0 auto;
}
svg.svg-inline--fa.fa-circle-right {
  font-size: 120px;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
