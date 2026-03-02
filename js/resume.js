(function() {
  'use strict';

  // Smooth scrolling for nav links
  document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
          location.hostname === this.hostname) {
        var target = document.querySelector(this.hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Close responsive menu when a scroll trigger link is clicked
  document.querySelectorAll('.js-scroll-trigger').forEach(function(link) {
    link.addEventListener('click', function() {
      var navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        var toggler = document.querySelector('.navbar-toggler');
        if (toggler) {
          toggler.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Scrollspy using Intersection Observer
  var sections = document.querySelectorAll('section.resume-section');
  var navLinks = document.querySelectorAll('#sideNav .js-scroll-trigger');

  if (sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

})();
