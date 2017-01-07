var x = document.getElementById("demo");
var http = new XMLHttpRequest();
var lat,lng;

$(document).ready(function(){
	getLocation();

	document.getElementById("send").addEventListener("click", function(){

		showPosition(lat,lng);
		googleGeocodeAPI(lat,lng);	});
});

function getLocation() {
	navigator.geolocation.getCurrentPosition(function(location) {
		if (location.coords) {
			//console.log(location.coords.latitude);
  		//console.log(location.coords.longitude);
  		//console.log(location.coords.accuracy);
			//showPosition(location.coords);
			lat = location.coords.latitude;
			lng = location.coords.longitude;
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	});
};


function showPosition(lat,lng) {
	$("#demo-latitude").text("Latitude: " + lat);	
	$("#demo-longitude").text("Longitude: " + lng);
}


function googleGeocodeAPI(lat,lng){
	//var lat = 40.714224;
	//var lng = -73.961452;
	//var data;
  $.post("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true", function(data){
		console.log(data);		
		return data;      
		//alert("Data: " + data.results[0].address_components[0].long_name);
  });
}
