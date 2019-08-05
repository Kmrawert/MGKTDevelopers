/**
 * Uses AJAX to pull API data for Air Quality Index Score per city, ST. 
 *
 * @param {string} city
 * @param {string} state
 * @returns {Promise.<number>} 
 */
function searchPollution(city, state) {
  var apiKey = "3204bdc9-d215-465a-bb7b-132b32d458d3"

  var queryURL = "http://api.airvisual.com/v2/city?city=" + city + "&state=" + abbrState(state) + "&country=USA&key=" + apiKey
  return $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;
      var aqi = response.data.current.pollution.aqius;
      console.log("This is the Air Quality Index: " + aqi)
      console.log(results);

      return aqi;
    });
};

/**
 * This function is returning the class name to the Air Quality Index Score per city, ST
 *
 * @param {number} aqi
 * @returns {string}
 */
function changeTextColor(aqi) {
  if (aqi <= 50) {
    return "good"
  } else if (aqi >= 51 && aqi <= 100) {
    return "moderate"
  } else if (aqi >= 101 && aqi <= 150) {
    return "unhealthSens"
  } else if (aqi >= 151 && aqi <= 200) {
    return "Unhealthy"
  } else if (aqi >= 201 && aqi <= 300) {
    return "veryUnhealthy"
  } else if (aqi >= 301 && aqi <= 500) {
    return "hazardous"
  };
}

/**
 * updating state abbreviation input to pull full state name from API
 *
 * @param {string} input
 * @returns {string}
 */

function abbrState(input) {

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
  for (i = 0; i < states.length; i++) {
    if (states[i][1] === input) {
      return (states[i][0]);
    }
  }
}