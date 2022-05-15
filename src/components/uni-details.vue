<!-- eslint-disable prettier/prettier -->

<template>
  <div id="uni-details">
    <div class="details-btn-container">
      <button class="btn btn-primary" @click="goToView">VIEW</button>
      <button class="btn btn-primary" @click="saveData">SAVE</button>
    </div>
    <div class="details-container">
      <div class="heading-container">
        <h3>
          <strong>PLEASE FILL UP THE SCHOOL DETAILS/INFORMATION BELOW</strong>
        </h3>
      </div>
      <div class="outer-form-group-container">
        <div class="form-group-container">
          <div class="form-input-heaeding-container">
            <h4>
              <strong>Address</strong>
            </h4>
          </div>
          <div class="form-input-container">
            <div class="mb-3">
              <label for="Address-Barangay" class="form-label">Lot</label>
              <input
                type="text"
                class="form-control"
                id="Address-Barangay"
                v-model="data.Address.Lot"
              />
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="Address-Lot" class="form-label">Barangay</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Address-Lot"
                    v-model="data.Address.Barangay"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="Address-City" class="form-label"
                    >City/Municipality</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="Address-City"
                    v-model="data.Address.City"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="Address-Country" class="form-label"
                    >Province</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="Address-Country"
                    v-model="data.Address.Country"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="Address-Zip" class="form-label">Zip Code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Address-Zip"
                    v-model="data.Address.Zipcode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-container">
          <div class="form-input-heaeding-container">
            <h4>
              <strong>School Details</strong>
            </h4>
          </div>
          <div class="form-input-container">
            <div class="mb-3">
              <label for="School-qoute" class="form-label">School Quote</label>
              <input
                type="text"
                class="form-control"
                id="School-qoute"
                v-model="data.SchoolDetails.Qoute"
              />
            </div>
            <div class="mb-3">
              <label for="Details-About" class="form-label">About School</label>
              <textarea
                class="form-control"
                id="Details-About"
                rows="2"
                v-model="data.SchoolDetails.AboutSchool"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="Details-Mission" class="form-label">Mission</label>
              <textarea
                class="form-control"
                id="Details-Mission"
                rows="2"
                v-model="data.SchoolDetails.Mission"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="Details-Vission" class="form-label">Vision</label>
              <textarea
                class="form-control"
                id="Details-Mission"
                rows="2"
                v-model="data.SchoolDetails.Vission"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="Details-Goals" class="form-label">Goals</label>
              <textarea
                class="form-control"
                id="Details-Goals"
                rows="2"
                v-model="data.SchoolDetails.Goal"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="School-Type" class="form-label">School Type</label>
              <textarea
                class="form-control"
                id="School-Type"
                rows="2"
                v-model="data.SchoolDetails.SchoolType"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="form-group-container">
          <div class="form-input-heaeding-container">
            <h4><strong>Programs Offered</strong></h4>
          </div>
          <div
            class="form-input-container"
            v-for="(program, key, index) in data.ProgramsOffered"
            :key="key"
          >
            <div class="mb-3">
              <label :for="key + '-Field-Name'" class="form-label"
                >Field Name</label
              >
              <input
                type="text"
                class="form-control"
                :id="key + '-Field-Name'"
                placeholder="Field Name"
                v-model="data.ProgramsOffered[key].Field"
              />
            </div>
            <div class="mb-3">
              <label :for="key + '-Programs'" class="form-label"
                >Programs</label
              >
              <textarea
                class="form-control"
                :id="key + '-Programs'"
                rows="2"
                v-model="data.ProgramsOffered[key].programs"
              ></textarea>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label :for="key + '-Tuition-Min'" class="form-label"
                    >Tuition Fee Min</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="key + '-Tuition-Min'"
                    v-model="data.ProgramsOffered[key].TuitionMin"
                  />
                </div>
              </div>
              <div class="col order-5">
                <div class="mb-3">
                  <label :for="key + '-Tuition-Max'" class="form-label"
                    >Tuition Fee Max</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="key + '-Tuition-Max'"
                    v-model="data.ProgramsOffered[key].TuitionMax"
                  />
                </div>
              </div>
            </div>
            <button
              class="btn btn-warning delete-program-btn"
              @click="removePrograms(key)"
            >
              Delete Program
            </button>
            <hr
              v-if="index != Object.keys(data.ProgramsOffered).length - 1"
              style="margin-top: 70px"
            />
          </div>
          <div class="add-btn-container">
            <button
              style="margin-top: 20px"
              type="button"
              class="btn btn-primary"
              @click="appendPrograms"
            >
              Add Program
            </button>
          </div>
        </div>
        <div class="form-group-container">
          <div class="form-input-heaeding-container">
            <h4><strong>School Performance</strong></h4>
          </div>
          <div class="form-input-container">
            <div class="mb-3">
              <label for="Performance-Ranking" class="form-label"
                >Rankings</label
              >
              <input
                type="email"
                class="form-control"
                id="Performance-Ranking"
                v-model="data.SchoolPerformance.Ranking"
              />
            </div>
            <div class="mb-3">
              <label for="school-performance-board-exam" class="form-label"
                >Board Exam Performance</label
              >
              <input
                type="email"
                class="form-control"
                id="school-performance-board-exam"
                v-model="data.SchoolPerformance.BoardPerformance"
              />
            </div>
            <div class="mb-3">
              <label for="school-performance-others" class="form-label"
                >Others</label
              >
              <textarea
                class="form-control"
                id="school-performance-others"
                cols="30"
                rows="3"
                v-model="data.SchoolPerformance.Others"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="form-group-container">
          <div class="form-input-heaeding-container">
            <h4><strong>Admission Requirements</strong></h4>
          </div>
          <div class="form-input-container">
            <div class="mb-3">
              <label for="Requirements-deadline" class="form-label"
                >Deadline</label
              >
              <input
                type="date"
                class="form-control"
                id="Requirements-deadline"
                v-model="data.Requirements.Date"
              />
            </div>
            <h5 style="margin-top: 20px">Requirements</h5>
            <div class="mb-3">
              <label for="requirements-freshmen" class="form-label"
                >Freshmen</label
              >
              <textarea
                class="form-control"
                id="requirements-freshmen"
                rows="2"
                v-model="data.Requirements.Freshmen"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="requirements-cross-enrolles" class="form-label"
                >Cross-Enrolles</label
              >
              <textarea
                class="form-control"
                id="requirements-cross-enrolles"
                srows="2"
                v-model="data.Requirements.CrossEnrolles"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label for="requirements-second-course" class="form-label"
                >Second Course Enrolles</label
              >
              <textarea
                class="form-control"
                id="requirements-second-course"
                srows="2"
                v-model="data.Requirements.SecondCourse"
              >
              </textarea>
            </div>
          </div>
        </div>
        <div class="form-group-container">
          <h5 style="margin-top: 20px"><strong>Scholarship</strong></h5>
          <div class="mb-3">
            <label for="scholarships" class="form-label"
              >List of Scholarship offered</label
            >
          </div>
          <textarea
            class="form-control"
            id="requirements-second-course"
            srows="2"
            v-model="data.Scholarship"
          >
          </textarea>
        </div>
        <div class="form-group-container">
          <h5 style="margin-top: 20px"><strong>Images</strong></h5>
          <div class="mb-3">
            <label for="formFile" class="form-label">Select Images</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="onFileChange"
            />
          </div>
          <div>
            <img v-if="!previewChanged" :src="currentImage" alt="" />
            <img v-else :src="preview" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
