/**
 * Programming assignment:  Group Project
 * Developer:               Gail Deadwyler
 * Date Written:            8/5/19
 * Purpose:                 Displays a city or default image when the user hits the submit button
 */

function displayCityInfo() {

    
    var city = $("#city_input").val();
   

    // my API key
    var API_key = "13148120-b768c83f14822b5847fe811cf";

    // pixabay API call
    var queryURL = "https://pixabay.com/api/?key=" + API_key +
    "&q=" + city + "&image_type&per_page=3";       

    // Creating an AJAX call for the specific city 
    console.log(queryURL);
    return $.ajax({
        url: queryURL,
        method: "GET"
    })
    // wait until I get my requested data and then do the dirty work
    .then(function(response) {
        

        // if totalHits === 0, pixabay has no image, display default image
        if (response.totalHits === 0) {
            

            $("#cityImage").attr('class', 'cityImage').css('maxWidth', '350px');

             //default image 
             $("#cityImage").attr("src", "assets/images/default.jpg");            

        } 
        
        else {

        // store the API call results into myResults
        var myResults = response.hits;  

        $("#cityImage").attr('class', 'cityImage').css('maxWidth', '350px');       

        //image from API
        var imageURL = myResults[0].largeImageURL;              

        // end else statement
        }   
        console.log(myResults);
        return { 
            imageURL
        } 
        
    // function(response) end
    });

// end displayCityInfo()
}

// Add a click event listener to the submit button with id of "submit city"
$(document).on("click", "#submitCity", displayCityInfo);