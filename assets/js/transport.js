var row = $('.row');

// Event listener for all button elements 
$("#submitCity").on("click", function () {
  // In this case, the "this" keyword refers to the button that was clicked
  
  // var cityImg = $('#cityImage');
  var city = $('#city_input').val().trim();
  var state = $('#state_input').val().trim();

  // var population = $('#populationScore').val().trim();
  var cityTitle = $('#cityName').text(city + ',');
  var stateTitle = $('#stateName').text(state);
  var title = $('<h3>').attr('id', 'imageCity');
  title.append(cityTitle, stateTitle);
  // returns weather function and population results and places in new card div
  function handleResult(image, gas, cityVMT, weather, popObj, pollutionOBj) {
    var aqiDesc = $('<p>').attr('id', 'aqiDesc').text("The AQI is an index for reporting daily air quality. It tells you how clean or polluted your air is, and what associated health effects might be a concern for you. The AQI focuses on health effects you may experience within a few hours or days after breathing polluted air.");
    //var aqiReveal = aqiDesc[0].innerHTML;
    var weatherHTML = renderWeather(weather);
     
    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    title.css({'background-image': 'url(' + image.imageURL + ')', 'background-size': 'cover', 'background-position-y': 'center', 'margin-top': '0px', 'margin-left': '-11px', 'margin-right': '-11px'});
    var pollutionLabel = $('<div>').text('AQI Score: ' + pollutionOBj).addClass('labelPop aqi');
    var popLabel = $('<div>').text('Population: ' + popObj.pop).addClass('labelPop population');
    var cityVMTLabel = $('<div>').text('Vehicle Miles Traveled: ' + cityVMT.cityVMT + ' miles').addClass('labelPop vmt');
    var gasLabel = $('<div>').text('City Gas Usage: ' + gas.cityGasUse + ' gallons').addClass('labelPop gas');
    var dieselLabel = $('<div>').text('City Diesel Usage: ' + gas.cityDieselUse + ' gallons').addClass('labelPop diesel');
    var weatherVal = $('<div>').html(weatherHTML).addClass('weather');
    
   
  

    newCard.append(title, '<br>', popLabel, pollutionLabel, aqiDesc, cityVMTLabel, gasLabel,dieselLabel, weatherVal);

    row.prepend(newCard);
    }
$('.aqi').mouseover(function() {
      $('#aqiDesc').css('fontSize', '8px');
    }).mouseout(function() {
      $('#aqiDesc').css('fontSize', '0px');
    });
    
   getWeather(city).then(handleResult);
    

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
        console.log(response);
        //var cityPop = response.result.Chicago.residential.total_pop; 
        var pop = response.result[city].residential.total_pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var ghgCommerical = response.result[city].commercial.gas_lb_ghg;
        var ghgResidential = response.result[city].residential.gas_lb_ghg;
        var ghgIndustrial = response.result[city].industrial.gas_lb_ghg;
        var ghg = ghgCommerical + ghgResidential + ghgIndustrial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        var cityVMT = response.result[city].city_vmt_estimate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var ntlAvgEst = response.result[city].natl_avg_vmt_estimate;
        var ntlPerCap = response.result[city].natl_per_capita_vmt_estimate;

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
          var cityDieselUse = response.result[city].city_fuel_use.diesel_gal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          var cityGasUse = response.result[city].city_fuel_use.gas_gal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          var ntlDieselAvg = response.result[city].natl_avg_diesel_gal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          var ntlGasAvg = response.result[city].natl_avg_gas_gal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          
  
          return {
            cityDieselUse,
            cityGasUse,
            ntlDieselAvg,
            ntlGasAvg
          }
        }
      )};

      function emissions(state) {
        var queryURL = "https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=" + state + "&type=transportation&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
        return $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function (response) {
            var emissionsState = response.result[state].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            console.log(emissionsState);
    
            return {
              emissionsState
            }
          }
        )};
  
  Promise.all([

    displayCityInfo(),
    getGasDieselSpend(city),
    getVMT(city),
    getWeather(city),
    // .then(handleResult);
    searchCityPop(city),
    searchPollution(city, state)
  ]).then(function (response){
    console.log(response);
    handleResult(response[0], response[1], response[2], response[3], response[4], response[5])
  })
  
})