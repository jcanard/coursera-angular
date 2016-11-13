(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', 'MenuService'];
function SignUpController(UserService, MenuService) {
  var $ctrl = this;
  $ctrl.signUpCompleted = false;

  $ctrl.createUser = function() {
    console.log($ctrl.user);

    MenuService.getMenuItem($ctrl.menuShortName).then(function(response){
      $ctrl.menuName = response.name;
      $ctrl.user.menu = response;
      UserService.createUser($ctrl.user);
      $ctrl.signUpCompleted = true;
      $ctrl.noMenuFound = false;
    }, function(error) {
      $ctrl.noMenuFound = true;
    });
  }
}


})();
