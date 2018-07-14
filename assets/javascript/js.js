// create an array of movie titles

var movies = ["Star Wars", "Star Trek", "Inception", "The Big Labowski", "Lord of the Rings", "Dune"]

// attach those movie titles to buttons
function renderButtons() {

    $("#movie-buttons").empty();

    for (var i = 0; i < movies.length; i++) {

        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#movie-buttons").append(a);
    }
}

// add "more movie titles" button function
$("#add-movie").on("click", function (event) {

    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
});

// ajax call
$(document).on("click", ".movie", function () {

    $("#movie-gifs-here").empty(); 

    var movieGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieGif + "&api_key=dc6zaTOxFJmzC&limit=15";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        // loop through results, creating a div, with a p and img tag inside, with a class and a bunch of attr to animate gif. 
        for (var i = 0; i < results.length; i++) {

           // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {  // optional filter

                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var moviePics = $("<img>");
                moviePics.addClass("gif");
                moviePics.attr("src", results[i].images.fixed_height_still.url);
                moviePics.attr("data-state", "still");
                moviePics.attr("data-animate", results[i].images.fixed_height.url);
                moviePics.attr("data-still", results[i].images.fixed_height_still.url);
                gifDiv.append(p);
                gifDiv.append(moviePics);
                $("#movie-gifs-here").prepend(gifDiv);
           // }
        }
    });
});

// pause gifs
$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons();



