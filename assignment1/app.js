(function(){
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
    $scope.food = "";
    $scope.message = "";

    $scope.checkFood = function(){
      String.prototype.trim($scope.food)
      if($scope.food == "") {
        $scope.message = "Please enter data first";
        return;
      }
      var foodArray = $scope.food.split(";");
      if(foodArray.length > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
}

})();
