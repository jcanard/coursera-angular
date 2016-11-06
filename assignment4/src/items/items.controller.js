(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['MenuDataService', 'items'];
function ItemDetailController(MenuDataService, items) {
  var detail = this;
  console.log(items);
  detail.items = items.menu_items;
}

})();
