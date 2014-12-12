"use strict";

//Application ID : spMvaRZUFBI4OMrjRwwL96HWElgsWHwPvZ3SEgoh
//REST API Key : DTtgWxi1OVVbMhPP9FEu1Kih437VLJvy1VJBh42Y

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
			$scope.hoverMessage = "";
			$scope.hoverRating = value + "/" + $scope.max;
			if(value == 1) {
				$scope.hoverMessage = "Hated it with every fiber of my being!";
			} else if (value == 2) {
				$scope.hoverMessage = "Not the best...";
			} else if (value == 3) {
				$scope.hoverMessage = "Fine.";
			} else if (value == 4) {
				$scope.hoverMessage = "This is pretty cool!";
			} else if (value == 5) {
				$scope.hoverMessage = "Envoked feelings from me I thought I'd never feel again.";
			}
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
