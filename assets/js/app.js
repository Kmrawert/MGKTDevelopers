$("#submitCity").on("click", function() {
    var stateName = "Missouri"
    function searchPollution() {
    var apiKey = "3204bdc9-d215-465a-bb7b-132b32d458d3"

    var queryURL = "http://api.airvisual.com/v2/cities?state=" + stateName + "&country=USA&key=" + apiKey
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data.forecasts[0].aqius;
          console.log(results)});
    
    }

    searchPollution();})

    