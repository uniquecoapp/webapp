<!-- eslint-disable prettier/prettier -->

<template>
  <div id="my-profile">
    <h1>My Profile</h1>
    <div class="profile-form-container">
      <div class="mb-3" style="margin-top: 50px">
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="uploadImage"
        />
        <label for="formFile" class="form-label">School Logo</label>
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="uniName"
          placeholder="My university"
          v-model="dataProp.Name"
        />
        <label for="uniName" class="form-label">School Name</label>
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="dataProp.Email"
        />
        <label for="email" class="form-label">Email address</label>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="website"
          placeholder="www.uniqueco.com"
          v-model="dataProp.Website"
        />
        <label for="website" class="form-label">Website</label>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="firstName"
          placeholder="First name"
          v-model="dataProp.CreatedBY.FirstName"
        />
        <label for="firstName" class="form-label">First Name</label>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="lastName"
          placeholder="First name"
          v-model="dataProp.CreatedBY.LastName"
        />
        <label for="lastName" class="form-label">Last Name</label>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="phone"
          placeholder="PhoneNumber"
          v-model="dataProp.Phone"
        />
        <label for="lastName" class="form-label">Phone number</label>
      </div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        @click="updateProfile()"
      >
        Save
      </button>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import { getDatabase, ref, update } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as StorageRef,
  uploadBytes,
} from "firebase/storage";

export default {
  name: "Profile",
  components: {},
  props: ["dataProp", "isLoading"],
  data: function () {
    return {
      imageUri: "",
      imageFile: "",
      path: "",
    };
  },
  mounted() {},
  methods: {
    updateProfile() {
      this.$emit("setLoading", true);
      let data = this.dataProp;
      if (this.imageFile !== "") {
        const storage = getStorage();
        const logoRef = StorageRef(
          storage,
          "logo/" + this.dataProp.Uid + ".png"
        );
        uploadBytes(logoRef, this.imageFile[0]).then((r) => {
          console.log(r);
          this.$emit("resetLogo");
          getDownloadURL(StorageRef(logoRef)).then((url) => {
            data.logoURL = url
            const db = getDatabase();
            const updates = {};
            updates["universities/" + data.Uid] = data;
            update(ref(db), updates)
              .then(() => {
                this.$emit("setLoading", false);
              })
              .catch((e) => {
                console.log(e);
                this.$emit("setLoading", false);
              });
          });
        });
      } else {
        const db = getDatabase();
        const updates = {};
        updates["universities/" + data.Uid] = data;
        update(ref(db), updates)
          .then(() => {
            this.$emit("setLoading", false);
          })
          .catch((e) => {
            console.log(e);
            this.$emit("setLoading", false);
          });
      }
    },

    uploadImage(event) {
      console.log(event);
      this.imageFile = event.target.files;
    },
  },
};
</script>

<style scoped>
#my-profile {
  padding: 50px;
}
#my-profile h1 {
  margin-top: 30px;
}

#my-profile .profile-form-container {
  max-width: 500px;
  margin: 0 auto;
}
#my-profile input {
  text-align: center;
  margin-bottom: 10px;
}
button.btn.btn-primary.btn-lg.btn-block {
  width: 100%;
}
</style>
