function handleSubmit(event) {
    console.log(event);
    var city = $("#city_input").val();
    console.log(city);
    var state = $("#state_input").val();
    console.log(state);
  
  getWeather(city);
  
  
  }
  
  $("#submitCity").click(handleSubmit)
  
  function getWeather(location) {
  
   
  
    // Constructing a queryURL using the animal name
    var queryURL = "http://api.apixu.com/v1/current.json?key=713c9ccd7baa43fe92d14242192507&q=" + location
    // var queryURL = "http://api.apixu.com/v1/history.json?key=713c9ccd7baa43fe92d14242192507&q=" + location
  
  
  
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
  
  
        $("#cityResults").attr("display","block")
        $("#weather").html(renderMyThing(results))
  
  
        function renderMyThing(response) { 
          var html = `
            <div>
            <h1>${results.location.name} </h1>
            ${results.current.condition.text} <br>
            ${results.current.temp_f} <br>
           
            <img src="https:${response.current.condition.icon}"> <br>
          </div>
      
            `
          return html;
        }
  
      })
  
  }
  // getWeather();
  
    //   })
  
    // 