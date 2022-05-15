<!-- eslint-disable prettier/prettier -->
<template>
  <div id="uni-view">
    <div class="container">
      <div class="inner-container">
        <div class="heading-container">
          <div class="details-containers">
            <div class="uni-flex-column">
              <div class="uni-column-img">
                <img :src="SchoopPic" alt="" />
              </div>
              <div class="uni-column">
                <h3>
                  <strong>{{ data.Name }}</strong>
                </h3>
                <h5 style="margin-top: 10px">
                  "{{ data.SchoolDetails.Qoute }}"
                </h5>
                <h4 style="margin-top: 20px"><strong>Address</strong></h4>
                <p>
                  {{ data.Address.Lot }} {{ data.Address.Barangay }}
                  {{ data.Address.City }} {{ data.Address.Country }}
                  {{ data.Address.ZipCode }}
                </p>
                <h4><strong>Contacts</strong></h4>
                <span>{{ data.Phone }}</span>
                <div class="btn-container">
                  <a
                    :href="'https://' + data.Website"
                    target="_blank"
                    rel="noreferrer noopener"
                    ><button class="btn btn-primary">Go to Website</button></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-container second-section">
        <div class="btn-container-two">
          <button
            class="btn btn-primary"
            v-on:click="selected = 'About'"
            :class="{ 'btn-active': selected == 'About' }"
          >
            About School
          </button>
          <button
            class="btn btn-primary"
            @click="selected = 'Programs'"
            :class="{ 'btn-active': selected == 'Programs' }"
          >
            Programs
          </button>
          <button
            class="btn btn-primary"
            @click="selected = 'Requirements'"
            :class="{ 'btn-active': selected == 'Requirements' }"
          >
            Requirements
          </button>
          <button
            class="btn btn-primary"
            @click="selected = 'Performance'"
            :class="{ 'btn-active': selected == 'Performance' }"
          >
            School Performance
          </button>
          <button
            class="btn btn-primary"
            @click="selected = 'Scholarship'"
            :class="{ 'btn-active': selected == 'Scholarship' }"
          >
            Scholarship
          </button>
        </div>
        <div id="About" class="selected-group" v-if="selected == 'About'">
          <div class="logo-container">
            <img :src="data.logoURL" alt="" />
          </div>
          <div class="about-details-container">
            <div>
              <h5 class="primary-color"><strong>About</strong></h5>
              <p>{{ data.SchoolDetails.AboutSchool }}</p>
            </div>
            <div>
              <h5 class="primary-color"><strong>Vision</strong></h5>
              <p>{{ data.SchoolDetails.Vission }}</p>
            </div>
            <div>
              <h5 class="primary-color"><strong>Mission</strong></h5>
              <p>{{ data.SchoolDetails.Mission }}</p>
            </div>
            <div>
              <h5 class="primary-color"><strong>Goal</strong></h5>
              <p>{{ data.SchoolDetails.Goal }}</p>
            </div>
            <div>
              <h5 class="primary-color"><strong>School Type</strong></h5>
              <p>{{ data.SchoolDetails.SchoolType }}</p>
            </div>
          </div>
        </div>
        <div id="Programs" class="selected-group" v-if="selected == 'Programs'">
          <div class="program-heading">
            <h3><strong>Programs</strong></h3>
          </div>
          <div class="group-flex">
            <div
              v-for="program in data.ProgramsOffered"
              v-bind:key="program.Field"
              class="program-container"
            >
              <h5>
                <strong>{{ program.Field }}</strong>
              </h5>
              <h6><strong>Courses</strong></h6>
              <div
                v-for="course in stringSplit(program.programs)"
                v-bind:key="course"
                class="indented"
              >
                <p>{{ course }}</p>
              </div>
              <h6>
                <strong>Tuition:</strong> {{ program.TuitionMin }} -
                {{ program.TuitionMax }}
              </h6>
            </div>
          </div>
        </div>
        <div
          id="Requirements"
          class="selected-group"
          v-if="selected === 'Requirements'"
        >
          <div class="program-heading">
            <h3><strong>Admission Requirements</strong></h3>
          </div>
          <div class="group-flex center">
            <div class="data-container">
              <h5><strong>Deadline for Requirements</strong></h5>
              <h2>{{ data.Requirements.Date }}</h2>
            </div>
            <div class="group-flex center">
              <div class="data-container">
                <h5><strong>Freshmen</strong></h5>
                <p
                  v-for="item in stringSplit(data.Requirements.Freshmen)"
                  :key="item"
                >
                  {{ item }}
                </p>
              </div>
            </div>
            <div class="group-flex center">
              <div class="data-container">
                <h5><strong>Cross-Enrolless </strong></h5>
                <p
                  v-for="item in stringSplit(data.Requirements.CrossEnrolles)"
                  :key="item"
                >
                  {{ item }}
                </p>
              </div>
            </div>
            <div class="group-flex center">
              <div class="data-container">
                <h5><strong>Second Course</strong></h5>
                <p
                  v-for="item in stringSplit(data.Requirements.SecondCourse)"
                  :key="item"
                >
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="Performance"
          class="selected-group"
          v-if="selected === 'Performance'"
        >
          <div class="program-heading">
            <h3><strong>School Performance</strong></h3>
          </div>
          <div class="group-centered">
            <br />
            <h5><strong>Ranking</strong></h5>
            <h1>{{ data.SchoolPerformance.Ranking }} Place in Quezon Province </h1>
            <br />
            <h5><strong>Board Exam Performance</strong></h5>
            <h1>{{ data.SchoolPerformance.BoardPerformance }} Passing Rate</h1>
            <br />
            <div class="performance-others">
              <h5><strong>Others</strong></h5>
              <p
                v-for="others in stringSplit(data.SchoolPerformance.Others)"
                v-bind:key="others"
              >
                {{ others }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="selected-group"
          id="Scholarship"
          v-if="selected === 'Scholarship'"
        >
          <div class="program-heading">
            <h3><strong>Scholarship</strong></h3>
          </div>
          <br />
          <div class="group-centered">
            <h4 v-for="item in stringSplit(data.Scholarship)" v-bind:key="item">
              {{ item }}
            </h4>
          </div>
        </div>
      </div>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d295.61664909642514!2d121.92252934719077!3d13.999647954095922!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1649086065331!5m2!1sen!2sph"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <Loader v-if="isLoading"></Loader>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "../components/loader.vue";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
export default {
  name: "uni-update",
  components: { Loader },

  data() {
    return {
      uid: this.$route.params.uid,
      data: "",
      isLoading: false,
      selected: "About",
      SchoopPic:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png",
      school: {
        name: "Manuel S. Enverga University",
        schoolPic: require("../assets/pexels-photo-207692.jpeg"),
      },
    };
  },
  mounted() {
    this.getUserData(this.uid);
  },
  methods: {
    getPic(pic) {
      return require(pic);
    },
    getUserData(uid) {
      try {
        this.isLoading = true;
        const db = getDatabase();
        const query = ref(db, "universities/" + uid);
        const storage = getStorage();
        onValue(query, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          this.data = data;

          try {
            const logoRef = storageRef(storage, "logo/" + uid + ".png");
            getDownloadURL(logoRef)
              .then((url) => {
                this.showLogo = true;
                this.logoUrl = url;
                this.isLoading = false;
              })
              .catch((e) => {
                console.log(e);
                this.showLogo = false;
                this.logoUrl = "";
                this.isLoading = false;
              });
            if (data.ImageFileName) {
              const schoolImageRef = storageRef(storage, data.ImageFileName);
              getDownloadURL(schoolImageRef).then((url) => {
                this.SchoopPic = url;
                console.log(url);
                this.isLoading = false;
              });
            }
          } catch (e) {
            console.log("error", e);
            this.isLoading = false;
          }
        });
      } catch (e) {
        console.log("error", e);
        this.isLoading = false;
      }
    },
    stringSplit(e) {
      let arrayItem = e.split("\n");
      return arrayItem;
    },
  },
};
</script>

