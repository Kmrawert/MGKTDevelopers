$("#submitCity").on("click", function() {

    var city = $('#city_input').val().trim();
    var state = $('#state_input').val().trim();

    function searchPollution() {
    var apiKey = "3204bdc9-d215-465a-bb7b-132b32d458d3"

    var queryURL = "http://api.airvisual.com/v2/city?city=" + city + "&state=" + abbrState(state) + "&country=USA&key=" + apiKey
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data.current.pollution.aqius;
          console.log(results)});
    
    }
searchPollution();
console.log(abbrState(state));
});

//updating state abbreviation input to pull full state name from API
function abbrState(input){
    
    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
       input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] === input){
                return(states[i][0]);
            }
        }    
}