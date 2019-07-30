$("button").on("click", function() {
    var state = $(this).attr("data-city");
    var searchPop = function(city) {
    var apiKey = "3204bdc9-d215-465a-bb7b-132b32d458d3"
    var stateName = Missouri 

    var queryURL = "http://api.airvisual.com/v2/cities?state=" + stateName + "&country=USA" "&key=" + apiKey
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            
            createRow(response);
          // Storing an array of results in the results variable
          var results = response.data;
            console.log(results)});
    
    }

    searchPop();})