//On click button to show election news
$("#news").on("click", function (event) {
  event.preventDefault();

// create variable for news serach term
var searchTerm = $("#searchTerm").val().trim();
        console.log(searchTerm);

// prevent empty news search
if (searchTerm === " ") {
    return;
      }

else {
// News API call--keyword search
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
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBTq74naeMGcbolfwl1KMijbmbJ5hO0chE",
  authDomain: "elect-smart-1539655478398.firebaseapp.com",
  databaseURL: "https://elect-smart-1539655478398.firebaseio.com",
  projectId: "elect-smart-1539655478398",
  storageBucket: "elect-smart-1539655478398.appspot.com",
  messagingSenderId: "577385688896"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var searchTerm = "";

// Capture Button Click
$("#add-search").on("click", function(event) {
  event.preventDefault();

  newsSearh = $("#seach-input").val().trim();

  database.ref().set({
    search: searchTerm
  })
