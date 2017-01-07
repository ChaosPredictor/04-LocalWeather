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
	$("#demo-latitude").text("Latitude: " + lat);	
	$("#demo-longitude").text("Longitude: " + lng);
}

function showAddress(data) {
	$("#formatted-address").text("Formatted Address: " + data.results[1].formatted_address);	
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
