"use strict";

angular.module('Menu', ['ReviewApp', 'Carousel'])
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
 
 