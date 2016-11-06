angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories/categories.template.html',
      controller: 'CategoriesListController as categ',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService
            .getAllCategories().
            then(function(result){
              return result.data;
            });
        }]
      }
    })

    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/items/items.template.html',
      controller: 'ItemDetailController as detail',
      resolve: {
        items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
          return MenuDataService
            .getItemsForCategory($stateParams.categoryShortName)
            .then(function(result){
              return result.data;
            });
        }]
      }
    });
}
