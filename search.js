(function (angular) {
    var app = angular.module('search', ['ngRoute', 'service'])
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/search/:q?', {
                templateUrl: './search.html',
                controller: 'searchcontroller'
            })
    }]);
    app.controller('searchcontroller', [
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
            $scope.pageSize = 15;
            // 开始请求的页数
            var start = ($scope.page - 1) * 2;
            jsonpService.jsonp('http://api.douban.com/v2/movie/search',
                { start: start, count: $scope.pageSize, q: $routeParams.q }, function (data) {
                    $scope.data = data;
                    $scope.totalPage = Math.ceil($scope.data.total / $scope.pageSize);
                    // console.log($scope.totalPage);
                    $scope.show = false;
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


