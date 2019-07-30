var row = $('.row');

// Event listener for all button elements
$("#submitCity").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var city = $('#city_input').val().trim();
    var state = $('#state_input').val().trim();
    // var population = $('#populationScore').val().trim();
    var cityTitle = $('#cityName').text(city);
    var stateTitle = $('#stateName').text(state);
    // var populationResult = $('#populationScore').text(population);
    

    newCard = $('<div>');
    newCard.addClass('col').addClass('s6').addClass('card').attr('col', '6');
    newCard.append(cityTitle, stateTitle);
    
    row.prepend(newCard);
    
    console.log(response);
    
    
    var searchPop = function(city) {

   


    var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=1&api_key=747TiEoH0cbzahNKEvsVDGRUMhmYF1hJzeGlHaqx";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            
            createRow(response);
          // Storing an array of results in the results variable
          var results = response.data;
            console.log(results)
        });
    
    }

    searchPop();})