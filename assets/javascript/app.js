$(document).ready(function () {
    //add submit button for all the input
    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        //create variable to store value of input
        var address = $("#address").val();
        console.log(address);
        //constructing a queryURL
        var queryURLVoter = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCgorCJdsPNqU81iGz5UnfM8hBiIL8zbm4&address=" + address;
        console.log(queryURLVoter);
        // setting up Ajax request
        var settingsVoter = {
            "async": true,
            "crossDomain": true,
            "url": queryURLVoter,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "92b1dfde-589c-4106-83be-33f72b2de28c"
            }
        }
        //After data has been retrieved from then request then
        $.ajax(settingsVoter).then(function (responseVoter) {
            console.log(responseVoter);
        });

        var queryURLRep = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCgorCJdsPNqU81iGz5UnfM8hBiIL8zbm4&address=" + address;

        var settingsRep = {
            "async": true,
            "crossDomain": true,
            "url": queryURLRep,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "12953752-7b5f-46b8-b586-ff93402fb08d"
            }
        }
        $.ajax(settingsRep).done(function (responseRep) {
            console.log(responseRep);
        });

        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })

    })
})