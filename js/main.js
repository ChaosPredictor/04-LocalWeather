var x = document.getElementById("demo");
var http = new XMLHttpRequest();
var lat,lng;

$(document).ready(function(){
	getLocation(usePosition);

	//document.getElementById("send").addEventListener("click", function(){

		//showPosition(lat,lng);
		//googleGeocodeAPI(lat,lng);	});
});

function getLocation(callback) {
	navigator.geolocation.getCurrentPosition(function(location) {
		if (location.coords) {
			lat = location.coords.latitude;
			lng = location.coords.longitude;
			callback(lat,lng);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	});
};

function usePosition(lat,lng) {
	showPosition(lat,lng);
	googleGeocodeAPI(lat,lng,showAddress);
}


function showPosition(lat,lng) {
	//$("#demo-latitude").text("Latitude: " + lat);	
	//$("#demo-longitude").text("Longitude: " + lng);
}

function showAddress(data) {
	var location  = data.results[1].formatted_address;
	$("#formatted-address").text(location);
	showWeather(location);
}

function showWeather(location) {
	//console.log(location);
  $.simpleWeather({		
    //location: 'Tel Aviv-Yafo, IL',
    //location: 'Tel Aviv-Yafo, Israel',
    location: location,
    woeid: '',
    unit: 'c',
    success: function(weather) {
      //html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';
      $("#weather-temp").html('<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>');
      $("#weather-icon").html('<img src="'+weather.thumbnail+'">');
			$("#weather-wind").html('<p><strong>Wind</strong>: '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</p>');
			//var html = '<p><strong><a href="http://www.jqueryscript.net/tags.php?/Thumbnail/">Thumbnail</a></strong>: <img src="'+weather.thumbnail+'"></p>';
			var html = '<p><strong>Currently</strong>: '+weather.currently;
			$("#weather").html(html);
    },
    error: function(error) {
      $("#weather-temp").html('<p> Error: '+error+'</p>');
			window.setTimeout(showWeather(location), 1000);
    }
  })
}

function googleGeocodeAPI(lat,lng,callback){
	//var lat = 40.714224;
	//var lng = -73.961452;
	//var data;
  $.post("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true", function(data){
		//console.log(data);		
		//return data; 
		callback(data);     
		//alert("Data: " + data.results[0].address_components[0].long_name);
  });
}