<style>
#uni-view {
  background: #e4eef4;
  min-height: 91vh;
  display: flex;
  justify-content: center;
  padding: 135px 50px 50px 50px;
}
.heading-container {
  text-align: left;
}
.uni-img {
  width: 100%;
  height: 100%;
}
.uni-flex-column {
  display: flex;
}
.uni-column-img img {
  max-width: 530px;
  max-height: 470px;
  width: 100%;
  height: 100%;
}
.uni-column {
  max-width: 60%;
  width: 100%;
  background: #f5f5f5;
  padding: 30px;
  position: relative;
}
.uni-column-img img {
  width: 100%;
}

.btn-container {
  position: absolute;
  bottom: 30px;
}
.btn-container button {
  margin-right: 20px;
}
.inner-container.second-section {
  background: #f0eded;
  padding: 30px !important;
}
.btn-container-two button {
  margin: 0 15px;
}
.btn-container-two {
  margin-top: 20px;
}
div#About {
  padding: 20px;
  display: flex;
  margin-top: 20px;
}
.logo-container {
  max-width: 300px;
  width: 100%;
}
.about-details-container {
  text-align: left;
}
div#Programs {
  padding: 30px;
}
.group-flex {
  display: flex;
  padding-top: 20px;
  flex-wrap: wrap;
}
.program-container {
  width: 50%;
  text-align: left;
  padding-top: 10px;
}
.program-heading {
  padding-top: 30px;
}
.program-container h5 {
  text-align: center;
  color: #ff974c;
}
.indented {
  margin-left: 30px;
}
div#Requirements,
div#Scholarship {
  padding: 30px;
}
.btn-active {
  background: #ff974c !important;
  border: #ff974c !important;
}
div#Performance {
  padding: 30px;
}
.group-centered h5 {
  color: #ff974c;
}

.primary-color {
  color: #ff974c;
}
#uni-view .container {
  box-shadow: 0 0 50px #ccc;
  padding: 0;
}
.group-flex.center {
  display: flex;
  justify-content: center;
}
.group-flex.center {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.group-flex.center h5 {
  color: #ff974c;
}
div#Requirements,
div#Scholarship {
  padding: 30px;
}
</style>