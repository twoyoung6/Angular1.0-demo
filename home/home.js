// 首页模块路由
(function (angular) {
    var app = angular.module('home', ['ngRoute'])
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home_page', {
                templateUrl: 'home/home.html',
                controller: 'homecontroller'
            })
    }]);
    app.controller('homecontroller', ['$scope', function ($scope) {

    }])
})(angular);