$(document).ready(function () {
    //add submit button for all the input
    $("#election").on("click", function (event) {
        event.preventDefault();

        //create variable to store value of input
        var address = $("#address").val().trim();
        console.log(address);

        //prevent from enter no address
        if (address === " ") {
            return;
        }

        else {
            //constructing a queryURL for Voter info
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

                //storing data for voter request
                var resultsContest = responseVoter.contests;
                console.log(resultsContest);

                //looping through each result
                for (var i = 0; i < resultsContest.length; i++) {
                    //put each element of contest Array in variable
                    var contest = resultsContest[i];
                    //pull contest name in variable 
                    var contestName = contest.office;
                    //create a div tag with a class
                    var rowContest = $("<div>");
                    rowContest.addClass("contest-name");
                    //put Contest name on html
                    rowContest.html(contestName);

                    for (var j = 0; j < contest.candidates.length; j++) {
                        var candidate = contest.candidates[j];
                        //create a div tag with a class 
                        var rowCandidate = $("<div>");
                        rowCandidate.addClass("candidate-name");
                        //put candidate on html
                        rowCandidate.html(candidate.name);
                        //put candidate and contest names on API Landing

                        $("#APILanding").prepend(rowCandidate);
                    };

                    $("#APILanding").prepend(rowContest);
                }
            })
        }
        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })
    })


    $("#representative").on("click", function (event) {
        event.preventDefault();

        //create variable to store value of input
        var address = $("#address").val().trim();
        console.log(address);

        //prevent from enter no address
        if (address === " ") {
            return;
        }

        else {
            //constructing queryURL for representatives info
            var queryURLRep = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCgorCJdsPNqU81iGz5UnfM8hBiIL8zbm4&address=" + address;
            // AJAX request for representative info
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

            //After data has been retrieved from then request then
            $.ajax(settingsRep).done(function (responseRep) {
                console.log(responseRep);


                //storing data for representative info
                var resultsRep = responseRep.data;
            });
        }

        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })


    })
})