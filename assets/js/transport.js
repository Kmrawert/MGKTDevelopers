var row = $('.row');

// Event listener for all button elements 
$("#submitCity").on("click", function () {
  // In this case, the "this" keyword refers to the button that was clicked
  
  // var cityImg = $('#cityImage');
  var city = $('#city_input').val().trim();
  var state = $('#state_input').val().trim();
  console.log(city);
  console.log(state);
  // var population = $('#populationScore').val().trim();
  var cityTitle = $('#cityName').text(city + ',');
  var stateTitle = $('#stateName').text(state);

  // returns weather function and population results and places in new card div
  function handleResult(gas, cityVMT, weather, popObj) {
    console.log(weather);
    var weatherHTML = renderWeather(weather);
    console.log(renderWeather(weather));
    
    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    var popLabel = $('<div>').text('Population: ' + popObj.pop).addClass('labelPop');
    var cityVMTLabel = $('<div>').text('City VMT: ' + cityVMT.cityVMT).addClass('labelPop');
    var gasLabel = $('<div>').text('City Gas Usage: ' + gas.cityGasUse).addClass('labelPop');
    var ntlGasLabel = $('<div>').text('National Average Gas Use: ' + gas.natl_avg_diesel_gal).addClass('labelPop');
    var dieselLabel = $('<div>').text('City Diesel Usage: ' + gas.cityDieselUse).addClass('labelPop');
    var ntlDeiselLabel = $('<div>').text('National Average Diesel Usage: ' + gas.natl_avg_diesel_gal).addClass('labelPop');
    var weatherVal = $('<div>').html(weatherHTML).addClass('weather');
    
    newCard.append(cityTitle, stateTitle, '<br>', popLabel, cityVMTLabel, gasLabel, ntlGasLabel, dieselLabel, ntlDeiselLabel, weatherVal);

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
  function getVMT(city) {
    var queryURL = "https://developer.nrel.gov/api/cleap/v1/city_vmt_estimates?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
    return $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        var cityVMT = response.result[city].city_vmt_estimate;
        var ntlAvgEst = response.result[city].natl_avg_vmt_estimate;
        var ntlPerCap = response.result[city].natl_per_capita_vmt_estimate;
        console.log(results);

        console.log(cityVMT);
        console.log(ntlAvgEst);
        console.log(ntlPerCap);
        

        return {
          cityVMT
        }
      }
    )};

    function getGasDieselSpend(city) {
      var queryURL = "https://developer.nrel.gov/api/cleap/v1/gasoline_and_diesel_use?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
      return $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          var results = response.data;
          var cityDieselUse = response.result[city].city_fuel_use.diesel_gal;
          var cityGasUse = response.result[city].city_fuel_use.gas_gal;
          var ntlDieselAvg = response.result[city].natl_avg_diesel_gal;
          var ntlGasAvg = response.result[city].natl_avg_gas_gal;
          console.log(results);
  
          console.log(cityDieselUse);
          console.log(cityGasUse);
          console.log(ntlDieselAvg);
          console.log(ntlGasAvg);
          
  
          return {
            cityDieselUse,
            cityGasUse,
            ntlDieselAvg,
            ntlGasAvg
          }
        }
      )};
  
  Promise.all([
    getGasDieselSpend(city),
    getVMT(city),
    getWeather(city),
    // .then(handleResult);
    searchCityPop(city)
  ]).then(function (response){
    handleResult(response[0], response[1], response[2], response[3])
  })
  
})