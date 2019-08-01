var row = $('.row');

// Event listener for all button elements 
$("#submitCity").on("click", function () {
  // In this case, the "this" keyword refers to the button that was clicked
  var city = $('#city_input').val().trim();
  var state = $('#state_input').val().trim();
  console.log(city);
  console.log(state);
  // var population = $('#populationScore').val().trim();
  var cityTitle = $('#cityName').text(city + ',');
  var stateTitle = $('#stateName').text(state);

  // var populationResult = $('#populationScore').text(population);
  function handleResult(weather, popObj) {
    console.log(weather);
    var weatherHTML = renderWeather(weather);
    console.log(renderWeather(weather));
    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    var popLabel = $('<div>').text('Population: ' + popObj.pop).addClass('labelPop');
    var weatherVal = $('<div>').html(weatherHTML).addClass('weather');
    newCard.append(cityTitle, stateTitle, '<br>', popLabel, weatherVal);

    row.prepend(newCard);
  }


  function searchCityPop(city) {
    var queryURL = "https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
    //var queryURL = "https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
    return $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {

        //createRow(response);
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(response);
        //var cityPop = response.result.Chicago.residential.total_pop; 
        var pop = response.result[city].residential.total_pop;
        var ghgCommerical = response.result[city].commercial.gas_lb_ghg;
        var ghgResidential = response.result[city].residential.gas_lb_ghg;
        var ghgIndustrial = response.result[city].industrial.gas_lb_ghg;
        var ghg = ghgCommerical + ghgResidential + ghgIndustrial;
        console.log(ghg);
        console.log(pop);
        return {
          pop,
          ghg
        }
       

      });
  }
  Promise.all([

    getWeather(city),
    // .then(handleResult);
    searchCityPop(city)
  ]).then(function (response){
    handleResult(response[0], response[1])
  })
})

