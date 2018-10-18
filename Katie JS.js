// News API call (general)
var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=c5c050c6a3af4b0580432afa35b8dcaa';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

// News API call--keyword search
var = searchTerm

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://newsapi.org/v2/top-headlines?country=us&apiKey=c5c050c6a3af4b0580432afa35b8dcaa&description=" + searchTerm,
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "8ab203d2-0594-489b-bafc-3b8d6b264adf"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBTq74naeMGcbolfwl1KMijbmbJ5hO0chE",
    authDomain: "elect-smart-1539655478398.firebaseapp.com",
    databaseURL: "https://elect-smart-1539655478398.firebaseio.com",
    projectId: "elect-smart-1539655478398",
    storageBucket: "",
    messagingSenderId: "577385688896"
  };
  firebase.initializeApp(config);

