<template>
  <div class="overlay">
    <img src="../assets/Loading_icon.gif" alt="" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Loader",
  components: {},
  data: function () {
    return {
      count: 0,
    };
  },
};
</script>


<style>
.overlay {
  position: absolute;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8080805c;
  z-index: 99999;
  top: 0;
}
.overlay img {
  max-width: 100px;
}
</style>