<!-- eslint-disable prettier/prettier -->
<template>
  <div class="login">
    <div class="form-container">
      <h2 class="form-header">Login</h2>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="Email"
          placeholder="Email"
          v-model="form.email"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
      <button
        type="button"
        class="btn btn-primary-final space"
        @click="login()"
      >
        Login
      </button>
      <router-link to="/about">Forgot Password?</router-link>
    </div>
    <Loader v-if="loader"> </Loader>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
// import { passAuth } from "../db"
// import { signInWithEmailAndPassword } from firebase/auth;
import { signInWithEmailAndPassword } from "firebase/auth";
import { passAuth } from "../db";
import Loader from "../components/loader.vue";

export default {
  name: "Login",
  components: { Loader },
  data() {
    return {
      loader:false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.loader = true
      try {
        let email = this.form.email;
        let password = this.form.password;
        console.log(email, password);
        signInWithEmailAndPassword(passAuth(), email, password)
          .then((r) => {
            const user = r.user;
            console.log(user);
            this.$router.push("/dashboard");
            this.loader = false
          })
          .catch(() => {
            this.showAlertError("Email or Password is wrong!");
            this.loader = false
          });
      } catch (error) {
        this.showAlertError("Something went wrong!");
        this.loader = false
      }
    },
    showAlertError(log) {
      this.$swal({
        icon: "error",
        title: "Failed to Login",
        text: log,
      });
    },
  },
};
</script>

<style>
.login {
    background: #e4eef4;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
}

.form-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  border-radius: 7px;
  background: #f5f5f5;
  height: auto;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
}

.btn-primary-final:hover {
  background-color: #f7ab76;
  color: white;
}

.btn-primary-final {
  color: #fff;
  background-color: #ff974c;
  border-color: #ff974c;
  width: 100%;
}
.space {
  margin-bottom: 20px;
}
</style>
