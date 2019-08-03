var row = $('.row');

$('#city_input').focus()


function handleSearch() {
  // In this case, the "this" keyword refers to the button that was clicked
  
  // var cityImg = $('#cityImage');
  var city = $('#city_input').val().trim();
  $('#city_input').val("")

  function uppercase(string) {
    return string.substring (0,1).toUpperCase()+string.substring (1,string.lenght) .toLowerCase ()
  }

  city = city .split(" ") .map(uppercase).join(" ");
  console.log(city)

  var state = $('#state_input').val().trim().toUpperCase();
 $('#state_input').val("")

  console.log(city);
  console.log(state);
  // var population = $('#populationScore').val().trim();
  var cityTitle = $('#cityName').text(city + ',');
  var stateTitle = $('#stateName').text(state);

  // returns weather function and population results and places in new card div
  function handleResult(gas, cityVMT, weather, popObj, pollution) {
    console.log(weather);
    var weatherHTML = renderWeather(weather);
    console.log(renderWeather(weather));
    
    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    var popLabel = $('<div>').text('Population: ' + popObj.pop).addClass('labelPop');

    var pollutionScore = $('<div>').text('Air Quality Index: ')
    var aqi = $('<strong>').text(pollution).addClass(changeTextColor(pollution))
    pollutionScore.append(aqi)

    var cityVMTLabel = $('<div>').text('City VMT: ' + cityVMT.cityVMT + ' miles').addClass('labelPop');
    var gasLabel = $('<div>').text('City Gas Usage: ' + gas.cityGasUse + ' gallons').addClass('labelPop');
    var ntlGasLabel = $('<div>').text('National Average Gas Use: ' + gas.ntlGasAvg + ' gallons').addClass('labelPop');
    var dieselLabel = $('<div>').text('City Diesel Usage: ' + gas.cityDieselUse + ' gallons').addClass('labelPop');
    var ntlDeiselLabel = $('<div>').text('National Average Diesel Usage: ' + gas.ntlDieselAvg + ' gallons').addClass('labelPop');
    var weatherVal = $('<div>').html(weatherHTML).addClass('weather');
    
    newCard.append(cityTitle, stateTitle, '<br>', popLabel, pollutionScore, cityVMTLabel, gasLabel, ntlGasLabel, dieselLabel, ntlDeiselLabel, weatherVal);

    row.prepend(newCard);
    }

    
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
  
  Promise.all([
    getGasDieselSpend(city),
    getVMT(city),
    getWeather(city),
    // .then(handleResult);
    searchCityPop(city),
    searchPollution(city,state)
  ]).then(function (response){
    handleResult(response[0], response[1], response[2], response[3], response[4])
    $('#city_input').focus()
  })
  
}

function handleEnteronSearch (event){
  if (event.which === 13){
    handleSearch()
  }
}

// Event listener for all button elements 
$("#submitCity").on("click",handleSearch)
$('#state_input').on("keypress",handleEnteronSearch)
$('#city_input').on("keypress",function (event){
  if (event.which === 13){
    $('#state_input').focus()
  }
})
