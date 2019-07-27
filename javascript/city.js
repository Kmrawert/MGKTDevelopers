    // Starter array of cities
    var cities = ["boston", "miami", "singapore", "toronto"];

    // this function re-renders the HTML to display the appropriate content
    function displayCityInfo() {

        // Empty the contents of my placeholder on the index page (div with id of city_images)
        $("#city_images").empty();

        var MyCities = $(this).attr("data-name");

        var API_key = "13148120-b768c83f14822b5847fe811cf";

        var queryURL = "https://pixabay.com/api/?key=" + API_key +
        "&q=" + MyCities + "&image_type&per_page=3";

        // var queryURL = "https://pixabay.com/api/?q=" +
        // MyCities + "&api_key=13148120-b768c83f14822b5847fe811cf&limit=10";

    // Creating an AJAX call for the specific city button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // wait until I get my requested data and then do the dirty work
        .then(function(response) {

            console.log(response);

            //var stringified_resonse = JSON.stringify(response);

            //console.log(stringified_resonse);
            console.log(queryURL);

            // $("#buttons-view").text(JSON.stringify(response));

            // store the API call results into myResults
            var myResults = response.hits;

            // console.log(myResults);

            // loop through myResults
            for (var i = 0; i < myResults.length; i++ ) {

            // console.log("myResults length is " + myResults.length);

            // create a div here
            var myDiv = $("<div>");

            // put description of image from loop into var tags
            var tags = myResults[i].tags;
            // console.log(rating);            

            
            // var h3 = $("<h3>").text("Description: " + myResults[i].tags);

            // create a h3 tag that holds the image description
            var h3 = $("<h3>").text("Description: " + tags);


            // console.log("h3 is " + typeof h3);
            // console.log(typeof myResults[i].rating)
            // console.log("Each cycle of Ratings loop: " + rating);
            // console.log("h3 - each loop cycle is " + h3);

            // create a img tag here
            var myImg = $("<img>").attr('class', 'cityImage').css('maxWidth', '350px', 'display', 'inline');

            // Setting the src attribute of the img to a property pulled off the result item

            // animated giphy
            // myImg.attr("data-animate", myResults[i].images.fixed_height.url);

            //image from API
            myImg.attr("src", myResults[i].largeImageURL);

            // set data-still attribute
            // myImg.attr("data-still", myResults[i].images.fixed_height_still.url);

            //set data-state to still
            // myImg.attr("data-state", "still");

            // add gif class
            // myImg.attr("class", "gif");

            // console.log("img result is" + myResults[i].images.fixed_height_still.url);            
            

            // append h3 and img tags to myDiv
            myDiv.append(h3,myImg);

            //append myDiv to my placeholder on the index page (div with id city_images)
            $("#city_images").append(myDiv);                  

            // end for loop
            } 

     
            
        // function(response) end
        });

    // end displayCityInfo()
    }

    // Display my buttons dynamically
    function renderButtons() {

        // Deleting the city buttons prior to adding new city buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Loop through the array of cities
        for (var i = 0; i < cities.length; i++) {

        // Dynamically generate buttons for each city in the array.     
        var city_btn = $("<button>");

        // Add a class
        city_btn.addClass("city");

        // Add a data-attribute with a value of the city at index i
        city_btn.attr("data-name", cities[i]);

        // Provide the button's text with a value of the city at index i
        city_btn.text(cities[i]);

        // Add the button to the div I created in my HTML
        $("#buttons-view").append(city_btn);

        // end for loop
        }
    // end RenderButtons()
    }

    // This function handles events where one button is clicked
    $("#add-city").on("click", function(event) {

        // event.preventDefault() prevents the form from trying to submit itself    
        event.preventDefault();

        // Get text from the input box -trim away white space and force lower case
        var city = $("#city-input").val().trim().toLowerCase();

        // The city from the textbox is then added to my array
        cities.push(city);

        // call renderButtons to handle the processing of the superhero array
        renderButtons();
    });

    // Add a click event listener to all buttons with a class of "city"
    $(document).on("click", ".city", displayCityInfo);

     // Empty the contents of my placeholder on the index page (div with id of super_giphys)
    // $("#super_giphys").empty();

    // Call the renderButtons function at least once to display the initial list of cities
    renderButtons();




