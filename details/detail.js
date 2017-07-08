// 详情页模块
(function (window) {
    var app = angular.module('details', ['ngRoute', 'service'])
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/details/:id', {
                    templateUrl: './details/detail.html',
                    controller: 'detailsController'
                });
        }]);
    app.controller('detailsController', [
        '$scope',
        '$route',
        '$routeParams',
        'jsonpService',
        function ($scope, $route, $routeParams, jsonpService) {
            $scope.show = true;
            jsonpService.jsonp('http://api.douban.com/v2/movie/subject/' + $routeParams.id, {}, function (data) {
                $scope.data = data;
                $scope.show = false;
                $scope.$apply();
            })
        }])
})(window);