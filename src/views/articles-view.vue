<template>
  <div>
    <Loader v-if="isLoading"></Loader>
    <div id="article-view">
      <div class="container">
        <div class="inner-container">
          <div class="articles-image-container">
            <img :src="data.articleImageURL" alt="" />
          </div>
          <div class="articles-header-container">
            <h1>{{ data.title }}</h1>
            <h5>{{ textSlice(data.dateCreated) }}</h5>
          </div>
          <div class="articles-content-container">
            <p style="white-space: pre-line">{{ data.content }}</p>
          </div>
        </div>
        <div class="article-university-container">
          <div class="article-logo-container">
            <img :src="unidata.logoURL" alt="" />
          </div>
          <div class="article-uni-details-container">
            <h2>
              <strong>{{ unidata.Name }}</strong>
            </h2>
            <div class="btn-container-articles">
              <button class="btn btn-primary" style="margin-right:30px" @click="goToUniversity">
                View University
              </button>
              <button class="btn btn-secondary" @click="goToWebsite">
                Go To Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "../components/loader.vue";

export default {
  name: "articles-view",
  components: { Loader },
  data() {
    return {
      uid: this.$route.params.uid,
      articleID: this.$route.params.articlesID,
      data: "",
      unidata: "",
      isLoading: false,
    };
  },
  mounted() {
    this.getArticleData();
    window.scrollTo(0, 0);
  },
  methods: {
    getArticleData() {
      this.isLoading = true;
      let uid = this.uid;
      let articleID = this.articleID;
      console.log(uid, articleID);
      const db = getDatabase();
      const query = ref(db, `universities/${uid}/articles/${articleID}`);
      onValue(query, (snapshopt) => {
        const data = snapshopt.val();
        console.log(data);
        this.data = data;
      });

      const queryTwo = ref(db, `universities/${uid}`);
      onValue(queryTwo, (snapshopt) => {
        const data = snapshopt.val();
        console.log(data);
        this.unidata = data;
        this.isLoading = false;
      });
    },
    textSlice(item) {
      console.log(typeof item);
      return item.slice(0, 28);
    },
    goToUniversity() {
      this.$router.push(`/university/view/${this.unidata.Uid}`);
    },
    goToWebsite() {
      let url = this.unidata.Website;
      window.open(url, "_blank").focus();
    },
  },
};
</script>

<style>
div#article-view {
  padding: 150px 50px 50px 50px;
}
.articles-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
.articles-header-container {
  margin-bottom: 30px;
}
.articles-content-container {
  padding: 0 30px;
}
.articles-content-container p {
  text-align: justify;
  font-size: 18px !important;
  line-height: 35px;
}
.article-university-container {
  padding: 30px;
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background: #efefef;
  border-radius: 5px;
  box-shadow: 0 0 30px #b7b3b3;
}
.article-uni-details-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
}
.btn-container-articles {
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
}
</style>