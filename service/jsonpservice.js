// 自写jsonp函数跨域，实现可获取json格式数据的请求
(function (window) {
    var app = angular.module('service', [])
    app.service('jsonpService', ['$window', function ($window) {
        this.name = "test";
        this.jsonp = function jsonp(url, config, fn) {
             // 动态创建script
            var script = document.createElement('script');
            var query = '';
            for (var k in config) {
                query += k + '=' + config[k] + '&';
            }
            // ?a=1&b=2&callback=jsonp_4551313
            // 拼接参数
            url += '?' + query;
            var callbackName = 'jsonp_' + Math.random().toString().substr(2);
            $window[callbackName] = function (data) {
                // 将返回的数据用回调函数包裹，形成一个jsonp数据
                fn(data);
            }
            // 拼接回调函数
            url += 'callback=' + callbackName;
           
            script.src = url;
            $window.document.body.appendChild(script);
        }
    }])
})(window);