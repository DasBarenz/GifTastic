var topics = [
  "Mom",
  "Team America",
  "Freedom",
  "Eagle",
  "George Washington",
  "Democracy"
]

function makinButtons() {
  for (i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.text(topics[i]);
    btn.attr("data-gifWord", topics[i]);
    //btn.attr("id", gifButtons); THIS BREAKS IT EVERY TIME, i want to add an ID to the buttons in order to separate button on-click and submit on-click
    $("#buttons").append(btn);
  };
};
makinButtons();

$("#submitButton").on("click", function () {
  event.preventDefault();
  var gifSubmission = $("#gifSubmission").val().trim();
  topics.push(gifSubmission);
  $("#buttons").empty()
  makinButtons();
  $("#submitButton").trigger("reset")
});


$("button").on("click", function () {
  event.preventDefault();
  var gifWord = $(this).attr("data-gifWord");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifWord + "&api_key=dc6zaTOxFJmzC&limit=5";
  console.log(gifWord);
  console.log(topics);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
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