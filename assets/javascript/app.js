$(document).ready(function () {

    //--------------------- These codes are set up to populate election contests based on address -----------------------
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

                for (i = 0; i < 30; i++) {
                    // adding null rows for readability
                    var nullTH = $("<th>").attr("scope", "col");
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
                        var columnRef = $("<td>").html("<b>" + contestType + "</b>");
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
                    for (var l = 0; l < 1; l++) {
                        var newpolling1 = polling1[l];
                        var pollingLocation = newpolling1.address.locationName + ", " + newpolling1.address.line1 +
                            ", " + newpolling1.address.city + ", " + newpolling1.address.state + ", " + newpolling1.address.zip;
                        var pollingHours = newpolling1.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Polling Location: </b>");
                        divPLocation.append(pollingLocation);
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPHours.append(pollingHours);
                        $("#polling-location").append(divPLocation, divPHours);
                    }
                }
                // if polling location isn't available, then fill in early votesites
                if (typeof (polling1) === "undefined" && polling.length > 0) {
                    for (var k = 0; k < 2; k++) {
                        var newpolling = polling[k];
                        var voteSiteLocation = newpolling.address.locationName + ", " + newpolling.address.line1 +
                            ", " + newpolling.address.city + ", " + newpolling.address.state + ", " + newpolling.address.zip;
                        var voteSiteHours = newpolling.pollingHours;
                        var divPLocation = $("<div>").html("<b>Early Voting Location: </b>");
                        divPLocation.append(voteSiteLocation);
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPHours.append(voteSiteHours);
                        $("#vote-location").append(divPLocation, divPHours);
                    }
                }

                // if both available then fill in both
                if (polling.length > 0 && polling1.length > 0) {
                    for (var l = 0; l < 1; l++) {
                        var newpolling1 = polling1[l];
                        var pollingLocation = newpolling1.address.locationName + ", " + newpolling1.address.line1 +
                            ", " + newpolling1.address.city + ", " + newpolling1.address.state + ", " + newpolling1.address.zip;
                        var pollingHours = newpolling1.pollingHours;
                        var divPLocation = $("<div>").html("<b>Nearest Polling Location: </b>");
                        divPLocation.append(pollingLocation);
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPHours.append(pollingHours);
                        $("#polling-location").append(divPLocation, divPHours);                        $("#polling-hours").append(divPHours);
                    }
                    for (var k = 0; k < 2; k++) {
                        var newpolling = polling[k];
                        var voteSiteLocation = newpolling.address.locationName + ", " + newpolling.address.line1 +
                            ", " + newpolling.address.city + ", " + newpolling.address.state + ", " + newpolling.address.zip;
                        var voteSiteHours = newpolling.pollingHours;
                        var divPLocation = $("<div>").html("<b>Early Voting Location: </b>");
                        divPLocation.append(voteSiteLocation);
                        var divPHours = $("<div>").html("<b><i>Polling Hours: </i></b>");
                        divPHours.append(voteSiteHours);
                        $("#vote-location").append(divPLocation, divPHours);
                    }

                }
            })
        }
    })
    //----------------------------------------------------------------------------------------------------------------

    //------------ This code to set up for searching representatives-------------------
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

                for (i = 0; i < 30; i++) {

                    // adding null rows for readability
                    var nullTH = $("<th>").attr("scope", "col");
                    nullTH.text(" ");

                    headTR.append(nullTH);

                }

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
                        var officeindex = officeIndex[k];
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
                                //--some representatives don't have URL--
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
    $("#election").click(function restart() {
        $("#APILanding").empty();
        $("#display-address").empty();
        $("#election-table").empty();
        $("#polling-location").empty();
        $("#vote-location").empty();
    });
    $("#representatives").click(function restart() {
        $("#APILanding").empty();
        $("#display-address").empty();
        $("#election-table").empty();
        $("#polling-location").empty();
        $("#vote-location").empty();
    });
    //------------------------------------------------------------------------------------------------------------------

    //------------------This part is for second search using news API---------
    //On click button to show election news
    $("#news").on("click", function (event) {
        event.preventDefault();

        // create variable for news search term
        var searchTerm = $("#search-term").val().trim();
        console.log(searchTerm);

        // prevent empty news search
        if (searchTerm === "") {
            return;
        }

        else {
            // News API call--keyword search
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://newsapi.org/v2/everything?q=" + searchTerm + "&apikey=a894f1af7fb6477981fd17b552b49b42",
                "method": "GET",
            }
        }
        $.ajax(settings).then(function (response) {
            // console.log(response);
            var searchArticles = response.articles
            // console.log("articles", searchArticles);
            //created head of the table
            var tr = $("<tr>")
            var tdSource = $("<th>").text("Source");
            var tdArticle = $("<th>").text("Article");
            tr.append(tdSource, tdArticle);
            $("#APILanding").append(tr);

            // run through the article array
            for (var i = 0; i < searchArticles.length; i++) {
                // console.log(i)
                // diplay all articles in a table
                var searchArticle = searchArticles[i];
                newTR = $("<tr>");
                sourceCol = $("<td>").text(searchArticle.source.name);
                newCol = $("<td>")
                titleRow = $("<tr>")
                aTitle = $("<a>").html("<b>Title: </b>" + searchArticle.title).attr("href", searchArticle.url).attr("target", "_blank");
                titleRow.append(aTitle);
                desRow = $("<tr>").html("<b>Description: </b>" + searchArticle.description);
                newCol.append(titleRow, desRow);
                newTR.append(sourceCol, newCol);
                $("#APILanding").append(newTR);
            }
        })
    })
    //clear out all areas for a new search
    $("#news").click(function restart() {
        $("#APILanding").empty();
        $("#display-address").empty();
        $("#election-table").empty();
        $("#polling-location").empty();
        $("#vote-location").empty();
    });
    //----------------------------------------------------------------------------

    //------------These codes to record search term in firebase-------------------
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB76DlsIYJQ7YRxjj2ufA44htF23WRNhHo",
        authDomain: "electsmart-219601.firebaseapp.com",
        databaseURL: "https://electsmart-219601.firebaseio.com",
        projectId: "electsmart-219601",
        storageBucket: "",
        messagingSenderId: "92033968708"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Capture Button Click
    $("#news").on("click", function (event) {
        console.log("WTF");
        event.preventDefault();
        //grab value from search term
        var searchTerm = $("#search-term").val().trim();
        // console.log(searchTerm);
        //return search term if it's empty
        if (searchTerm === " ") {
            return;
        }

        else {
            //push information into firebase
            database.ref().push({
                search: searchTerm,
            });
            console.log(searchTerm);
        }
    })
    //--------------------------------------------------------------------------------------
})

// Toggle arrow icon to the left of the first accordion button 

 $("#elecRepInfo").on("click", function()
{


  if  ( $( "#elecRepInfo" ).hasClass( "collapsed" ) )
  {
    // console.log("opening")
    $("#arrow1").removeClass("icon-arrow-down");
    $("#arrow1").addClass("icon-arrow-up");
  }else {
    //   console.log("closing");
      $("#arrow1").removeClass("icon-arrow-up");
      $("#arrow1").addClass("icon-arrow-down");
  }


})

// toggle arrow icon to the left of second accordion button 

$("#candidateSearch").on("click", function()
{ 
  if ( $( "#candidateSearch" ).hasClass( "collapsed" ) )
  {
    // console.log("opening second accordion")
    $("#arrow2").removeClass("icon-arrow-down");
    $("#arrow2").addClass("icon-arrow-up");
  }else {
    //   console.log("closing second accordion");
      $("#arrow2").removeClass("icon-arrow-up");
      $("#arrow2").addClass("icon-arrow-down");
  }


})