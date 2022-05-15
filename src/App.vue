<template>
  <div id="app">
    <div id="nav" v-if="!isAdmin">
      <div class="nav-container">
        <router-link to="/" style="padding: 0">
          <img alt="Vue logo" src="./assets/logo.svg" />
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>

        <router-link to="/university/list">Schools</router-link>
        <router-link to="/about">About</router-link>
        <div class="login-button-container">
          <!-- <div class="form-check form-switch" v-if="loggedIn">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              v-model="publish"
              @change="togglePublish"
            />
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Publish</label
            >
          </div> -->
          <button
            v-if="loggedIn"
            class="btn btn-secondary secondary"
            @click="logout()"
          >
            Logout
          </button>
          <router-link v-if="!loggedIn" class="secondary" to="/login"
            >Login</router-link
          >
          <router-link v-if="!loggedIn" class="primary" to="/signup"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
    <div id="nav" v-if="isAdmin">
      <div class="nav-container">
        <router-link to="/admin" style="padding: 0">
          <img alt="Vue logo" src="./assets/logo.svg" />
        </router-link>
        <router-link to="/admin/accounts">Accounts</router-link>
        <router-link to="/admin/universities">Universities</router-link>
        <router-link to="/admin/help">Help Messages</router-link>

      </div>
    </div>
    <router-view class="padding-top" />
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { passAuth } from "./db";
import { getDatabase, onValue, ref, update } from "@firebase/database";

export default {
  data() {
    return {
      loggedIn: false,
      publish: false,
      Uid: "",
      isAdmin: false,
    };
  },
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn() {
      const auth = passAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.loggedIn = true;
          this.Uid = uid;
          this.checkIfPublished(uid);
        } else {
          this.loggedIn = false;
          console.log("user is logged out");
        }
      });
      var urlName = window.location.href
      console.log(urlName);
      this.isAdmin = urlName.includes('admin')
    },
    logout() {
      signOut(passAuth())
        .then(() => {
          this.$router.push("/login");
          console.log("LOGGED OUT");
        })
        .catch(() => {});
    },
    checkIfPublished(uid) {
      const db = getDatabase();
      const query = ref(db, "universities/" + uid);
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        this.publish = data.publish;
      });
    },
    togglePublish() {
      const db = getDatabase();
      const updates = {};
      updates["universities/" + this.Uid + "/publish"] = this.publish;
      update(ref(db), updates)
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Montserrat", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

div#nav {
  background: #fcfcfc;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .nav-container {
  /* max-width: 1480px; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 50px;
}

.container {
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 50px;
}
#nav .nav-container a {
  padding: 0 20px;
}
#nav .nav-container a {
  padding: 0 20px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

#nav .nav-container a:hover,
.router-link-active {
  color: #ff974c;
  transition-delay: 0.1s;
}

#nav .nav-container .login-button-container {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.primary,
.secondary {
  border: 1px solid #ff974c;
  margin: 0 15px;
  padding: 10px 30px !important;
  border-radius: 8px;
}
a.secondary {
  color: #ff974c !important;
}
a.secondary:hover {
  color: #ffffff;
  transition-delay: 0.1s;
}
.login-button-container .seconday:hover {
  color: white;
}
a.primary {
  color: white !important;
  background: #ff974c;
}

a.secondary:hover {
  color: white !important;
  background: #ff974c;
  transition-delay: 0.1s;
}
a.primary:hover {
  background: none;
  border: 1px solid #ff974c;
  color: #ff974c !important;
  transition-delay: 0.1s;
}
#nav {
  position: absolute;
  width: 100%;
  box-shadow: 0 0 30px #ccc;
}
.padding-top {
  padding-top: 80px;
}
.btn-primary {
  background: #ff974c !important;
  border: 1px solid #ff974c !important;
}
.btn-primary:hover {
  background: #f5761a !important;
}
input#flexSwitchCheckChecked {
  height: 30px;
  width: 50px;
  margin-right: 10px;
}
.form-switch {
  padding-left: 2.5em;
  display: flex !important;
  align-items: center;
}
</style>
