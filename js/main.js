var x = document.getElementById("demo");
var http = new XMLHttpRequest();
var lat,lng;
var temp = 'c';

$(document).ready(function(){
	changeDisabilityButtons(true);
	getLocation(usePosition);

	document.getElementById("refresh").addEventListener("click", function(){
		changeDisabilityButtons(true);
		getLocation(usePosition);
	});
	document.getElementById("change").addEventListener("click", function(){
		changeDisabilityButtons(true);		
		change();		
		usePosition(lat,lng);
	});
});


function changeDisabilityButtons(state){
	$('#change').prop('disabled', state);
	$('#refresh').prop('disabled', state);
}


function change() {
	if (temp === 'c') {
		temp = 'f';
		$('#change').text("to Celsius");
	} else {
		temp = 'c'
		$('#change').text("to Fahrenheit");
	}
}

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
}

function showAddress(data) {
	var location  = data.results[1].formatted_address;
	$("#formatted-address").text(location);
	showWeather(location);
}

function showWeather(location) {

  $.simpleWeather({		
    location: location,
    woeid: '',
    unit: temp,
    success: function(weather) {
      $("#weather-temp").html('<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>');
      $("#weather-icon").html('<img src="'+weather.thumbnail+'">');
			$("#weather-wind").html('<p>'+weather.wind.direction+' '+Math.round(weather.wind.speed)+' '+weather.units.speed+'</p>');
			$("#weather-curr").html('<p>'+weather.currently+'</p>');
			changeBackgroundImage(weather.currently);
			changeDisabilityButtons(false);
    },
    error: function(error) {
			console.log('Error: '+error);
      $("#weather-temp").html('<p>Please wait</p>');
			window.setTimeout(showWeather(location), 1000);
    }
  })
}

function changeBackgroundImage(curr) {
	switch(curr) {
	case "Blowing Snow":
		$('body').css('background-image','url(img/Blowing-Snow.jpg)');
		break;
	case "Breezy":
		$('body').css('background-image','url(img/Breezy.jpg)');
		break;
	case "Clear":
		$('body').css('background-image','url(img/Clear.jpg)');
		break;
	case "Cloudy":
		$('body').css('background-image','url(img/Cloudy.jpg)');
		break;
	case "Mostly Sunny":
		$('body').css('background-image','url(img/Mostly-Sunny.jpg)');
		break;
	case "Partly Cloudy":
		$('body').css('background-image','url(img/Partly-Cloudy.jpg)');
		break;
	case "Partly Cloudy":
		$('body').css('background-image','url(img/Partly-Cloudy.jpg)');
		break;
	case "Rain":
		$('body').css('background-image','url(img/Rain.jpg)');
		break;
	case "Snow":
		$('body').css('background-image','url(img/Snow.jpg)');
		break;
	case "Snow Showers":
		$('body').css('background-image','url(img/Snow-Showers.jpg)');
		break;
	default:
		$('body').css('background-color','red');
		break;
	}
}

function googleGeocodeAPI(lat,lng,callback){
  $.post("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true", function(data){
		callback(data);     
  });
}
