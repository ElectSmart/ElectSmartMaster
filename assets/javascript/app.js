$(document).ready(function () {
    //On click button to show up coming elections
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

                //show full address on HTML 
                $("#display-address").html(responseVoter.normalizedInput.line1 + ", " + responseVoter.normalizedInput.city + ", " + responseVoter.normalizedInput.state + ", " + responseVoter.normalizedInput.zip);

                //storing contests data from voter request in a varaible
                var resultsContest = responseVoter.contests;
                console.log(resultsContest);



                //create the head of the table
                var headTR = $("<tr>");
                var ElectionTH = $("<th>").attr("scope", "col");
                ElectionTH.text("Election Contest");
                var candidateTH = $("<th>").attr("scope", "col");
                candidateTH.text("Candidates");
                headTR.append(ElectionTH, candidateTH);
                $("#election-table").prepend(headTR);

                //looping through each result
                for (var i = 0; i < resultsContest.length; i++) {


                    //put each element of contest Array in variable
                    var contest = resultsContest[i];
                    //pull contest name in variable 
                    var contestName = contest.office;
                    //create a row tag with a class
                    var row = $("<tr>");
                    //create the first column which will display contest name
                    var columnContest = $("<td>");
                    columnContest.addClass("contest-name text-left");
                    columnContest.text(contestName);
                    //append the contest column to the row
                    row.append(columnContest);

                    for (var j = 0; j < contest.candidates.length; j++) {
                        var candidate = contest.candidates[j];
                        //create a column tag to display candidate names
                        var columnCandidate = $("<td>");
                        columnCandidate.addClass("candidate-name");
                        columnCandidate.text(candidate.name)

                        //create a row 
                        var tr = $("<tr>");
                        tr.html("<i>" + candidate.party + "</i>");
                        columnCandidate.append(tr);

                        //append the column candidate to the row
                        row.append(columnCandidate);

                        //put candidates' names on DOM
                        $("#APILanding").append(row);

                    };
                    // put the contest name on DOM
                    $("#APILanding").append(row);
                }
            })
        }
        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })
    })

    //On click button for function to show current representatives
    $("#representatives").on("click", function (event) {
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

                //show full address on HTML 
                $("#display-address").html(responseRep.normalizedInput.line1 + ", " + responseRep.normalizedInput.city + ", " + responseRep.normalizedInput.state + ", " + responseRep.normalizedInput.zip);

                //create the head of the table
                var headTR = $("<tr>");
                var OfficeTH = $("<th>").attr("scope", "col");
                OfficeTH.text("Office");
                var NameTH = $("<th>").attr("scope", "col");
                NameTH.text("Name of Representative");
                headTR.append(OfficeTH, NameTH);
                $("#election-table").prepend(headTR);

                //storing office of the representative info in variable
                var resultsOffice = responseRep.offices;
                console.log(resultsOffice);

                //looping through all the element of the offices array of AJAX data
                for (var i = 0; i < resultsOffice.length; i++) {
                    //put each element of office Array in variable
                    var office = resultsOffice[i];
                    //console.log(office);

                    //pull contest name in variable 
                    var officeName = office.name;
                    //create a row tag with a class
                    var row = $("<tr>");
                    //create the first column which will display contest name
                    var columnOfficeName = $("<td>");
                    columnOfficeName.addClass("office-name text-left");
                    columnOfficeName.text(officeName);
                    //append the contest column to the row
                    row.append(columnOfficeName);

                    //obtain officeIndex from official-indices from offices array
                    var officeIndex = office.officialIndices;
                    //this for loop will loop through all the elemet in the official-indices array under offices array
                    for (var k = 0; k < officeIndex.length; k++) {
                        officeindex = officeIndex[k];
                        // store officeIndex in index variable as an integer
                        var index = parseInt(officeindex);
                        console.log(index);
                        
                        
                        //obtain information of officials from data requested from Ajax call
                        var resultsOfficialName = responseRep.officials;
                        //console.log(resultsOfficialName);
                        //this forloop will loop through all the element in the officials array of the AJAX data
                        for (var j = 0; j < resultsOfficialName.length; j++) {
                            //store index of each element as an integer in a variable called nameindex
                            var nameindex = resultsOfficialName.indexOf(resultsOfficialName[j]);
                            console.log(nameindex);
                            // if nameindex and index are the same, display the name and party of the representative according to their office 
                            if (index === nameindex) {
                                //console.log("fuck trump");
                                //create a column tag to display candidate names
                                var columnRepName = $("<td>");
                                columnRepName.addClass("rep-name");
                                columnRepName.text(resultsOfficialName[j].name)

                                //create a row 
                                var tr = $("<tr>");
                                tr.html("<i>" + resultsOfficialName[j].party + "</i>");
                                columnRepName.append(tr);

                                //append the column candidate to the row
                                row.append(columnRepName);

                                //put candidates' names on DOM
                                $("#APILanding").append(row);

                            }
                        }
                    }
                }
                // put the contest name on DOM
                $("#APILanding").append(row);
            })
        }

        //remove all field after submission
        $("#add-address").each(function () {
            this.reset();
        })      
    })
    // Function to restart the game (restart button)
    $("button").click (function restart() {
        $("#APILanding").empty();
        $("#election-table").empty();
    });
})