angular.module('autoTrader', [])

	.controller('appCtrl', function ($scope, $sce, $window, $location, $timeout) {
		var queryParams = getQueryStrings();

		$scope.userObj = {
			dob: "15/11/1985",
			gender: "F",
			mobile: "9603460463",
			pan: "COEQS5355Q",
			password: "12345",
			userId: "NSEUSER1",
			returnUrl: "https://accounts.ftindiaqa1.corp.frk.com/cp/citibank.html"
		};

		$scope.sectionOptions = ['1', '2'];
		$scope.selectedName = '1';

		function getQueryStrings() {
			var assoc = {};
			var decode = function (s) {
				return decodeURIComponent(s.replace(/\+/g, " "));
			};
			var queryString = location.search.substring(1);
			var keyValues = queryString.split('&');

			for (var i in keyValues) {
				var key = keyValues[i].split('=');
				if (key.length > 1) {
					assoc[decode(key[0])] = decode(key[1]);
				}
			}
			return assoc;
		}

		$scope.checkAadhaar = function () {
			if($scope.selectedName === '1') {
				$scope.submitURL = $sce.trustAsResourceUrl('https://accounts.ftindiaqa1.corp.frk.com/proxyApp/ftAadhaarService');
				$scope.userObj.requestType = '1';
				$scope.proxyReqObj = JSON.stringify($scope.userObj);
				$timeout(function () {
					document.getElementById('prxoyForm').submit();
				}, 100);
			} else if($scope.selectedName === '2') {
				$scope.submitURL = $sce.trustAsResourceUrl('https://accounts.ftindiaqa1.corp.frk.com/proxyApp/ftAadhaarService');
				$scope.userObj.requestType = '2';
				$scope.proxyReqObj = JSON.stringify($scope.userObj);
				$timeout(function () {
					document.getElementById('prxoyForm').submit();
				}, 100);
			}
		}

		$scope.changed = function (selected) {
			$scope.selected = selected;
		};

		$scope.aadhaarAlreadySubmitted = !!queryParams.responseCode;

		if (queryParams.responseCode === 'Available' || queryParams.responseCode === 'AL001') {
			$scope.successMessage = 'AADHAAR has been already submitted for the PAN.';
		} else if (queryParams.responseCode === 'AL000') {
			$scope.successMessage = 'AADHAAR has been successfully submitted for the PAN.';
		} else if (queryParams.responseCode === 'Not Available') {
			$scope.successMessage = 'AADHAAR is not available.';
		}
	});