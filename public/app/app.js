var app = angular.module('app', ['btford.socket-io', 'ui.router','highcharts-ng']);

// Set up UI-Router
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('default',
        {
            url: '/default',
            templateUrl: 'app/default/default.html',
            controller: 'DefaultController',
            controllerAs: 'vm'
        });
      
        
    $urlRouterProvider.otherwise('/default');
    // use the HTML5 History API
    $locationProvider.html5Mode(true); //removes the # 
}]);

app.filter('inArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
}); 