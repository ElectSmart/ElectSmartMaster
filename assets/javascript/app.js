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
                var div = $("<div>").html("<b> Search Address: </b>");
                var searchAddress = responseVoter.normalizedInput.line1 + ", " + responseVoter.normalizedInput.city + ", " + responseVoter.normalizedInput.state + ", " + responseVoter.normalizedInput.zip;
                div.append(searchAddress);
                $("#display-address").append(div);

                //create the head of the table
                var headTR = $("<tr>");
                var ElectionTH = $("<th>").attr("scope", "col");
                ElectionTH.text("Election Contest");
                var candidateTH = $("<th>").attr("scope", "col");
                candidateTH.text("Candidates");
               
                headTR.append(ElectionTH, candidateTH);

                for (i=0; i<5; i++){

                 // adding null rows for readability
                 var nullTH = $("<th>").attr ("scope", "col");
                 nullTH.text(" ");

                 headTR.append(nullTH);

                }
                $("#election-table").prepend(headTR);
                //storing contests data from voter request in a varaible
                var resultsContest = responseVoter.contests;
                console.log(resultsContest);


                for (var i = 0; i < resultsContest.length; i++) {
                    var contestType = resultsContest[i].type;
                    //console.log(contestType);
                    if (contestType === "General") {
                        //console.log("general");
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
                            //console.log(columnCandidate);
                            //create an a tag for candidate email
                            var a = $("<a>").attr("href", "mailto:" + candidate.email);
                            //console.log(candidate.email);
                            //console.log (a);
                            //put name of candidate in a tag
                            a.text(candidate.name);
                            //put a tag in column
                            columnCandidate.append(a);

                            //create a row 
                            var tr = $("<tr>");
                            tr.html("<i>" + candidate.party + "</i>");
                            columnCandidate.append(tr);

                            //append the column candidate to the row
                            row.append(columnCandidate);

                            //put candidates' names on DOM
                            $("#APILanding").append(row);
                            //console.log("fuck trump");

                        }
                    }
                    if (contestType === "Referendum") {
                        //create row for Referendum
                        var rowRef = $("<tr>");
                        //create first column for the Referendum
                        var columnRef = $("<td>").html("<b>"+contestType+"</b>");
                        //append column Ref to rowRef
                        rowRef.append(columnRef);
                        //create column to get referendum question
                        var columnRefQues = $("<td>").text(resultsContest[i].referendumText).attr("colspan", "4");
                        //console.log(resultsContest[i].referendumText);
                        rowRef.append(columnRefQues);
                        var ballotRes = resultsContest[i].referendumBallotResponses;
                        var column1 = $("<td>").text(ballotRes[0]);
                        var column2 = $("<td>").text(ballotRes[1]);
                        rowRef.append(column1, column2)
                        $("#APILanding").append(rowRef);
                    }
                }
                //=================This code right here is to show the nearest voting location===========================
                // put all information about early vote sites in a variable
                var polling = responseVoter.earlyVoteSites;
                // put all information about polling location in a variable
                var polling1 = responseVoter.pollingLocations;
                // if early votesite is not available, the fill in polling location
                if (typeof (polling) === "undefined" && polling1.length > 0) {
                    console.log("polling1");
                    for (var l = 0; l < polling1.length; l++) {
                        polling1 = polling1[l];
                        var pollingLocation = polling1.address.locationName + ", " + polling1.address.line1 +
                            ", " + polling1.address.city + ", " + polling1.address.state + ", " + polling1.address.zip;
                        var pollingHours = polling1.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Polling Location: </b>");
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPLocation.append(pollingLocation);
                        divPHours.append(pollingHours);
                        $("#polling-location").append(divPLocation);
                        $("#polling-hours").append(divPHours);
                    }
                }
                // if polling location isn't available, then fill in early votesites
                if (typeof (polling1) === "undefined" && polling.length > 0) {
                    for (var k = 0; k < polling.length; k++) {
                        polling = polling[k];
                        var voteSiteLocation = polling.address.locationName + ", " + polling.address.line1 +
                            ", " + polling.address.city + ", " + polling.address.state + ", " + polling.address.zip;
                        var voteSiteHours = polling.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Early Voting Location: </b>");
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPLocation.append(voteSiteLocation);
                        divPHours.append(voteSiteHours);
                        $("#vote-location").append(divPLocation);
                        $("#votesite-hours").append(divPHours);
                    }
                }

                // if both available then fill in both
                if(polling.length > 0 && polling1.length > 0) {
                    for (var l = 0; l < polling1.length; l++) {
                        polling1 = polling1[l];
                        var pollingLocation = polling1.address.locationName + ", " + polling1.address.line1 +
                            ", " + polling1.address.city + ", " + polling1.address.state + ", " + polling1.address.zip;
                        var pollingHours = polling1.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Polling Location: </b>");
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPLocation.append(pollingLocation);
                        divPHours.append(pollingHours);
                        $("#polling-location").append(divPLocation);
                        $("#polling-hours").append(divPHours);
                    }
                    for (var k = 0; k < polling.length; k++) {
                        polling = polling[k];
                        var voteSiteLocation = polling.address.locationName + ", " + polling.address.line1 +
                            ", " + polling.address.city + ", " + polling.address.state + ", " + polling.address.zip;
                        var voteSiteHours = polling.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Early Voting Location: </b>");
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPLocation.append(voteSiteLocation);
                        divPHours.append(voteSiteHours);
                        $("#vote-location").append(divPLocation);
                        $("#votesite-hours").append(divPHours);
                    }
                    
                }
            })
        }
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
            $.ajax(settingsRep).then(function (responseRep) {
                console.log(responseRep);

                //show full address on HTML 
                var div = $("<div>").html("<b> Search Address: </b>");
                var searchAddress = responseRep.normalizedInput.line1 + ", " + responseRep.normalizedInput.city + ", " 
                + responseRep.normalizedInput.state + ", " + responseRep.normalizedInput.zip;
                div.append(searchAddress);
                $("#display-address").append(div);

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
                //console.log(resultsOffice);

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
                        //console.log(index);


                        //obtain information of officials from data requested from Ajax call
                        var resultsOfficialName = responseRep.officials;
                        //console.log(resultsOfficialName);
                        //this forloop will loop through all the element in the officials array of the AJAX data
                        for (var j = 0; j < resultsOfficialName.length; j++) {
                            //store index of each element as an integer in a variable called nameindex
                            var nameindex = resultsOfficialName.indexOf(resultsOfficialName[j]);
                            //console.log(nameindex);
                            // if nameindex and index are the same, display the name and party of the representative according to their office 
                            if (index === nameindex) {
                                //console.log("fuck trump");
                                //create a column tag to display candidate names
                                var columnRepName = $("<td>");
                                columnRepName.addClass("rep-name");


                                //--------------The code here is to add URL link to the name of representative------------------
                                //--some representative don't have URL--
                                //store all url in repUrl
                                var repUrl = resultsOfficialName[j].urls;
                                // console.log(repUrl);
                                // if the representative doesn't have a website, print our her/his name
                                if (typeof (repUrl) === "undefined") {
                                    columnRepName.text(resultsOfficialName[j].name);

                                }
                                // if they do then
                                else {
                                    for (var l = 0; l < 1; l++) {
                                        //console.log(repUrl);
                                        //create an a tag for URL with href attribute of the url
                                        var aURL = $("<a>").attr("href", repUrl[l]).attr("target", "_blank");
                                        aURL.text(resultsOfficialName[j].name);
                                        // append the a tag to the column of the RepName
                                        columnRepName.append(aURL);

                                    }
                                }
                                //---------------------------------------------------------------------------------
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

            })
        }
    })
    // Function to empty all results from input
    $("button").click(function restart() {
        $("#APILanding").empty();
        $("#display-address").empty();
        $("#election-table").empty();
        $("#polling-location").empty();
        $("#polling-hours").empty();
        $("#vote-location").empty();
        $("#votesite-hours").empty();
    });
})