var app = (function() {
  this.toggleDropdown = function (event) {
    var btn = event.target;
    var parent = btn.parentElement;
    parent.classList.toggle('open');
  }

  var initNavigation = function() {
    window.onhashchange = showTab;
  }

  var showTab = function () {
    var hash = window.location.hash;
    var profileTab = document.getElementById('profile');
    var activityTab = document.getElementById('activity');
    var videosTab = document.getElementById('videos');

    var activityNav = document.getElementById('activityNav');
    var profileNav = document.getElementById('profileNav');
    var videosNav = document.getElementById('videosNav');

    switch(hash) {
      case '#profile':
        profileTab.classList.add('active');
        activityTab.classList.remove('active');
        videosTab.classList.remove('active');

        profileNav.classList.add('active');
        activityNav.classList.remove('active');
        videosNav.classList.remove('active');

        break;
      case '#activities':
        profileTab.classList.remove('active');
        activityTab.classList.add('active');
        videosTab.classList.remove('active');

        profileNav.classList.remove('active');
        activityNav.classList.add('active');
        videosNav.classList.remove('active');        
        break;
      case '#videos':
        profileTab.classList.remove('active');
        activityTab.classList.remove('active');
        videosTab.classList.add('active');

        profileNav.classList.remove('active');
        activityNav.classList.remove('active');
        videosNav.classList.add('active');
        break;
    }
  }

  this.toggleMainNav = function() {
    var navbar = document.getElementById('navbarCollapse');
    navbar.classList.toggle('collapse');
  }

  this.init = function () {
    initNavigation();
  }
 
  return this;
})();

app.init();