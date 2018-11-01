var conditions;
var forecast;

$(document).ready(function () {
    // code for accepting user input of zipcode with error handling
    $('#form').submit(function (event) {
        event.preventDefault();
        var zipCode = $('.user-input').val();
        // check for valid number, also html input type is set to num or number
        if (zipCode.length !== 5) {
            alert('Please enter a valid zipcode');
        } else {

            //Returns the current temperature, weather condition, humidity, wind, 'feels like' temperature, barometric pressure, and visibility.
            conditions = 'https://api.wunderground.com/api/9d4257c7e0413f4b/conditions/q/' + zipCode + '.json';
            //Returns a summary of the weather for the next 3 days. This includes high and low temperatures, a string text forecast and the conditions.
            forecast = 'https: //api.wunderground.com/api/9d4257c7e0413f4b/forecast/q/' + zipCode + '.json';
            weatherInfo(conditions);
        }
    });
    //api call for weather and store to variables
    function weatherInfo(conditions) {
        $.getJSON(conditions, function (data) {
            populateWeather(data);
        });
    }

    function populateWeather(data) {
        var temp_f = data.current_observation.temp_f;
        var latValue = Math.round(data.current_observation.display_location.latitude * 100) / 100;
        var longValue = Math.round(data.current_observation.display_location.longitude * 100) / 100;
        var skies = data.current_observation.weather;
        var icon = data.current_observation.icon_url;
        var conditions = data.current_observation.weather;
        var url = data.current_observation.forecast_url;
        var coools = `${temp_f} degrees F and ${conditions} `
        coools += "<a href=" + url + " target='_blank'>Forecast Information</a>"
        $('.weather-results').html(coools);
        apiCallGeocode(latValue, longValue);

    }

    //api call for Geocode
    function apiCallGeocode(latValue, longValue) {
        function setHeader(xhr) {
            xhr.setRequestHeader('user-key', '2feb645051247922577a0d2f4a387122');
        }
        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/geocode?lat=' + latValue + '&lon=' + longValue,
            type: 'GET',
            dataType: 'json',
            success: function (receivedApiData) {


                populateHtml(receivedApiData.nearby_restaurants);
            },
            error: function () {
                alert('boo!');
            },
            beforeSend: setHeader
        });
    }

    // end of api section now populate html
    function populateHtml(establishments) {
        var htmlDisplay = ""; // empty var to store one li for each one of the results
        $.each(establishments, function (establishmentsKey, establishmentsValue) {

            htmlDisplay += "<div class='restaurant'>";
            htmlDisplay += "<h1>" + establishmentsValue.restaurant.name + "</h1>";
            if (establishmentsValue.restaurant.featured_image != "") {
                htmlDisplay += "<img src=" + establishmentsValue.restaurant.featured_image + ">" //
            } else {
                htmlDisplay += "<img src=media/default.jpg>" //
            }
            htmlDisplay += "<h2>" + establishmentsValue.restaurant.cuisines + "</h2>";
            htmlDisplay += "<h2>Average cost</h2>";
            htmlDisplay += "<h2>" + (establishmentsValue.restaurant.average_cost_for_two / 2) + establishmentsValue.restaurant.currency + "</h2>";
            htmlDisplay += "<p>";
            htmlDisplay += "<span>" + establishmentsValue.restaurant.user_rating.aggregate_rating + "/5</span>";
            htmlDisplay += "<span> &#9734, </span><span>" + establishmentsValue.restaurant.user_rating.votes + "votes </span>";
            htmlDisplay += "</p>";
            htmlDisplay += "<p>" + establishmentsValue.restaurant.location.address + "</p>";
            htmlDisplay += "<a href=" + establishmentsValue.restaurant.url + " target='_blank'>Directions & Menu</a>"; // establishmentsValue.restaurant.url is the specific one needed.
            htmlDisplay += "</div>";
            // establishmentsValue.restaurant.url is the specific one needed.
        });
        if (establishments.length > 0) {
            $(".results-counter").text("Showing " + establishments.length + " results");
        } else {
            $(".results-counter").text("No results");
        }

        $(".results-wrapper")
            .empty()
            .append('errHTML')
            .prop('hidden', false);
        //use the HTML output to show it in the index.html
        $(".results-wrapper").html(htmlDisplay);
        $(".results-wrapper").show();
    }

});





