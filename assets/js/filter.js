angular.module('App')
  .filter('trusted', ['$sce', function ($sce) {
  return function(html) {
      return $sce.trustAsHtml(html);
    };
  }])
  .filter('trustedUrl', ['$sce', function ($sce) {
  return function(url) {
      return $sce.trustAsResourceUrl(url);
  };
  }])
  .filter('timeSpent', [function () {
  return function(time) {
      totalTime = Number(time);
      var h = Math.floor(totalTime / 3600);
      var m = Math.floor(totalTime % 3600 / 60);
      var s = Math.floor(totalTime % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
  };
  }])