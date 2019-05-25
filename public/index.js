/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Amy's Website"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var MosaicsPage = {
  template: "#mosaics-page",
  data: function() {
    return {
      message: "Welcome to the mosaics page",
      mosaics: []
    };
  },
  created: function() {
    axios.get("/mosaics").then(function(response) {
      var mosaics = response.data;
      mosaics.forEach(function(mosaic) {
        this.mosaics.push(mosaic);
      }.bind(this));
      console.log(response.data);

    }.bind(this));
  },
  methods: {},
  computed: {}
};
var MosaicsCreatePage = {
  template: "#mosaics-create-page",
  data: function() {
    return {
      message: "Create Page",
      name: "",
      description: "",
      price: "",
      pictureUrl: false,
      errors: []
    };
  },
  created: function() {},
  methods: {
    submitMosaic: function() {
      if (this.pictureUrl === true) {
        this.errors = [];
        var url = axios.get('/urls/last').then(function(response) {
          var url = response.data.storage_url;

          var params = {
            name: this.name,
            description: this.description,
            price: this.price,
            picture_url: url
          };

          axios.post("/mosaics", params).then(function(response) {
            console.log(response.data);
            // router.push("/mosaics");
          }.bind(this)).catch(function(error) {
            this.errors = error.response.data.errors;
            console.log(error.response.data.errors);
          }.bind(this));
        }.bind(this));
      } else {
        this.errors = ["No Picture Added"];
      }
    },

    readUrl: function() {
      var pictureFile = document.getElementById('mosaicPic').files[0];

      // Connecting to firebase to store the picture
      var ref = firebase.storage().ref();
      var upload = ref.child(pictureFile.name).put(pictureFile);

      //provides information on upload progress (usefull for really big picture files)
      upload.on('state_changed', function(snapshot) {
        //this is used to display the upload progress of the image
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // document.getElementById('picProgressBar').style.width = progress + "%";
        // document.getElementById('picProgressBar').innerHTML = progress.toFixed(2) + "%";
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          // console.log('Upload is running');
          break;
        }
      });

      upload.then(function(snap) {
        var url = snap.ref.getDownloadURL().then(function(url) {
          console.log(url);

          //saving url in database for when mosaic is created
          var params = {storage_url: url};
          axios.post("/urls", params).then(function(response) {
            this.pictureUrl = response.data;
          }.bind(this));
        });
      });
      this.pictureUrl = true;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage },
    { path: "/mosaics", component: MosaicsPage },
    { path: "/mosaics-create", component: MosaicsCreatePage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});