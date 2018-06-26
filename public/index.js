/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "People: ",
      people: [],
          newPerson: {
                      name:"",
                      bio: ""
          },
      nameFilter: "",
      bioFilter: "",
      errors: []

          
    };
  },
  created: function() {
    axios
    .get('/api/people')
    .then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      // if (this.newPerson.name && this.newPerson.bio) {

      var newPersonInfo = {
                            name: this.newPerson.name,
                            bio: this.newPerson.bio,
                            bioVisible: true
                          };

      axios
      .post('/api/people', newPersonInfo)
      .then(function(response) {
        this.people.push(response.data);

      }.bind(this))
      .catch(function(error) {
        this.errors = error.response.data.errors;
      }.bind(this));
      
      // }
    },

    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },

    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    },

    isValidPerson: function(inputPerson) {
       var validName = inputPerson.name.toLowerCase().includes(this.nameFilter.toLowerCase());
       var validBio = inputPerson.bio.toLowerCase().includes(this.bioFilter.toLowerCase());

       return validName && validBio;
    }

  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var lowerName1 = person1.name.toLowerCase();
        var lowerName2 = person2.name.toLowerCase();
        return lowerName1.localeCompare(lowerName2);
      });
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});