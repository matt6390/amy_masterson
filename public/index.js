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
      errors: []
    };
  },
  created: function() {},
  methods: {
    submitMosaic: function() {
      this.errors = [];
      var params = {
        name: this.name,
        description: this.description,
        price: this.price
      };

      axios.post("/mosaics", params).then(function(response) {
        router.push("/mosaics");
      }.bind(this)).catch(function(error) {
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
      }.bind(this));


      console.log("Added");
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