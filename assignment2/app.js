(function(){
'use strict';

var shoppingList = [
  {
    name: "Chocolate bars",
    quantity: "2"
  },
  {
    name: "Cheesecake",
    quantity: "1"
  },{
    name: "Carrots",
    quantity: "4"
  },
  {
    name: "Dark cookies",
    quantity: "1"
  },
  {
    name: "Cookies",
    quantity: "10"
  },
  {
    name: "The one ring (precious)",
    quantity: "1"
  }
];

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var ctrl = this;

  ctrl.items = ShoppingListCheckOffService.getToBuyList();
  ctrl.checkOffItem = function(index){
    ShoppingListCheckOffService.checkOffItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
  var ctrl = this;

  ctrl.items = ShoppingListCheckOffService.getBoughtList();
}

function ShoppingListCheckOffService () {
  var toBuyList = shoppingList;
  var boughtList = [];

  var service = this;

  service.getToBuyList = function() {
    return toBuyList;
  }

  service.getBoughtList = function() {
    return boughtList;
  }

  service.checkOffItem = function(index) {
    boughtList.push(toBuyList[index]);
    toBuyList.splice(index, 1);
  }

}

})();
