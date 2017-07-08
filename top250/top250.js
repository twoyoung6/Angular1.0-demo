(function (angular) {
    var app = angular.module('top250', ['ngRoute', 'service'])
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/top250/:page?', {
                templateUrl: 'top250/top250.html',
                controller: 'top250controller'
            })
    }]);
    app.controller('top250controller', [
        '$scope',
        '$http',
        '$route',
        '$routeParams',
        'jsonpService',
        // 服务控制器依赖的模块需要写在最后面
        function ($scope, $http, $route, $routeParams, jsonpService) {
            $scope.show = true;
            // 获取路由中存储的页数
            $scope.page = ($routeParams.page || '1') - 0;
            $scope.pageSize = 10;
            // 开始请求的页数
            var start = ($scope.page - 1) * 2;
            jsonpService.jsonp('http://api.douban.com/v2/movie/top250',
                { start: start, count: $scope.pageSize, q: $routeParams.q }, function (data) {
                    $scope.data = data;
                    $scope.show = false;
                    $scope.totalPage = Math.ceil($scope.data.total / $scope.pageSize);
                    // console.log($scope.totalPage);
                    $scope.$apply();
                })
            $scope.getPage = function (nowPage) {
                if (nowPage <= 0 || nowPage > $scope.totalPage) {
                    return;
                }
                $route.updateParams({ page: nowPage });
            }

        }])
})(angular);