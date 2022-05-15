<template>
  <div id="article-new">
    <div class="article-heading">
      <h2>Edit Article</h2>
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
          v-model="dataProps.articles[selectedArticle].title"
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
          v-model="dataProps.articles[selectedArticle].content"
        ></textarea>
      </div>
    </div>
    <div class="article-btn-container">
      <button class="btn btn-primary" @click="publichArticle">Publish</button>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, update } from "firebase/database";
import {
  uploadBytes,
  getStorage,
  ref as StorageRef,
  getDownloadURL,
  // getDownloadURL,
} from "@firebase/storage";

export default {
  name: "EditArticle",
  props: ["dataProps", "selectedArticle"],
  data: function () {
    return {
      imageURL: "",
      imageChanged: false,
      imageFile: "",
    };
  },
  mounted() {
    console.log(this.dataProps);
    this.setImageURL();
  },
  _methods: {
    setImageURL() {
      this.imageURL =
        this.dataProps.articles[this.selectedArticle].articleImageURL;
    },
    uploadPhoto(e) {
      console.log(e);
      const file = e.target.files[0];
      this.imageFile = file;
      this.imageURL = URL.createObjectURL(file);
      this.imageChanged = true;
    },
    publichArticle() {
      let content = this.dataProps.articles[this.selectedArticle].content;
      let title = this.dataProps.articles[this.selectedArticle].title;
      let file = this.imageFile;
      if (this.imageChanged) {
        const storage = getStorage();
        const articlePic = StorageRef(
          storage,
          `article/${this.selectedArticle}-${file.name}`
        );

        uploadBytes(articlePic, this.imageFile).then((r) => {
          console.log(r);
          getDownloadURL(StorageRef(articlePic)).then((url) => {
            let articleImageURL = url;

            let data = {
              content: content,
              title: title,
              articleImageURL: articleImageURL,
              dateCreated: Date().toLocaleString(),
            };
            const db = getDatabase();
            const updates = {};
            updates[
              `universities/${this.dataProps.Uid}/articles/${this.selectedArticle}`
            ] = data;
            update(ref(db), updates)
              .then((e) => {
                console.log(e);
              })
              .catch((e) => {
                console.log(e);
              });
          });
        });
      } else {
        let data = {
          content: content,
          title: title,
          articleImageURL: this.imageURL,
          dateCreated: Date().toLocaleString(),
        };
        const db = getDatabase();
        const updates = {};
        updates[
          `universities/${this.dataProps.Uid}/articles/${this.selectedArticle}`
        ] = data;
        update(ref(db), updates)
          .then((e) => {
            console.log(e);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  get methods() {
    return this._methods;
  },
  set methods(value) {
    this._methods = value;
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