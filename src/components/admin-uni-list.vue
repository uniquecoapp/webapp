<template>
  <div id="Articles">
    <div class="article-header-container">
      <h2>University List</h2>
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
            <th scope="col">University list</th>
            <th scope="col">Date Created</th>
            <th scope="col">Action</th>
            <th scope="col">Publish</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in data" :key="key" v-show="!item.Admin">
            <td class="text-left">{{ item.Name }}</td>
            <td class="text-left" v-text="textSlice(item.DateCreated)"></td>
            <td class="articles-btn-container">
              <!-- <button class="btn btn-secondary" @click="viewArticle(key)">
                View
              </button> -->
              <button class="btn btn-primary" @click="goToView(key)">
                View
              </button>
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  v-model="item.publish"
                  @change="(e) => togglePublish(item.publish, key)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getDatabase, onValue, ref, set,update } from "@firebase/database";
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
    goToView(key) {
      this.$router.push("/university/view/" + key)
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
      const db = getDatabase();
      const query = ref(db, `universities/`);
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        this.data = data;
        this.originalData = data;
      });
    },
    textSlice(item) {
      let d = new Date(item);
      d = d.toString();
      return d.slice(0, 21);
    },
    viewArticle(key) {
      this.$router.push(`articles/${this.dataProps.Uid}/${key}`);
    },
    search() {
      let searchString = this.searchString;
      searchString = searchString.toLowerCase();
      let result = {};
      for (const prop in this.originalData) {
        let title = this.originalData[prop].Name;
        title = title.toLowerCase();
        if (title.includes(searchString)) {
          result[prop] = this.originalData[prop];
        }
      }
      this.data = result;
    },
    togglePublish(event, key) {
        const db = getDatabase();
      const updates = {};
      console.log(event,key)
      updates["universities/" + key + "/publish"] = event;
      update(ref(db), updates).then(() => {
        console.log("Success");
      });
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