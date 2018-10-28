var topics = [
    "patriot",
    "Team america",
    "Old Glory",
    "freedom",
    "George Washington",
    "vote"
]

function makinButtons() {
  for (i = 0; i < topics.length; i++)
  var btn = $( "<button>" );
  btn.text(i);
  btn.attr("data-gifWord", i)
  $("#buttons").append();
};
makinButtons();
//create function to populate buttons on the screen from the array
//take submitted Gif word, push to array AND re-run the button creation function

$("#submitButton").on("click", function() { 
    event.preventDefault();
    var gifSubmission = $("#gifSubmission").val().trim();
    topics.push(gifSubmission);
    // var btn = $( "<button>" );
    // btn.text(gifSubmission);
    // btn.attr("data-gifWord", gifSubmission)
    makinButtons();
    $("#submitButton").trigger("reset")
});


$("button").on("click", function() {
    event.preventDefault();
    var gifWord = $(this).attr("data-gifWord");
    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&limit=5&tag=" + gifWord;
        //"https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=20";
        //"https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=raccoon";
        //http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC;
    // topics.push(gifWord);
    console.log(gifWord);
    console.log(topics);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });