var app = angular.module('myApp', [
  'ngRoute'
])

app.config(function($locationProvider, $routeProvider) {

  $locationProvider.html5Mode(true).hashPrefix('');

  $routeProvider
    .when('/details/:id', {
      templateUrl: 'detail.html',
      controller: 'HotelDetails'
    })
    .when('/', {
      templateUrl: 'main.html',
      controller: 'Hotels'
    })
})

app.controller('Hotels', function($scope, $http) {
  $scope.hotels = []
  $http.get("https://localhost:44344/api/hotels")
      .then(function(response){
          $scope.hotels = response.data
      })
  $scope.sendDestacado = function(Id, Destacado){

    $http.post('https://localhost:44344/api/Hotel/SetDestacado?id=' + Id + '&destacado=' + Destacado, {method: 'POST', redirect: 'follow'})
        .then(function(response){
          location.reload()
        })
  }
})

app.controller('HotelDetails',function($scope, $http, $routeParams) {
  $scope.hoteldetails = []
  $http.get("https://localhost:44344/api/hoteldetails/" + $routeParams.id)
      .then(function(response){
          $scope.hoteldetails = response.data
      })
})
