angular.module('autoTrader', [])

.controller('appCtrl', function($scope){
	$scope.title = 'Auto Traders';
	$scope.slots = {};
	$scope.hourSlots = [
		'9:00 AM - 10:00 AM',
		'10:00 AM - 11:00 AM',
		'11:00 AM - 12:00 PM',
		'12:00 PM - 1:00 PM',
		'1:00 PM - 2:00 PM',
		'2:00 PM - 3:00 PM',
		'3:00 PM - 4:00 PM',
		'4:00 PM - 5:00 PM' 
	];


	$scope.openSlot = function(slot){
		$scope.openModal = true;
		$scope.selectedSlot = slot;
		if(!$scope.slots[slot]){
			$scope.name = null;
			$scope.phone = null;
		} else {
			$scope.name = $scope.slots[slot].name;
			$scope.phone = $scope.slots[slot].phone;
		}
	};

	$scope.postData = function(){
		if($scope.name && $scope.phone){
			$scope.openModal = false;
			$scope.slots[$scope.selectedSlot] = {};
			$scope.slots[$scope.selectedSlot].name = $scope.name;
			$scope.slots[$scope.selectedSlot].phone = $scope.phone;
		}
	};
})