// @ is an alias to /src
import { getDatabase, ref, update } from "firebase/database";
import {
  uploadBytes,
  getStorage,
  ref as StorageRef,
  getDownloadURL,
} from "@firebase/storage";

export default {
  name: "uni-details",
  props: ["dataProps"],
  components: {},
  data: function () {
    return {
      data: "",
      preview: "",
      currentImage: "",
      previewChanged: false,
      imageFile: "",
    };
  },
  computed: {},

  mounted() {
    this.data = this.dataProps;
    this.getCurrentImage(this.data.Uid);
  },
  methods: {
    getCurrentImage(uid) {
      console.log(uid, "TEST");
      if (this.data.ImageFileName) {
        const storage = getStorage();
        getDownloadURL(StorageRef(storage, this.data.ImageFileName))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // This can be downloaded directly:
            // const xhr = new XMLHttpRequest();
            // xhr.responseType = "blob";
            // xhr.onload = () => {
            //   const blob = xhr.response;
            //   console.log(blob)
            // };
            // xhr.open("GET", url);
            // xhr.send();

            // Or inserted into an <img> element
            // const img = document.getElementById("myimg");
            // img.setAttribute("src", url);
            this.previewChanged = false;
            this.currentImage = url;
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
      }
    },
    saveData() {
      this.$emit("setLoading", true);
      let data = this.data;

      const db = getDatabase();
      const updates = {};
      updates["universities/" + data.Uid] = data;
      update(ref(db), updates)
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
      if (this.previewChanged) {
        let fileType = this.imageFile.name.split(".").pop();
        const storage = getStorage();
        let uid = this.data.Uid;
        const schoolPicRef = StorageRef(
          storage,
          `schoolPictures/${uid}.${fileType}`
        );
        uploadBytes(schoolPicRef, this.imageFile)
          .then((r) => {
            console.log(r);
            this.$emit("setLoading", false);
          })
          .catch((e) => {
            console.log(e);
            this.$emit("setLoading", false);
          });
      } else {
        this.$emit("setLoading", false);
      }
    },
    appendPrograms() {
      const random =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);

      this.$set(this.data.ProgramsOffered, random, {
        Field: "New Field",
      });
    },
    removePrograms(key) {
      const arrLength = Object.keys(this.data.ProgramsOffered).length;
      if (arrLength === 1) {
        console.log("cant delete program!");
        return;
      }
      this.$delete(this.data.ProgramsOffered, key);
    },
    goToView() {
      let userID = this.data.Uid;
      console.log(userID);
      this.$router.push(`/university/view/${userID}`);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      console.log(URL.createObjectURL(file));
      this.previewChanged = true;
      this.imageFile = file;
      console.log(file);
      this.preview = URL.createObjectURL(file);
      let fileType = file.name.split(".").pop();
      let uid = this.data.Uid;
      let filename = `schoolPictures/${uid}.${fileType}`;
      this.data.ImageFileName = filename;
    },
  },
};
</script>

<style scoped>
#uni-details {
  padding: 50px;
  background: #f5f5f5;
}

#uni-details .details-btn-container {
  display: flex;
  justify-content: flex-end;
}

#uni-details .details-btn-container button {
  margin-left: 10px;
}

.details-container {
  margin-top: 30px;
  text-align: left;
}
.no-space {
  margin: 0;
}
.hr-style {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.details-section {
  margin-top: 30px;
}

dd.col-sm-11 {
  padding-left: 60px;
}
.details-section h5 {
  color: #ff9829;
}

.details-btn-container a {
  color: white;
  text-decoration: none;
}
.form-group-container {
  margin-top: 30px;
  padding: 50px;
  background: #fff;
  box-shadow: 0 0 30px #ccc;
}
.delete-program-btn {
  margin-top: 20px;
}
</style>
