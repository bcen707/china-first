$(document).ready(function() {
	"use strict";
	var latitudeDefault = 47.659407;
	var longitudeDefault = -122.313306;
	var mapOptions = {
		center: {lat: latitudeDefault, lng: longitudeDefault},
		zoom: 4
	};
	var map = new google.maps.Map(document.getElementById('maparea'), mapOptions);


});

angular.module('Menu', [])
	.controller('MenuController', function($scope) {
	$scope.menu = menuItems;


});	