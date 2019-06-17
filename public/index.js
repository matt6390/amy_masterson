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
    axios.get("/users/amy").then(function(response) {
      axios.get("/mosaics").then(function(response) {
        var mosaics = response.data;
        mosaics.forEach(function(mosaic) {
          this.mosaics.push(mosaic);
        }.bind(this));
        console.log(response.data);

      }.bind(this));
    }.bind(this)).catch(function(errors) {
      router.push("/login");
    }.bind(this));


    
  },
  methods: {
    viewMosaic: function(id) {
      console.log(id);
      router.push("/mosaics/" + id);
    }
  },
  computed: {}
};


var MosaicsShowPage = {
  template: "#mosaics-show-page",
  data: function() {
    return {
      message: "Welcome to the show page",
      mosaic: {}
    };
  },
  created: function() {
    axios.get("/users/amy").then(function(response) {
      axios.get("/mosaics/" + this.$route.params.id).then(function(response) {
        this.mosaic = response.data;
      }.bind(this));
    }.bind(this)).catch(function(errors) {
      router.push("/login");
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
      errors: [],
      file: "",
      showPreview: false,
      imagePreview: ""
    };
  },
  created: function() {
    axios.get("/users/amy").then(function(response) {
      
    }.bind(this)).catch(function(errors) {
      router.push("/login");
    }.bind(this));
  },
  methods: {
    
    submitFile: function() {
      // setting params for the mosaic
      let params = new FormData();
      params.append('name', this.name);
      params.append('description', this.description);
      params.append('price', this.price);
      params.append('image', this.file);

      axios.post("/mosaics", params,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function() {
        console.log("success");    
        router.push('/mosaics');    
      }).catch(function() {
        console.log("failed")
      })

      console.log("fired");
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

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    // router.push("/");
  }
};

var TestPage = {
  template: "#test-page",
  data: function() {
    return {
      file: "",
      showPreview: false,
      imagePreview: "",
      message: "Welcome to the test page"
    };
  },
  created: function() {},
  methods: {
    // submitMosaic: function() {
    //   if (this.pictureUrl === true) {
    //     this.errors = [];
    //     var url = axios.get('/urls/last').then(function(response) {
    //       var url = response.data.storage_url;



    //       this.file = this.$refs.file.files[0];
    //       let reader = new FileReader();

    //       reader.addEventListener("load", function() {
    //         this.showPreview = true;
    //         this.imagePreview = reader.result;
    //       }.bind(this), false);

    //       if( this.file ){
    //         /*
    //           Ensure the file is an image file.
    //         */
    //         if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
              
    //             Fire the readAsDataURL method which will read the file in and
    //             upon completion fire a 'load' event which we will listen to and
    //             display the image in the preview.
              
    //           reader.readAsDataURL( this.file );
    //         }
    //       }















    //       var params = {
    //         name: this.name,
    //         description: this.description,
    //         price: this.price,
    //         picture_url: url,
    //         image: this.file
    //       };

    //       axios.post("/mosaics", params).then(function(response) {
    //         router.push("/mosaics");
    //       }.bind(this)).catch(function(error) {
    //         this.errors = error.response.data.errors;
    //       }.bind(this));
    //     }.bind(this));
    //   } else {
    //     this.errors = ["No Picture Added"];
    //   }
    // },
    handleFileUpload: function() {

      // set the local file variable to what the user has selected

      this.file = this.$refs.file.files[0];

      // Initialize a File Reader object

      let reader = new FileReader();

      reader.addEventListener("load", function() {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);

      if( this.file ){
        /*
          Ensure the file is an image file.
        */
        if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
          */
          reader.readAsDataURL( this.file );
        }
      }
    },
    submitFile: function() {

      let formData = new FormData();

      formData.append('name', '123');
      formData.append('description', '123');
      formData.append('price', 123);
      formData.append('picture_url', this.file);

      axios.post("/mosaics", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function() {
        console.log("success");        
      }).catch(function() {
        console.log("failed")
      })
    }
  },
  computed: {}
}; 

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage },
    { path: "/mosaics", component: MosaicsPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/logout", component: LogoutPage },
    { path: "/mosaics/:id", component: MosaicsShowPage },
    { path: "/mosaics-create", component: MosaicsCreatePage },
    { path: "/test", component: TestPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});