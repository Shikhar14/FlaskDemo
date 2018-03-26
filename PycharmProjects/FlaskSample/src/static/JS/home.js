var myApp = angular.module('sample', ['ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider) {
  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'static/HTMLs/login.html'
  }

  var registrationState = {
    name: 'registration',
    url: '/registration',
    templateUrl: 'static/HTMLs/registration.html'
  }
var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'static/HTMLs/home.html'
  }
  $stateProvider.state(loginState);
  $stateProvider.state(registrationState);
  $stateProvider.state(homeState);
  $urlRouterProvider.when('', '/login');
});

myApp.controller('loginCtrl', function ($scope,$http,$state) {
$scope.login = function()
    {
        $http({
                method: "POST",
                url: "/login",
                data: $scope.signin
            }).then(function mySuccess(response) {
            $scope.myWelcome = response.data;
            if($scope.myWelcome=='success')
            {
                $state.go('home');
            }
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.reset = function()
    {
        $http.signin = {};
    }
});

myApp.controller('registerCtrl', function ($scope,$http) {
    $scope.registration = function()
    {
        $scope.register.name = $scope.fname+' '+ $scope.lname;
        $http({
                method: "POST",
                url: "/signup",
                data: $scope.register
            }).then(function mySuccess(response) {
            $scope.reply = response.data;
            if($scope.reply == 'Data Saved Successfully')
            {
                $scope.reply = 'User Registered Successfully. Please proceed to Login.';
                $scope.fname = '';
                $scope.lname = '';
                $scope.cpassword = '';
            }
        }, function myError(response) {
            $scope.register = response.statusText;
        });
    }

 $scope.resetRegister = function()
    {
        $scope.register = {};
        $scope.fname = '';
        $scope.lname = '';
        $scope.cpassword = '';
    }
});