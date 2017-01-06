var x = document.getElementById("demo");

$(document).ready(function(){
	getLocation();

	document.getElementById("send").addEventListener("click", function(){
		send();
	});
});

function getLocation() {
	navigator.geolocation.getCurrentPosition(function(location) {
		if (location.coords) {
			console.log(location.coords.latitude);
  		console.log(location.coords.longitude);
  		console.log(location.coords.accuracy);
			showPosition(location.coords);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	});
};


function showPosition(position) {
	$("#demo-latitude").text("Latitude: " + position.latitude);	
	$("#demo-longitude").text("Longitude: " + position.longitude);
}


function send(){
	var lat = 40.714224;
	var lng = -73.961452;
	console.log(window.open("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true"));
}
