// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var state = $(this).attr("data-city");
    var searchPop = function(city) {

   


    var queryURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates&sort=-rank&facet=city&facet=state"
                    + city
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
    
         
          $("#tempLowAvg").html(renderMyThing(results))
    
    
          function renderMyThing(response) {
            var html = `
              <div>
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