(function(){
'use strict';


angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .constant('url', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems',FoundItemsDirective);

/*
 * Controller principal
 */
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var controller = this;

  controller.searchText = "";

  controller.search = function() {
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchText);

    promise.then(function (response) {
      controller.found = MenuSearchService.getItems();
      //console.log(controller.found);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  controller.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  }
}

/*
 * Service associé au controller principal, pour accès à l'API + tri des données
 */
MenuSearchService.$inject = ['$http', 'url']
function MenuSearchService ($http, url) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    service.foundItems = [];

    var response = $http({method: "GET", url: url})
    .then(function (result) {  // return
      var allItems = result.data.menu_items;

      if (searchTerm != "") {
        for (var i = 0; i < allItems.length; i++) {
          var name = allItems[i].name;
          if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            service.foundItems.push(allItems[i]);
          }
        }
      }
    });
    console.log(service.foundItems);
    return response;
  }

  service.removeItem = function(itemIndex) {
    console.log("remove item", service.foundItems[itemIndex]);
    service.foundItems.splice(itemIndex, 1);
  }

  service.getItems = function(){
    return service.foundItems;
  }
}

/*
 * Directive d'affichage de la liste
 */
function FoundItemsDirective() {
  var ddo = {
    templateUrl: "foundItems.html",
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

/*
 * controller de la directive
 */
function FoundItemsDirectiveController(){
  var list = this;

  list.nothingFound = function() {

    if(list.foundItems !== undefined)
      return list.foundItems.length === 0;
    else
      return false;
  }

}


})();
