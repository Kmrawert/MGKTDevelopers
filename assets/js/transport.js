var row = $('.row');


// Event listener for all button elements 
$("#submitCity").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var city = $('#city_input').val().trim();
    var state = $('#state_input').val().trim();
    console.log(city);
    console.log(state);
    // var population = $('#populationScore').val().trim();
    var cityTitle = $('#cityName').text(city + ',');
    var stateTitle = $('#stateName').text(state);

    // var populationResult = $('#populationScore').text(population);
    

    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    var popLabel = $('<label>').text('Population: ');
    newCard.append(cityTitle, stateTitle, popLabel);
    
    row.prepend(newCard);
    
    
    
    
  function searchCityPop(city) {
      var queryURL = "https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
      //var queryURL = "https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?city=" + city + "&state_abbr=" + state + "&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
              
              //createRow(response);
            // Storing an array of results in the results variable
            var results = response.data;
              console.log(response);
              //var cityPop = response.result.Chicago.residential.total_pop; 
              var pop = response.result[city].residential.total_pop;
              console.log(pop);
              //var popInput = $('#populationScore').text(pop);
              var popInput = $('<div>').addClass('populationScore').text(pop);
              newCard.append(popInput);
              console.log(cityPop);
              
          });
      }

    searchCityPop(city);})