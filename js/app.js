"use strict";

angular.module('Menu', ['ReviewApp', 'Carousel', 'googleMaps'])
	.controller('MenuController', function($scope) {
	$scope.menu = menuItems;




	});


var today = new Date();
var storeHours = new Date();

var timeNow = today.getTime()



	
angular.module('Carousel', ['ui.bootstrap'])
  .controller('FoodCarousel', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  });

angular.module('googleMaps', [])
  .controller('MapCtrl', function ($scope) {

      var mapOptions = {
          center: new google.maps.LatLng(40.0000, -98.0000),
          zoom: 4
      }

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      var infoWindow = new google.maps.InfoWindow();
      
      var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(47.659420, -122.313302),
          title: "China First"
      }); 

      infoWindow.setContent("<p>4237 University Way NE</p>");
      infoWindow.open(map, marker);

  });
 
 