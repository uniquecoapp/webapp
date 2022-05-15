<template>
  <div id="article-new">
    <div class="article-heading">
      <h2>New Article</h2>
    </div>

    <div class="article-forms-container">
      <div class="mb-3">
        <label for="formFile" class="form-label">Article Image</label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="uploadPhoto"
        />
      </div>
      <div class="article-img-preview">
        <img :src="imageURL" alt="" />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="title"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Content</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="30"
          v-model="content"
        ></textarea>
      </div>
    </div>
    <div class="article-btn-container">
      <button class="btn btn-primary" @click="publichArticle">Publish</button>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";
import {
  uploadBytes,
  getStorage,
  ref as StorageRef,
  getDownloadURL,
  // getDownloadURL,
} from "@firebase/storage";

export default {
  name: "addArticle",
  props: ["dataProps"],
  data: function () {
    return {
      data: "test",
      imageURL: "",
      title: "",
      content: "",
      imageFile: "",
    };
  },
  methods: {
    uploadPhoto(e) {
      console.log(e);
      const file = e.target.files[0];
      this.imageFile = file;
      this.imageURL = URL.createObjectURL(file);
    },
    publichArticle() {
      this.$emit("setLoading", true);
      let title = this.title;
      let file = this.imageFile;
      let content = this.content;
      let dateToday = Date().toLocaleString();
      let articleID = this.makeid(6);
      let uid = this.dataProps.Uid;
      console.log(title, file, content, dateToday, articleID, uid);
      const storage = getStorage();
      const db = getDatabase();
      const schoolPicRef = StorageRef(
        storage,
        `article/${articleID}-${file.name}`
      );

      uploadBytes(schoolPicRef, this.imageFile)
        .then((r) => {
          console.log(r);
          getDownloadURL(StorageRef(schoolPicRef)).then((url) => {
            let articleImageURL = url;
            set(ref(db, `universities/${uid}/articles/${articleID}`), {
              title: title,
              dateCreated: dateToday,
              content: content,
              articleImageURL: articleImageURL,
            }).then(() => {
              this.$emit("setLoading", false)
              this.$emit("setPage", 'Articles');
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>
<style scoped>
#article-new {
  padding: 50px;
}
.article-btn-container {
  margin-top: 20px;
  display: flex;
}
.article-forms-container {
  margin-top: 40px;
  text-align: left;
}
.article-heading h2 {
  text-align: left;
}
.article-img-preview {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>