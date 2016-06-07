angular.module('rssFactoryModule',[])
.factory('rssFactory', ['$http', function($http) {
  var sendXHR = function(method,url,params){
    return $http({
      method: method,
      url: url,
      params: params
    });
  }

  return {
    getFeeds: function (method,url,params) {
      var limit = 10;
      if (params) {
        limit = params.limit;
      }
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+limit+'&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }  
  
}]); 
