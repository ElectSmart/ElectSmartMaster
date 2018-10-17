$(document).ready(function () {
    //add submit button for all the input
    $("#submit-button").on("click", function () {
        //create variable to store value of input
        var address = $("#address").val();
        console.log(address);
        //constructing a queryURL
        var queryURL = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCgorCJdsPNqU81iGz5UnfM8hBiIL8zbm4&address=" + address;
        console.log(queryURL);
        // setting up Ajax request
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "92b1dfde-589c-4106-83be-33f72b2de28c"
            }
        }
        //After data has been retrieved from then request then
        $.ajax(settings).then(function (response) {
            console.log(response);
        });
    })






})