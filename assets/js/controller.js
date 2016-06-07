angular.module('App')
  .controller('base', [ '$scope', 'rssFactory', '$cookies', '$window' ,'$timeout' ,function ($scope, rssFactory, $cookies, $window, $timeout) {
    var vm = this;
    vm.rssLink = '';


    /* initilizing rss view */
    var init = function () {
      vm.feedTitle = "";
      vm.feeds = [];
      vm.feedOffset = 0;
      vm.feedLimit = 10;
      vm.hasMoreFeeds = false;
      vm.currentTime = new Date();
      vm.showError = false;
      vm.time_spent = $cookies.get('time_spent');

      setInterval(function() {
        vm.currentTime = new Date();
        $scope.$digest();
      },1000);

      setInterval(function() {
        var time_spent = $cookies.get('time_spent');
        if (time_spent) {
          $cookies.put('time_spent',parseInt(time_spent) +1);
        }else{
          $cookies.put('time_spent',1);
        } 
        vm.time_spent = $cookies.get('time_spent');
        $scope.$digest();
      },1000);
    }
    

    /* code to fetch the feeds */
    vm.fetchingFeeds = false;
    var fetchFeeds = function () {
      vm.showError = false;
      if (!vm.fetchingFeeds) {
        vm.fetchingFeeds = true;
        var params = {
          offset: vm.feedOffset,
          limit: vm.feedLimit
        }
        var promise = rssFactory.getFeeds('GET',vm.rssLink,params);
        promise.then(function(response) {
          if (response.data && response.data.responseData && response.data.responseData.feed) {
            var feeds = response.data.responseData.feed.entries;
            var currentFeedsCount = vm.feeds.length;
            if (feeds.length - currentFeedsCount > 0) {
              vm.feeds = vm.feeds.concat(feeds.slice(currentFeedsCount,feeds.length))
              vm.feedLimit += vm.feeds.length;
              vm.hasMoreFeeds = true;
            }else{
              vm.hasMoreFeeds = false;
            }  
            console.log(vm.feeds);
            vm.feedTitle = response.data.responseData.feed.title;
          }else if (! response.data.responseData ){
            vm.showError = true;
          }

          vm.fetchingFeeds = false;
        }, function (error) {
          console.log('error');
          vm.fetchingFeeds = false;
        })
      }  
    }

    vm.getFeeds = function () {
      vm.feeds = [];
      vm.feedLimit = 10;
      fetchFeeds();
    }

    vm.getMoreFeeds = function () {
      fetchFeeds();
    }

    /* hide feed */
    vm.hideFeed = function (feed,index) {
      var el = angular.element(document.getElementById('feed'+index));
      el.addClass('feed-fadeOut');
      $timeout(function () {
        vm.feeds.splice(index,1)  
      },300);
    }

    /* check if the feed has image */
    vm.hasImage = function(feed) {
      if (feed && feed.mediaGroups) {
        if (feed.mediaGroups[0].contents[0].thumbnails[0].url) {
          return true;
        } else{
          return false;
        }
      }else{
        return false;
      }
    }

    vm.getImage = function(feed) {
      if (feed && feed.mediaGroups) {
       return feed.mediaGroups[0].contents[0].thumbnails[0].url
      };
    }

    /* feed toggle with effect */
    vm.toggleFeed = function (feed,index) {
      var el = "feedContent"+index;
      el = angular.element(document.getElementById(el));
      if (el.hasClass('feed-slideDown')) {
        el.removeClass('feed-slideDown');
      }else{
        el.addClass('feed-slideDown');
      }  
    }

    /* modal incase of video */
    vm.showMedia = function(feed,index) {
      if( vm.hasImage(feed) ){
        vm.currentMediaType = "";
        if (feed.mediaGroups[0].contents[0].type.split("/")[0] == "video" ) {
          vm.currentMediaTitle = feed.title;
          vm.currentMediaType = "video";
          vm.currentMediaUrl = feed.mediaGroups[0].contents[0].url
          console.log(vm.currentMediaUrl);
        }
        if (feed.mediaGroups[0].contents[0].type.split("/")[0] == "image" ) {
          vm.currentMediaType = "image";
        }
        angular.element(document.getElementById("mediaModal")).addClass("show");
      }
    }

    vm.closeMediaModal = function() {
      vm.currentMediaType = null;
      vm.currentMediaUrl = null;
      angular.element(document.getElementById("mediaModal")).removeClass("show");
    }

    init();
  }])
