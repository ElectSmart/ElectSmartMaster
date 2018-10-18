$(document).ready(function () {
    //add submit button for all the input
    $("button").on("click", function (event) {
        event.preventDefault();
        //create variable to store value of input
        var address = $("#address").val();
        console.log(address);
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
                var contestName = contest.district.name;
                //create a div tag with a class
                var divContest = $("<div>");
                divContest.addClass("contest-name");
                //put Contest name on html
                divContest.html("Contest:" + contestName);
                
                for (var j = 0; j < contest.candidates.length; j++) {
                    var candidate = contest.candidates[j];
                    //create a div tag with a class 
                    var divCandidate = $("<div>");
                    divCandidate.addClass("candidate-name");
                    //put candidate on html
                    divCandidate.html("Candidate:" + candidate.name);
                    //put candidate and contest names on API Landing
                    
                    $("#APILanding").prepend(divCandidate);
                };
                
                $("#APILanding").prepend(divContest);
                
            }
        });

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
        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })


    })
})