function handleSubmit(event) {
    console.log(event);
    var city = $("#city_input").val();
    console.log(city);
    var state = $("#state_input").val();
    console.log(state);

    getWeather(city);

}


//$("#submitCity").click(handleSubmit)

function getWeather(location) {
    // Constructing a queryURL using the animal name
    var queryURL = "http://api.apixu.com/v1/current.json?key=713c9ccd7baa43fe92d14242192507&q=" + location
    // var queryURL = "http://api.apixu.com/v1/history.json?key=713c9ccd7baa43fe92d14242192507&q=" + location

    return $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            var results = response;
            console.log(results);

            var locationName = results.location.name
            var condition = results.current.condition;
            console.log(condition);
            var temp_f = results.current.temp_f
            console.log(temp_f);
            var humidity = results.current.humidity;
            console.log(humidity);
            var windMPH = results.current.wind_mph;
            return {
                condition,
                temp_f,
                humidity,
                windMPH
            }

        })
}
function renderWeather(weather) {
    var html = `
            <div>
            ${weather.condition.text} <br>
            <strong>Temperature: </strong> ${weather.temp_f} <strong>&#176F</strong><br>
            <strong> Humidity: </strong> ${weather.humidity}%<br>
            <strong> Wind: </strong> ${weather.windMPH}mph<br>
            <img src="https:${weather.condition.icon}"> <br>
          </div>
            `
    return html;
}
  // getWeather();

    //   })
