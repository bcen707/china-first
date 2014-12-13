"use strict";

angular.module('Menu', ['ReviewApp', 'Carousel', 'googleMaps'])
	.controller('MenuController', function($scope) {
	$scope.menu = menuItems;
  $scope.order = name;



	});


var today = new Date();
var storeHours = new Date();

var timeNow = today.getTime()



	
angular.module('Carousel', ['ui.bootstrap'])
  .controller('FoodCarousel', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: "img/carousel" + index + ".jpg",
      });
    };
    for (var index = 1; index <= 4; index++) {
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

  angular.module('ReviewApp', ['ui.bootstrap'])
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'spMvaRZUFBI4OMrjRwwL96HWElgsWHwPvZ3SEgoh';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'DTtgWxi1OVVbMhPP9FEu1Kih437VLJvy1VJBh42Y';
  })
  .controller('ReviewCtrl', function($scope, $http) {

    //Enables Rating Functionality
    $scope.rate = 1;
    $scope.max = 5;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.hoverRating = value + "/" + $scope.max;
    };

    //Parse.com URL base
    var reviewUrl = "https://api.parse.com/1/classes/ChinaFirstReviews";

    $scope.hasReviews = false;

    $scope.refreshReviews = function() {
      $scope.loading = true;
      $http.get(reviewUrl)
        .success(function(responseData) {
          $scope.reviews = responseData.results;
        })
        .error(function(err) {
          alert(err);
        })
        .finally(function() {
          $scope.loading = false;
          if($scope.reviews.length > 0) {
            $scope.hasReviews = true;
          } else {
            $scope.hasReviews = false;
          };
        });
    };

    $scope.refreshReviews();
    $scope.currentReview = {score: 0};

    $scope.addReview = function(review) {
      $scope.addingReview = true;
      $http.post(reviewUrl, review)
                .success(function(responseData) {
                    review.objectId = responseData.objectId;
                    $scope.reviews.push(review);
                    $scope.currentReview = {score : 0};
                })
                .error(function(err) {
                    alert(err);
                })
                .finally(function() {
                    $scope.addingReview = false;
                    $scope.refreshReviews();
                });
    }

    $scope.deleteReview = function(reviewId) {
      $scope.deleting = true;
      $http.delete(reviewUrl + "/" + reviewId)
        .success(function(responseData) {

        })
        .error(function(err) {
          alert(err);
        })
        .finally(function() {
          $scope.deleting = false;
          $scope.refreshReviews();
        });
    }

    $scope.incrimentScore = function(change, reviewId, score) {
      if((score != 0) || (change != -1)) {
        $scope.incriment = {
          "score": {
            "__op": "Increment",
            "amount": change
          }
        };
        $http.put(reviewUrl + "/" + reviewId, $scope.incriment)
          .success(function(responseData) {

          })
          .error(function(err) {
            alert(err);
          })
          .finally(function() {

          });
      }
    }

    $scope.negativeTest = function(score, reviewId) {
      if (score < 0) {
        return 0;
      } else {
        return score;
      }
    }

  });
 
 