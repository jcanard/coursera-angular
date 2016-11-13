(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;

  service.createUser = function(user) {
    service.user = user;
  };


  service.getUser = function () {
    return service.user;
  };

}

})();
