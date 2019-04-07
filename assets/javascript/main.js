
//Starting NFL teams array
var NFLteams = ["atlanta Falcons", "new England Patriots", "carolina panthers", "new york giants", "dallas cowboys"];

//Loading HTML 
$(document).ready(function() {
    for (var i = 0; i < NFLteams.length; i++) {
        //adding new team to array
        $("#NFL-buttons").append("<button type='button' onclick='imgSearch(\"" + NFLteams[i] + "\")' class='btn btn-primary' value=' " + NFLteams[i] + "'> " + NFLteams[i] + " </button>");
    }
});

function teamButtonClicked() {
    var userInput = $('#teamInput').val().trim();
    imgSearch(userInput);
}

function submitButtonClicked() {
    var userInput = $('#teamInput').val().trim();

    if (userInput) {
        $('#NFL-buttons').append("<button type='button' onclick='imgSearch(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    
    }
}

function imgSearch(teamName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + teamName + ' &api_key=p4T9lRM39gJf4pf18qdgNjkJJdPZI3CA',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#teams').empty();
    for (var i = 0; i < 10; i++) {
        var rating = "g";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="gifAnimation" style= "width:250px; height:250px">';

        image = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">' + image + "</div>";
        $('#teams').append(image);
    }

    $('.gifAnimation').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}