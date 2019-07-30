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

    function getWeather() {

      var location = "chicago"
    
      // Constructing a queryURL using the animal name
      var queryURL = "http://api.apixu.com/v1/current.json?key=713c9ccd7baa43fe92d14242192507&q=" + location
     
    
    
    
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function (response) {
          console.log(queryURL);
    
          var results = response;
          console.log(results);
    
    
          var locationName = results.location.name
          var condition = results.condition
          var temp_f = results.temp_f
    
         
          $("#weather").html(renderMyThing(results))
    
    
          function renderMyThing(response) {
            var html = `
              <div id="weather">
              <h1>${results.location.name} </h1>
              ${results.current.condition.text} <br>
              ${results.current.temp_f} <br>
             
              <img src="https:${response.current.condition.icon}"> <br>
            </div>
        
              `
            return html
          }
    
        })
    
    }
    getWeather();