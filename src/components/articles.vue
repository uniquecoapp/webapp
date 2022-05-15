<template>
  <div id="Articles">
    <div class="article-header-container">
      <h2>Articles</h2>
      <button
        class="btn btn-primary primary"
        style="margin-left: 20px"
        @click="addNewArticle"
      >
        Add new
      </button>
      <div class="search-group-container">
        <div class="input-group mb-3 input-group-lg">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            @input="search"
            v-model="searchString"
          />
          <button
            class="btn btn-primary"
            @click="search"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="articles-list-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date Created</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in data" :key="key">
            <td class="text-left">{{ item.title }}</td>
            <td class="text-left" v-text="textSlice(item.dateCreated)"></td>
            <td class="articles-btn-container">
              <button class="btn btn-secondary" @click="viewArticle(key)">
                View
              </button>
              <button
                class="btn btn-primary"
                @click="goToEdit(key)"
                style="margin-left: 30px"
              >
                Edit</button
              ><button
                style="margin-left: 30px"
                @click="deleteArticle(key)"
                class="btn btn-warning"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getDatabase, onValue, ref, set } from "@firebase/database";
export default {
  name: "Articles",
  components: {},
  props: ["dataProps"],
  data: function () {
    return {
      data: "",
      searchString: "",
      originalData: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    goToEdit(key) {
      this.$emit("setEditArticle", key);
    },
    deleteArticle(key) {
      this.$emit("setLoading", true);
      let data = this.dataProps;
      const db = getDatabase();
      set(ref(db, `universities/${data.Uid}/articles/${key}`), {}).then(
        (result) => {
          console.log(result);
        }
      );
    },
    addNewArticle() {
      this.$emit("setPage", "NewArticle");
    },
    getData() {
      let Uid = this.dataProps.Uid;
      const db = getDatabase();
      const query = ref(db, `universities/${Uid}/articles`);
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        this.data = data;
        this.originalData = data;
      });
    },
    textSlice(item) {
      return item.slice(0, 28);
    },
    viewArticle(key) {
      this.$router.push(`articles/${this.dataProps.Uid}/${key}`);
    },
    search() {
      let searchString = this.searchString;
      searchString = searchString.toLowerCase();
      let result = {};
      for (const prop in this.originalData) {
        let title = this.originalData[prop].title;
        title = title.toLowerCase();
        if (title.includes(searchString)) {
          result[prop] = this.originalData[prop]
        }
      }
      this.data = result;
    },
  },
};
</script>


<style scoped>
div#Articles {
  padding: 40px;
}
.article-header-container {
  display: flex;
  padding-bottom: 30px;
}
.text-left {
  text-align: left;
}
.articles-btn-container {
  display: flex;
  justify-content: left;
}
.input-group.mb-3 {
  margin-bottom: 0 !important;
}
.search-group-container {
  margin-left: auto;
}
#Articles {
  text-align: left;
}
</style>