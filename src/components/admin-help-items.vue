<template>
  <div id="Articles">
    <div class="article-header-container">
      <h2>Help Items</h2>
      <button
        class="btn btn-primary primary"
        style="margin-left: 20px"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
            <th scope="col" style="width:150px">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in data" :key="key">
            <td class="text-left">{{ item.title }}</td>
            <td class="text-left" v-text="item.content"></td>
            <td class="articles-btn-container">
              <!-- <button class="btn btn-secondary" @click="viewArticle(key)">
                View
              </button> -->
              <button
                class="btn btn-primary"
                @click="goToEdit(key)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit
              </button>
              <button
                class="btn btn-warning"
                style="margin-left: 20px"
                @click="deleteItem(key)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Help Content
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Title</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Content</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="content"
                required
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="clearForm"
              ref="Close"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveItem(key)"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, onValue, ref, update } from "@firebase/database";
export default {
  name: "Articles",
  components: {},
  props: ["dataProps"],
  data: function () {
    return {
      data: "",
      searchString: "",
      originalData: "",
      title: "",
      content: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    clearForm() {
      this.title = "";
      this.content = "";
      this.key = ''
    },
    saveItem(key) {
      let title = this.title;
      let content = this.content;
      let randomID = "";
      if (!key) {
        randomID = this.makeid(7);
      } else {
        randomID = key;
      }
      const db = getDatabase();
      const updates = {};

      updates["helpItems/" + randomID + "/title"] = title;
      updates["helpItems/" + randomID + "/content"] = content;

      update(ref(db), updates)
        .then(() => {
          console.log("Success in Uploading the Content");
          this.title = "";
          this.content = "";
          this.key = ''
          this.$refs.Close.click();
        })
        .catch((e) => {
          console.log(e);
          console.log("Failed in Uploading");
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
    goToEdit(key) {
      console.log(key);
      let data = this.data
      console.log(data)
      this.title = data[key].title;
      this.content = data[key].content;
      this.key = key
    },
    deleteItem(key) {
      const db = getDatabase()
      const updates = {}
      updates['helpItems/' + key] = null
      update(ref(db), updates).then(()=> {
        console.log('deleted')
      })
    },

    getData() {
      const db = getDatabase();
      const query = ref(db, `helpItems/`);
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
    search() {
      let searchString = this.searchString;
      searchString = searchString.toLowerCase();
      let result = {};
      for (const prop in this.originalData) {
        let title = this.originalData[prop].title;
        title = title.toLowerCase();
        if (title.includes(searchString)) {
          result[prop] = this.originalData[prop];
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